---
title: MCAP 文件中的常见 Topic
description: 介绍在 MCAP 文件中常见的 Topic 及其使用场景。
date: 2026-07-12 12:00:00
author: Ren Dan
tags: [MCAP, ROS]
category: ROS
draft: false
---


## ROS / ROS 2 标准 与 Foxglove 标准

一般 Schema 名称以 `sensor_msgs/`、`tf2_msgs/`、`std_msgs/` 等开头的 Topic 属于 ROS / ROS 2 的官方工业标准，这是机器人操作系统（ROS 1 / ROS 2）官方定义的核心消息包，为机器人本体的实时通信（IPC/DDS）服务。

而 Schema 名称以 `foxglove.` 开头的 Topic 属于 Foxglove 标准，是 Foxglove 团队针对 MCAP 格式量身定制的一套开源、跨平台的通用模式（Schemas），专为 Web 与可视化而生。

## /tf

在自动驾驶、机器人等场景下的MCAP文件中，`tf`（Transform 的缩写，即坐标变换）的主要作用是：记录和维护机器人所有零部件以及环境物体之间，在三维空间中的相对位置和姿态关系。

在自动驾驶/机器人场景中，不同的传感器和部件都有自己独立的坐标系（Frame），如：

- 雷达坐标系（lidar_link）：以激光雷达中心为原点，检测到的障碍物距离都是相对于雷达的。
- 相机坐标系（camera_link）：以相机镜头为原点。
- 车体/机器人中心坐标系（base_link）：通常是机器人的后轴中心或几何中心。
- 世界/地图坐标系（map 或 odom）：绝对的地理或里程计坐标系。

`tf` topic 中记录的，就是这些坐标系之间的转换矩阵（平移 $x, y, z$ 和旋转 $qx, qy, qz, qw$）。

### ROS标准

ROS 中 `/tf` 或 `/tf_static` 使用的是 `tf2_msgs/msg/TFMessage`（ROS 2）或 `tf2_msgs/TFMessage`（ROS 1），其定义为一个 `geometry_msgs/TransformStamped` 数组：

```
geometry_msgs/TransformStamped[] transforms
```

其中，数组中的每条变换记录（`TransformStamped`）的核心字段为：

- `header.frame_id` (string): 父坐标系名称（如 `base_link`）。
- `child_frame_id` (string): 子坐标系名称（如 `lidar_link`）。
- `transform.translation` (geometry_msgs/Vector3): 子参考系原点在父参考系下的平移向量 ($x, y, z$)。
- `transform.rotation` (geometry_msgs/Quaternion): 子参考系在父参考系下的旋转四元数 ($x, y, z, w$)。

一条 ROS 标准下包含多条变换的 JSON 消息示例如下：

```json
{
  "transforms": [
    {
      "header": {
        "stamp": {
          "sec": 1717113600,
          "nanosec": 500000000
        },
        "frame_id": "base_link"
      },
      "child_frame_id": "lidar_link",
      "transform": {
        "translation": {
          "x": 2.0,
          "y": 0.0,
          "z": 1.5
        },
        "rotation": {
          "x": 0.0,
          "y": 0.0,
          "z": 0.0,
          "w": 1.0
        }
      }
    }
  ]
}
```

这条消息的含义是：在 1717113600.5 秒这一刻，激光雷达（lidar_link）安装在车体中心（base_link）的前方 2 米、高 1.5 米处，并且雷达的朝向与车身完全平行（四元数 [0, 0, 0, 1] 代表没有旋转） 。

### Foxglove 标准

Foxglove 定义了两个对应的 Schema：

- `foxglove.FrameTransform` 对应 ROS 中的单条变换 `geometry_msgs/TransformStamped`。
- `foxglove.FrameTransforms`（变换数组）对应 ROS 中的 `tf2_msgs/TFMessage`。

每个 `foxglove.FrameTransform` 包含的关键字段如下：

- `parent_frame_id` (string): 父参考系名称。
- `child_frame_id` (string): 子参考系名称。
- `translation` (foxglove.Vector3): 平移向量 ($x, y, z$)。
- `rotation` (foxglove.Quaternion): 旋转四元数 ($x, y, z, w$)。
- `timestamp` (google.protobuf.Timestamp): 该坐标变换的有效时间戳。

一条 `foxglove.FrameTransform` 消息只记录一个 transform，示例如下：

```json
{
  "timestamp": {
    "seconds": "1717113600",
    "nanos": 500000000
  },
  "parent_frame_id": "base_link",
  "child_frame_id": "lidar_link",
  "translation": {
    "x": 2.0,
    "y": 0.0,
    "z": 1.5
  },
  "rotation": {
    "x": 0.0,
    "y": 0.0,
    "z": 0.0,
    "w": 1.0
  }
}
```

该条消息的含义同 ROS 标准下的示例完全相同。

在回放时，Foxglove 的 3D 面板需要指定一个 **Fixed Frame**（固定参考系），默认会选择当前 TF 树的根节点（如 `<Root frame>`）。如果系统没有发布 any `tf` 消息，所有具有不同 `frame_id` 的传感器数据（如雷达点云、相机图像）将无法进行空间对齐，并会报变换缺失警告。因此，需要确保 `tf` 树的连通性，且在 3D 面板中选择一个在当前 TF 树中存在的 Frame 作为固定参考系（如 `base_link`、`odom` 或 `map`）以进行正确的可视化重组。

## /imu

在机器人与自动驾驶场景中，`/imu` 话题用于记录惯性测量单元（IMU）的数据，包括姿态、角速度和线加速度信息。

### ROS 标准

ROS 中主要使用 `sensor_msgs/msg/Imu`（ROS 2）或 `sensor_msgs/Imu`（ROS 1），其定义包含以下关键字段：

- `orientation` (geometry_msgs/Quaternion): 姿态四元数。
- `orientation_covariance` (float64[9]): 姿态的协方差矩阵。
- `angular_velocity` (geometry_msgs/Vector3): 角速度（rad/s）。
- `angular_velocity_covariance` (float64[9]): 角速度的协方差矩阵。
- `linear_acceleration` (geometry_msgs/Vector3): 线加速度（m/s²）。
- `linear_acceleration_covariance` (float64[9]): 线加速度的协方差矩阵。

一条 ROS 标准下的 IMU JSON 消息示例如下：

```json
{
  "header": {
    "stamp": {
      "sec": 1717113600,
      "nanosec": 500000000
    },
    "frame_id": "imu_link"
  },
  "orientation": {
    "x": 0.0,
    "y": 0.0,
    "z": 0.0,
    "w": 1.0
  },
  "orientation_covariance": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  "angular_velocity": {
    "x": 0.01,
    "y": -0.02,
    "z": 0.03
  },
  "angular_velocity_covariance": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  "linear_acceleration": {
    "x": 0.1,
    "y": 0.2,
    "z": 9.81
  },
  "linear_acceleration_covariance": [
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0
  ]
}
```

### Foxglove 标准

Foxglove 定义了 `foxglove.Imu` 模式。其结构与 ROS 的 Imu 类似，但去除了冗余的嵌套。

一条 Foxglove 标准下的 IMU JSON 消息示例如下：

```json
{
  "timestamp": {
    "seconds": "1717113600",
    "nanos": 500000000
  },
  "frame_id": "imu_link",
  "orientation": {
    "x": 0.0,
    "y": 0.0,
    "z": 0.0,
    "w": 1.0
  },
  "angular_velocity": {
    "x": 0.01,
    "y": -0.02,
    "z": 0.03
  },
  "linear_acceleration": {
    "x": 0.1,
    "y": 0.2,
    "z": 9.81
  }
}
```

### 常见变种：自定义与开源数据集标准（如 nuScenes）

在部分并非纯 ROS 生态的 MCAP 文件（如著名的自动驾驶数据集 **nuScenes** 或某些企业自研系统的 IMU 导出日志）中，为了极致的轻量化并降低网络/日志存储开销，会采用更加简化和缩写的自定义 Schema。

这类非标准变种的特点为：

- **字段命名极大精简**：如使用 `q` 替代 `orientation`，`rotation_rate` 替代 `angular_velocity`，`linear_accel` 替代 `linear_acceleration`。
- **四元数排布顺序差异**：ROS 传统的四元数序列化顺序为 `[x, y, z, w]`，而许多自定义变种及科学计算库（如 Eigen）会采用 **`[w, x, y, z]`**（实部 W 在前）顺序。在解析这类数据时需特别注意，以防姿态计算错乱。

一条 nuScenes 变种下的 IMU 消息 JSON 示例如下：

```json
{
  "linear_accel": {
    "x": -0.30074650049209595,
    "y": -0.3294488787651062,
    "z": 9.550972938537598
  },
  "q": {
    "w": -0.501967191696167,
    "x": 0.008368822745978832,
    "y": -0.02710564248263836,
    "z": 0.8644213676452637
  },
  "rotation_rate": {
    "x": -0.011901378631591797,
    "y": -0.010865405201911926,
    "z": 0.023872975260019302
  }
}
```

## /odom

`/odom` 话题用于记录里程计（Odometry）数据，即车辆/机器人根据轮速计、惯导或 SLAM 估算出的在父级坐标系（通常为 `odom` 或 `map`）中的位置和速度。

### ROS 标准

ROS 中使用 `nav_msgs/msg/Odometry`（ROS 2）或 `nav_msgs/Odometry`（ROS 1），其包含：

- `pose` (geometry_msgs/PoseWithCovariance): 机器人的位置和姿态，包含 36 长度的协方差矩阵。
- `twist` (geometry_msgs/TwistWithCovariance): 机器人的线速度和角速度，包含 36 长度的协方差矩阵。
- `child_frame_id` (string): 子坐标系名称（通常为 `base_link`）。

一条 ROS 标准下的里程计 JSON 消息示例如下：

```json
{
  "header": {
    "stamp": {
      "sec": 1717113600,
      "nanosec": 500000000
    },
    "frame_id": "odom"
  },
  "child_frame_id": "base_link",
  "pose": {
    "pose": {
      "position": {
        "x": 10.5,
        "y": 2.1,
        "z": 0.0
      },
      "orientation": {
        "x": 0.0,
        "y": 0.0,
        "z": 0.1,
        "w": 0.995
      }
    },
    "covariance": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  },
  "twist": {
    "twist": {
      "linear": {
        "x": 1.2,
        "y": 0.0,
        "z": 0.0
      },
      "angular": {
        "x": 0.0,
        "y": 0.0,
        "z": 0.05
      }
    },
    "covariance": [
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0
    ]
  }
}
```

### Foxglove 标准

在最新的 Foxglove 规范（`foxglove_msgs` 3.3.0+）中，引入了 `foxglove.Odometry` 模式。它与 ROS 标准类似，但其通过将协方差提升到顶层等方式，使结构更为扁平化。

一条 Foxglove 标准下的里程计 JSON 消息示例如下：

```json
{
  "timestamp": {
    "seconds": "1717113600",
    "nanos": 500000000
  },
  "frame_id": "odom",
  "child_frame_id": "base_link",
  "pose": {
    "position": {
      "x": 10.5,
      "y": 2.1,
      "z": 0.0
    },
    "orientation": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.1,
      "w": 0.995
    }
  },
  "pose_covariance": [
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0
  ],
  "twist": {
    "linear": {
      "x": 1.2,
      "y": 0.0,
      "z": 0.0
    },
    "angular": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.05
    }
  },
  "twist_covariance": [
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0
  ]
}
```

### 为什么有时 /odom 话题会使用 Pose 类型的 Schema？

在实际应用中，会发现一些 MCAP 文件的 `/odom` 话题并没有使用 `nav_msgs/msg/Odometry` 或 `foxglove.Odometry`，而是使用了更简单的 Pose 类型（如 `geometry_msgs/msg/PoseStamped` 或 `foxglove.PoseInFrame`，`foxglove.Pose`），主要原因如下：

1. **节省存储与带宽**：完整的里程计消息包含两个 6x6（共 72 个 `float64`）的协方差矩阵。在 50Hz-100Hz 的高频录制下，若协方差数据全为 0 或冗余，会浪费极大的磁盘空间。使用 Pose 类型能减少 10 倍以上的数据体积。
2. **仅需轨迹可视化**：如果录制该话题的主要目的是为了在 Foxglove 等可视化软件中渲染行驶轨迹（Trajectory），则只需要三维坐标与姿态即可，不需要线速度、角速度及相关协方差。
3. **算法直接输出**：部分定位算法（如 SLAM）在进行状态估计时只计算当前位姿，不输出速度信息，因此直接输出 `Pose` 或 `PoseStamped` 消息类型，并习惯性地将其命名为 `/odom` 话题。
4. **解析轻量化**：在 Web 渲染端，解析轻量、扁平的 Pose 消息（如 `foxglove.PoseInFrame`）比解析复杂的嵌套里程计结构要快得多，更加适合跨平台的轻量级可视化。

## 点云相关的 Topic

在自动驾驶与机器人领域，点云（Point Cloud）话题（如 `/velodyne_points`、`激活的雷达话题`、`/lidar/pointcloud` 等）用于记录三维激光雷达（LiDAR）或深度相机扫描到的空间三维离散点集，是环境感知、避障和 SLAM 的核心数据。

### ROS 标准

ROS 中主要使用 `sensor_msgs/msg/PointCloud2`（ROS 2）或 `sensor_msgs/PointCloud2`（ROS 1）。为了兼容不同雷达厂商的输出（如包含强度 intensity、环数 ring、时间偏移 time 等），它采用了一种基于二进制字节流的通用描述方式：

- `header` (std_msgs/Header): 包含点云数据采集的时间戳（`stamp`）和雷达所在的参考坐标系名称（`frame_id`）。
- `height` (uint32): 点云图的高度（若为无序点云，则高度为 1，宽度为点数）。
- `width` (uint32): 点云图的宽度。
- `fields` (sensor_msgs/PointField[]): 描述每个点中各个字段在二进制数据块中的布局。
  - `name` (string): 字段名（如 `x`, `y`, `z`, `intensity`, `ring` 等）。
  - `offset` (uint32): 该字段在点二进制字节块中的起始偏移位置（单位：字节）。
  - `datatype` (uint8): 数据类型（7 代表 `FLOAT32`，5 代表 `UINT32` 等）。
  - `count` (uint32): 字段中的元素数量（通常为 1）。
- `point_step` (uint32): 每个点占用的总字节数（Stride，例如 16 字节或 32 字节）。
- `row_step` (uint32): 每一行占用的总字节数。
- `data` (uint8[]): 存储所有点信息的原始二进制字节块（在 JSON 中通常以 Base64 编码表示）。
- `is_dense` (bool): 是否为稠密点云（即不包含 NaN/非有限值点）。

一条包含 2 个点的 ROS 标准点云 JSON 消息示例如下：

```json
{
  "header": {
    "stamp": {
      "sec": 1717113600,
      "nanosec": 500000000
    },
    "frame_id": "lidar_link"
  },
  "height": 1,
  "width": 2,
  "fields": [
    { "name": "x", "offset": 0, "datatype": 7, "count": 1 },
    { "name": "y", "offset": 4, "datatype": 7, "count": 1 },
    { "name": "z", "offset": 8, "datatype": 7, "count": 1 },
    { "name": "intensity", "offset": 12, "datatype": 7, "count": 1 }
  ],
  "is_bigendian": false,
  "point_step": 16,
  "row_step": 32,
  "data": "AACAPwAAAAAAAIA/AAAAAAAAgD8AAIA/AACAPwAAAAAAAIA/AAAAAAAAgD8AAIA/",
  "is_dense": true
}
```

### Foxglove 标准

Foxglove 定义了 `foxglove.PointCloud` 模式。它的核心逻辑与 ROS 的 PointCloud2 保持一致，同样基于二进制数据块加元数据描述的机制，但消除了冗余字段（如 `row_step`、`height` 等），并引入了可选的 `pose`（局部坐标系相对偏移）：

- `timestamp` (google.protobuf.Timestamp): 采集时间戳。
- `frame_id` (string): 参考坐标系名称。
- `pose` (foxglove.Pose): 点云整体相对于参考坐标系的位姿偏移（可选）。
- `point_stride` (uint32): 每个点占用的字节数（对应 ROS 的 `point_step`）。
- `fields` (foxglove.PackedElementField[]): 描述每个点字段的数据布局。
  - `name` (string): 字段名。
  - `offset` (uint32): 字段偏移量。
  - `type` (uint8): 数据类型（7 代表 `FLOAT32`，8 代表 `FLOAT64` 等，遵循 Foxglove `NumericType` 规范）。
- `data` (bytes): 原始点二进制数据。

一条 Foxglove 标准下的点云 JSON 消息示例如下：

```json
{
  "timestamp": {
    "seconds": "1717113600",
    "nanos": 500000000
  },
  "frame_id": "lidar_link",
  "pose": {
    "position": { "x": 0.0, "y": 0.0, "z": 0.0 },
    "orientation": { "x": 0.0, "y": 0.0, "z": 0.0, "w": 1.0 }
  },
  "point_stride": 16,
  "fields": [
    { "name": "x", "offset": 0, "type": 7 },
    { "name": "y", "offset": 4, "type": 7 },
    { "name": "z", "offset": 8, "type": 7 },
    { "name": "intensity", "offset": 12, "type": 7 }
  ],
  "data": "AACAPwAAAAAAAIA/AAAAAAAAgD8AAIA/AACAPwAAAAAAAIA/AAAAAAAAgD8AAIA/"
}
```

### 传输优化与点云压缩（Draco 压缩）

因为点云数据非常庞大（单帧雷达点云数据可达数兆字节），在实际的 MCAP 文件录制和网络传输中：

- **存储成本巨大**：如果未经压缩直接写入 MCAP，几分钟的录制即可占用数吉字节（GB）空间。
- **压缩标准**：Foxglove 提供了专门的 **`foxglove.CompressedPointCloud`** 模式。该模式将点云通过 3D 数据压缩算法（主要是 Google 开源的 **Draco** 算法）进行高比例压缩，并以压缩后的字节流写入 `data` 中。在可视化回放时，由客户端实时进行 Draco 解压，这在 Web 回放和远程云端读取场景中极大地减少了带宽消耗和存储开销。

## Camera 相关的 Topic

相机（Camera）是自动驾驶与机器人中必不可少的感知传感器，主要用于环境监视、目标检测、车道线识别以及视觉 SLAM 等。在 MCAP 文件中，相机相关的 Topic 通常分为三类：**原始图像（Raw Image）**、**压缩图像（Compressed Image）** 和 **相机标定参数（Camera Calibration/Info）**。


### 1. 原始图像 (Raw Image)
原始图像话题传输未经压缩的裸像素数据，主要用于算法实时消费（如目标检测推理），避免压缩带来的画质损失和时间开销。

#### ROS 标准
ROS 中主要使用 `sensor_msgs/msg/Image`（ROS 2）或 `sensor_msgs/Image`（ROS 1）：
- `header` (std_msgs/Header): 采集时间戳和相机光学中心坐标系（`frame_id`）。
- `height` (uint32): 图像高度（像素数）。
- `width` (uint32): 图像宽度（像素数）。
- `encoding` (string): 像素编码格式（如 `rgb8`、`bgr8`、`mono8`、`yuv422`、`rgba8` 等）。
- `is_bigendian` (uint8): 是否为大端字节序。
- `step` (uint32): 图像单行的字节长度（通常为 `width * 每个像素通道数 * 字节数`，可能包含行填充 padding）。
- `data` (uint8[]): 原始二进制像素数据。

一条 ROS 标准原始图像 of JSON 消息示例如下（宽2，高1，RGB编码）：
```json
{
  "header": {
    "stamp": {
      "sec": 1717113600,
      "nanosec": 500000000
    },
    "frame_id": "camera_front_link"
  },
  "height": 1,
  "width": 2,
  "encoding": "rgb8",
  "is_bigendian": 0,
  "step": 6,
  "data": "AP8A/wD/"
}
```

#### Foxglove 标准
Foxglove 定义了 `foxglove.RawImage` 模式，结构与 ROS 基本相同：
- `timestamp` (google.protobuf.Timestamp): 采集时间戳。
- `frame_id` (string): 参考坐标系名称。
- `width` / `height` (uint32): 图像宽高。
- `encoding` (string): 像素编码格式。
- `step` (uint32): 图像单行字节数。
- `data` (bytes): 二进制裸像素数据。



### 2. 压缩图像 (Compressed Image)
由于原始图像体积极其庞大（例如，1080P@30FPS 的 RGB 原始图像每秒产生近 180MB 数据），如果将所有相机的原始数据存入 MCAP 文件，会导致日志体积不可接受。因此在存储和传输时，通常会对其进行编码压缩。

#### ROS 标准
ROS 中主要使用 `sensor_msgs/msg/CompressedImage`（ROS 2）或 `sensor_msgs/CompressedImage`（ROS 1）：
- `header` (std_msgs/Header): 时间戳和参考坐标系。
- `format` (string): 图像压缩格式（如 `jpeg`、`png`，通常还会注明色彩空间，如 `jpeg; jpeg compressed bgr8`）。
- `data` (uint8[]): 压缩后的图像二进制数据。

一条 ROS 标准压缩图像的 JSON 消息示例如下：
```json
{
  "header": {
    "stamp": {
      "sec": 1717113600,
      "nanosec": 500000000
    },
    "frame_id": "camera_front_link"
  },
  "format": "jpeg",
  "data": "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQEXAD8AVn//kQ=="
}
```

#### Foxglove 标准
Foxglove 定义了 `foxglove.CompressedImage` 模式，支持 `jpeg`、`png`、`webp` 和 `avif` 格式，去除了多余的格式描述嵌套：
- `timestamp` (google.protobuf.Timestamp): 时间戳。
- `frame_id` (string): 参考坐标系。
- `format` (string): 压缩格式类型（`jpeg`, `png`, `webp`, `avif`）。
- `data` (bytes): 压缩后的二进制数据。


### 3. 相机标定参数 (Camera Calibration / Info)
为了将三维空间中的物体（如点云或 3D 边界框）投影到二维图像上，或者为图像去畸变，必须知道相机的光学物理参数，这些参数记录在标定信息话题中（如 `/camera/camera_info`）。

#### ROS 标准
ROS 中主要使用 `sensor_msgs/msg/CameraInfo`（ROS 2）或 `sensor_msgs/CameraInfo`（ROS 1）：
- `distortion_model` (string): 畸变模型名称（如最常用的径向/切向畸变模型 `plumb_bob`）。
- `d` (float64[]): 畸变系数数组（通常为 5 个元素 $[k_1, k_2, p_1, p_2, k_3]$）。
- `k` (float64[9]): 3x3 相机内参矩阵，行优先顺序：
  $$K = \begin{bmatrix} f_x & 0 & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix}$$
- `r` (float64[9]): 3x3 整流矩阵（用于立体视觉对齐）。
- `p` (float64[12]): 3x4 投影矩阵，行优先顺序：
  $$P = \begin{bmatrix} f'_x & 0 & c'_x & T_x \\ 0 & f'_y & c'_y & T_y \\ 0 & 0 & 1 & 0 \end{bmatrix}$$

#### Foxglove 标准
Foxglove 定义了 `foxglove.CameraCalibration` 模式，字段结构和物理含义与 ROS 端的 CameraInfo 几乎完全兼容。

在 Foxglove Studio 回放中，只要把图像 Topic 和对应的 Camera Info / Calibration Topic 建立关联，Foxglove 就可以实现 **3D 点云到 2D 图像的精准投影叠加**，以及实现图像的在线去畸变渲染。

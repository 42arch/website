# 音乐播放器曲目清单

将音频文件、可选封面与时间轴歌词放入 `public/music/`，并编辑 `public/data/music.json`。播放器会按 JSON 数组顺序展示歌曲。

```json
[
  {
    "id": "track-1",
    "title": "歌曲名",
    "artist": "创作者",
    "src": "/music/track-1.mp3",
    "album": "专辑名",
    "lyrics": "/music/track-1.lrc"
  }
]
```

`id`、`title`、`artist`、`src` 为必填字段。`id` 必须唯一。`cover`、`album` 和 `lyrics` 可省略。音频、封面与歌词路径都应以 `/music/` 开头，指向 `public/music/` 内的文件。

未指定 `cover` 时，播放器会直接读取 MP3 中常见的 ID3v2.3 或 ID3v2.4 内嵌封面；没有可用封面时显示音乐图标。指定 `cover` 可以覆盖内嵌封面，无须事先提取图片。当前支持 JPEG、PNG、GIF 和 WebP 内嵌图片。

歌词使用 `.lrc` 格式，每行以 `[分:秒.毫秒]` 时间戳开头。播放时会高亮当前歌词；音频元数据载入后，也可以点击歌词跳转。

曲目清单为空时，播放器显示空列表提示。播放时长由浏览器读取音频元数据，无须写入清单。请只添加你有权在网站上使用的音频和封面。

'use client'

import { useEffect, useRef } from 'react'
import {
  AmbientLight,
  BoxGeometry,
  CircleGeometry,
  Color,
  DoubleSide,
  Fog,
  GridHelper,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Vector2,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap, { Power1 } from 'gsap'

function mathRandom(num = 8) {
  const numValue = -Math.random() * num + Math.random() * num
  return numValue
}

const setColor = 0x2b2a5c

export const City3D = () => {
  const sceneRef = useRef<HTMLDivElement>(null)
  // const [createCarPos, setCreateCarPos] = useState(true)

  useEffect(() => {
    if (!sceneRef.current) return
    if (sceneRef.current.children.length > 0) return

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    let createCarPos = true

    const scene = new Scene()
    scene.background = new Color(setColor)
    scene.fog = new Fog(setColor, 10, 32)

    // City
    const city = new Object3D()
    const smoke = new Object3D()
    const town = new Object3D()
    scene.add(city)
    city.add(smoke)

    // Buildings
    for (let i = 1; i < 42 * 3; i++) {
      const segments = 2
      const geo = new BoxGeometry(1, 1, 1, segments, segments, segments)
      const mat = new MeshStandardMaterial({
        color: 0x000000,
        wireframe: false,
        roughness: 0.3,
        metalness: 1,
        side: DoubleSide
      })
      const wMat = new MeshLambertMaterial({
        color: 0xfefefe,
        wireframe: true,
        transparent: true,
        opacity: 0.03,
        side: DoubleSide
      })

      const cube = new Mesh(geo, mat)
      const floor = new Mesh(geo, mat)
      const wFloor = new Mesh(geo, wMat)

      cube.add(wFloor)
      cube.castShadow = true
      cube.receiveShadow = true
      // cube.rotation.set(0.1 + Math.abs(mathRandom(8)))
      floor.scale.y = 0.05
      cube.scale.y = 0.1 + Math.abs(mathRandom(8))

      const cubeWidth = 0.9
      cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth)
      cube.position.x = Math.round(mathRandom())
      cube.position.z = Math.round(mathRandom())
      floor.position.set(cube.position.x, 0, cube.position.z)

      town.add(floor)
      town.add(cube)
    }

    // Lights
    const ambientLight = new AmbientLight(0xffffff, 15)
    const frontLight = new SpotLight(0xffffff, 10, 30)
    const backLight = new PointLight(0xffffff, 0.5)
    frontLight.rotation.x = (45 * Math.PI) / 180
    frontLight.rotation.z = (-45 * Math.PI) / 180
    frontLight.position.set(5, 10, 15)
    frontLight.castShadow = true
    frontLight.shadow.mapSize.width = 6000
    frontLight.shadow.mapSize.height = 6000
    frontLight.penumbra = 0.1
    backLight.position.set(0, 6, 0)

    smoke.position.y = 2
    scene.add(ambientLight)
    city.add(frontLight)
    city.add(town)
    scene.add(backLight)

    // Grid Helper
    const gridHelper = new GridHelper(60, 120, 0xff0000, 0x363a58)
    city.add(gridHelper)

    // Car lines
    function createCarLine(scale = 2, pos = 20, color = 0xffff00) {
      const mat = new MeshToonMaterial({ color: color, side: DoubleSide })
      const geo = new BoxGeometry(1, scale / 40, scale / 40)
      const elem = new Mesh(geo, mat)
      const cAmp = 3

      if (createCarPos) {
        createCarPos = false
        elem.position.x = -pos
        elem.position.z = mathRandom(cAmp)
        gsap.to(elem.position, 5, {
          z: pos,
          repeat: -1,
          yoyo: true,
          delay: mathRandom(3)
        })
      } else {
        createCarPos = true
        elem.position.x = mathRandom(cAmp)
        elem.position.z = -pos
        elem.rotation.y = (90 * Math.PI) / 180
        gsap.to(elem.position, 5, {
          z: pos,
          repeat: -1,
          yoyo: true,
          delay: mathRandom(3),
          ease: Power1.easeInOut
        })
      }
      elem.receiveShadow = true
      elem.castShadow = true
      elem.position.y = Math.abs(mathRandom(5))
      city.add(elem)
    }
    for (let i = 0; i < 60; i++) {
      createCarLine(0.1, 20)
    }

    // Particular
    const pMaterial = new MeshToonMaterial({
      color: 0xffff00,
      side: DoubleSide
    })
    const pGeometry = new CircleGeometry(0.01, 3)
    for (let i = 1; i < 300; i++) {
      const particular = new Mesh(pGeometry, pMaterial)
      particular.position.set(mathRandom(5), mathRandom(5), mathRandom(5))
      particular.rotation.set(mathRandom(), mathRandom(), mathRandom())
      smoke.add(particular)
    }

    const camera = new PerspectiveCamera(20, sizes.width / sizes.height, 1, 500)
    camera.position.set(0, 4, 22)
    scene.add(camera)

    // renderer
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    renderer.shadowMap.needsUpdate = true

    sceneRef.current.appendChild(renderer.domElement)

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    // Mouse Events
    // Mouse Events
    const mouse = new Vector2()
    function onMouseMove(event: MouseEvent) {
      event.preventDefault()
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    function onDocumentTouchStart(event: TouchEvent) {
      if (event.touches.length == 1) {
        event.preventDefault()
        console.log('touce started', event.touches[0])
        // mouse.x = event.touches[0].pageX - window.innerWidth / 2
        // mouse.y = event.touches[0].pageY - window.innerHeight / 2
        mouse.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1
        mouse.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1
      }
    }
    function onDocumentTouchMove(event: TouchEvent) {
      if (event.touches.length == 1) {
        event.preventDefault()
        console.log('touce MOVE', event.touches[0])

        mouse.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1
        mouse.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1
      }
    }
    window.addEventListener('mousemove', onMouseMove, false)
    window.addEventListener('touchstart', onDocumentTouchStart, false)
    window.addEventListener('touchmove', onDocumentTouchMove, false)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.maxPolarAngle = Math.PI / 2 - 0.1
    controls.minDistance = 15
    controls.maxDistance = 30
    controls.enableRotate = false

    const uSpeed = 0.001
    const animate = () => {
      requestAnimationFrame(animate)
      city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed
      city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed
      if (city.rotation.x < -0.05) {
        city.rotation.x = -0.05
      } else if (city.rotation.x > 1) {
        city.rotation.x = 1
      }

      smoke.rotation.y += 0.01
      smoke.rotation.x += 0.01
      camera.lookAt(city.position)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      renderer.dispose()
    }
  }, [])

  return (
    <div
      className="absolute z-0 top-0 left-0 w-screen h-screen"
      ref={sceneRef}
    />
  )
}

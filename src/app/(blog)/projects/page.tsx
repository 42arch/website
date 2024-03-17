import Project from './Project'

const projects = [
  {
    name: 'Geojson.io for VSCode',
    site: 'https://marketplace.visualstudio.com/items?itemName=swallow.geojson-io-for-vscode',
    repo: 'https://github.com/42arch/geojson.io-for-vscode',
    intro: 'Preview, create and edit geojson data in VSCode.',
    star: 6,
    open: true,
    tag: ['vscode', 'leaflet', 'react'],
    color: ''
  },
  {
    name: 'Personal Website',
    site: 'https://mainissues.cc',
    repo: 'https://github.com/42arch/website',
    intro: 'My personal portfolio and blog website.',
    star: 6,
    open: true,
    tag: ['next.js', 'tailwindcss', 'three.js'],
    color: ''
  },
  {
    name: '3D China Metro',
    site: 'https://3d-china-metro.vercel.app',
    repo: 'https://github.com/42arch/3d-china-metro',
    intro: '3D metro map of major cities in China',
    star: 6,
    open: true,
    tag: ['next.js', 'three.js', 'r3f'],
    color: ''
  }
]

const demos = [
  {
    name: 'Sketchbook',
    site: 'https://sketchbook42.vercel.app/',
    repo: 'https://github.com/42arch/sketchbook',
    intro: '2D and 3D visualization demos',
    star: 6,
    open: true,
    tag: ['vscode', 'leaflet', 'react'],
    color: ''
  },
  {
    name: 'React Three Demos',
    site: 'https://three-demos.netlify.app',
    repo: 'https://github.com/42arch/react-threejs-demos',
    intro: '3D experiments made with React Three Fiber',
    star: 6,
    open: true,
    tag: ['react-three-fiber', 'three.js', 'react'],
    color: ''
  },
  {
    name: 'Cesium Demos',
    site: 'https://cesium-demos.netlify.app',
    repo: 'https://github.com/42arch/cesium-demos',
    intro: 'Some helpful cesium demos and utilties',
    star: 6,
    open: true,
    tag: ['vue', 'cesium'],
    color: ''
  }
]

export default async function Page() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col px-0 py-6 md:px-4 lg:px-12">
      <div>
        <h1 className="mb-6 text-2xl font-semibold leading-9 md:mb-8">
          Projects
        </h1>
        <div className="flex flex-wrap gap-8 ">
          {projects.map((i, idx) => (
            <Project data={i} key={idx} />
          ))}
        </div>
      </div>

      <section className="mt-24">
        <h1 className="mb-6 text-2xl font-semibold leading-9 md:mb-8">Demos</h1>
        <div className="flex flex-wrap gap-8 ">
          {demos.map((i, idx) => (
            <Project data={i} key={idx} />
          ))}
        </div>
      </section>
    </div>
  )
}

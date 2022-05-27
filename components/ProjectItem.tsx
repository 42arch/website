import { FunctionComponent } from "react"

interface IProps {
  project: {
    name: string
    desc: string
    url: string
    type: 'webapp' | 'miniapp' | 'libary' | 'vscode extension'
  }
}

const ProjectItem: FunctionComponent<IProps> = ( { project } ) => {
  return (
    <div onClick={ () => { window.open(project.url, '__blank') } } className="font-mono flex my-8">
      <div className="cursor-pointer flex flex-col">
        <p className="text-xl py-2 m-0">
          { project.name } 
          <span className="text-sm pl-6">{ project.type }</span>
        </p>
        <p className="text-sm p-0 m-0 opacity-80">{ project.desc }</p>
      </div>
    </div>
  )
}

export default ProjectItem
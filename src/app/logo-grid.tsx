'use client'

import { useState, forwardRef } from 'react'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { Icon } from '@iconify/react'

const Item = forwardRef(({ id, icon, style, ...props }: any, ref) => {
  const inlineStyles = {
    opacity: '1',
    transformOrigin: '0 0',
    gridRowStart: null,
    gridColumnStart: null,
    ...style
  }

  return (
    <div
      ref={ref}
      className="w-12 h-12 rounded-lg flex items-center justify-center bg-zinc-400"
      style={inlineStyles}
      {...props}>
      {icon}
    </div>
  )
})

Item.displayName = 'Item'

export const SortableItem = (props: any) => {
  const sortable = useSortable({ id: props.id })
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition
  } = sortable

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
    />
  )
}

export default function Grid() {
  const logos = [
    {
      id: '1',
      icon: <Icon width={28} icon="skill-icons:react-dark" />,
      label: 'react'
    },
    {
      id: '2',
      icon: <Icon width={28} icon="skill-icons:vuejs-dark" />,
      label: 'vue'
    },
    {
      id: '3',
      icon: <Icon width={28} icon="skill-icons:nextjs-dark" />,
      label: 'vue'
    },
    {
      id: '4',
      icon: <Icon width={28} icon="skill-icons:tailwindcss-dark" />,
      label: 'tailwind'
    },
    {
      id: '5',
      icon: <Icon width={28} icon="skill-icons:nuxtjs-dark" />,
      label: 'nuxt'
    },
    {
      id: '6',
      icon: <Icon width={28} icon="skill-icons:vite-dark" />,
      label: 'vite'
    },
    {
      id: '7',
      icon: <Icon width={28} icon="skill-icons:electron" />,
      label: 'electron'
    },
    {
      id: '8',
      icon: <Icon width={28} icon="skill-icons:tauri-dark" />,
      label: 'tauri'
    },
    {
      id: '9',
      icon: <Icon width={28} icon="skill-icons:svelte" />,
      label: 'svelte'
    }
  ]
  const [items, setItems] = useState(logos)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      // onDragStart={handleDragStart}
      // onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${4}, 1fr)`,
            gridGap: 10,
            padding: 10
          }}>
          {items.map((i, index) => (
            <SortableItem key={i.id} id={i.id} icon={i.icon} index={index} />
          ))}
        </div>
      </SortableContext>

      {/* <DragOverlay adjustScale={true}>
        {activeId ? (
          <Item id={activeId} index={items.indexOf(activeId)} />
        ) : null}
      </DragOverlay> */}
    </DndContext>
  )

  // function handleDragStart(event: any) {
  //   setActiveId(event.active.id)
  // }

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        // const oldIndex = items.indexOf(active.id)
        // const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }

    // setActiveId(null)
  }

  // function handleDragCancel() {
  //   setActiveId(null)
  // }
}

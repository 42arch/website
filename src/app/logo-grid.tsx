'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { Icon } from '@iconify/react'

export const SortableItem = (props: any) => {
  const sortable = useSortable({ id: props.id })
  const { attributes, listeners, setNodeRef, transform, transition } = sortable

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      className="w-12 h-12 flex items-center justify-center"
      style={style}
      ref={setNodeRef}
      {...props}
      {...listeners}
      {...attributes}>
      {props.icon}
    </div>
  )
}

export default function LogoGrid() {
  const logos = [
    {
      id: '1',
      icon: <Icon width={36} icon="skill-icons:react-dark" />,
      label: 'react'
    },
    {
      id: '2',
      icon: <Icon width={36} icon="skill-icons:vuejs-dark" />,
      label: 'vue'
    },
    {
      id: '3',
      icon: <Icon width={36} icon="skill-icons:nextjs-dark" />,
      label: 'vue'
    },
    {
      id: '4',
      icon: <Icon width={36} icon="skill-icons:tailwindcss-dark" />,
      label: 'tailwind'
    },
    {
      id: '5',
      icon: <Icon width={36} icon="skill-icons:nuxtjs-dark" />,
      label: 'nuxt'
    },
    {
      id: '6',
      icon: <Icon width={36} icon="skill-icons:vite-dark" />,
      label: 'vite'
    },
    {
      id: '7',
      icon: <Icon width={36} icon="skill-icons:electron" />,
      label: 'electron'
    },
    {
      id: '8',
      icon: <Icon width={36} icon="skill-icons:tauri-dark" />,
      label: 'tauri'
    },
    {
      id: '9',
      icon: <Icon width={36} icon="skill-icons:svelte" />,
      label: 'svelte'
    },
    {
      id: '10',
      icon: <Icon width={36} icon="skill-icons:prisma" />,
      label: 'prisma'
    },
    {
      id: '11',
      icon: <Icon width={36} icon="skill-icons:d3-dark" />,
      label: 'd3'
    },
    {
      id: '12',
      icon: <Icon width={36} icon="skill-icons:threejs-dark" />,
      label: 'three'
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
        <motion.div
          variants={{
            hidden: { opacity: 1, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="visible"
          className="max-w-[320px] grid grid-cols-4 gap-2">
          {items.map((i, index) => (
            <motion.div
              key={i.id}
              whileHover={{ scale: 1.2 }}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1
                }
              }}
              className="flex items-center justify-center">
              <SortableItem id={i.id} icon={i.icon} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </SortableContext>
    </DndContext>
  )

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
}

export interface BlogMeta {
  slug: string
  title: string
  date?: string
  category: string
  intro: string
  tags: string[]
}

export const staticBlogList: BlogMeta[] = [
  {
    slug: 'llm-inference',
    title: '一次大语言模型回答是怎样生成的',
    date: '2026.10.17',
    category: '大语言模型',
    intro: '从分词、上下文计算到逐 token 解码，拆解一次文本生成背后的基本流程。',
    tags: ['LLM', '推理', 'Token'],
  },
  {
    slug: 'rag-practice',
    title: 'RAG 的关键在于让证据真正参与回答',
    date: '2026.10.17',
    category: '检索增强生成',
    intro: '梳理检索增强生成的基本链路，并说明切分、召回、引用和评估如何影响最终答案。',
    tags: ['RAG', '向量检索', '知识库'],
  },
  {
    slug: 'ai-tool-calling',
    title: '从聊天模型到工具型 AI：把执行边界设计清楚',
    date: '2026.10.17',
    category: 'AI 应用工程',
    intro: '工具调用让模型能请求外部操作；可靠系统还需要权限控制、结果校验和清晰的停止条件。',
    tags: ['Agent', '工具调用', '应用安全'],
  },
  {
    slug: 'evaluating-ai-features',
    title: '怎样评估一个 AI 功能是否真的有用',
    date: '2026.10.17',
    category: 'AI 产品实践',
    intro: '从真实任务出发建立评估集，把回答质量、系统行为和用户结果放在同一条反馈链路中。',
    tags: ['AI 评估', '产品设计', '质量保障'],
  },
]

export const blogCategories = ['全部', ...new Set(staticBlogList.map(article => article.category))] as const

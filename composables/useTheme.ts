export function useTheme() {
  const theme = ref<'light' | 'dark'>('light')
  const isSystem = ref<boolean>(localStorage.getItem('isSystemTheme') === 'true')

  const applyTheme = (value: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', value === 'dark')
    localStorage.setItem('theme', value)
  }

  let mediaQuery: MediaQueryList | null = null
  const onSystemThemeChange = (e: MediaQueryListEvent) => {
    if (isSystem.value) {
      localStorage.setItem('theme', e.matches ? 'dark' : 'light')
      applyTheme(e.matches ? 'dark' : 'light')
    }
  }

  const setupSystemListener = () => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', onSystemThemeChange)
  }

  const cleanupSystemListener = () => mediaQuery?.removeEventListener('change', onSystemThemeChange)

  const setTheme = (value: 'light' | 'dark' | 'system') => {
    cleanupSystemListener()
    if (value === 'system') {
      isSystem.value = true
      localStorage.setItem('isSystemTheme', 'true')
      setupSystemListener()
      applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } else {
      isSystem.value = false
      localStorage.removeItem('isSystemTheme')
      applyTheme(value)
    }
    updateMetaThemeColor(value)
  }

  const updateMetaThemeColor = (value: 'light' | 'dark' | 'system') => {
    const meta = document.querySelector('meta[name="theme-color"]')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const color =
      value === 'light'
        ? '#ffffff'
        : value === 'dark'
          ? '#1f1f1f'
          : prefersDark
            ? '#1f1f1f'
            : '#ffffff'

    if (meta) {
      meta.setAttribute('content', color)
    } else {
      const newMeta = document.createElement('meta')
      newMeta.name = 'theme-color'
      newMeta.content = color
      document.head.appendChild(newMeta)
    }
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    applyTheme(saved || 'light')
    if (isSystem.value) {
      setupSystemListener()
    }
  })

  onBeforeUnmount(() => {
    cleanupSystemListener()
  })

  return {
    theme,
    setTheme,
  }
}

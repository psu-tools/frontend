export function useTheme() {
  const theme = ref<'light' | 'dark' | 'system'>('light')

  const applyTheme = (value: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', value === 'dark')
  }

  let mediaQuery: MediaQueryList | null = null
  const onSystemThemeChange = (e: MediaQueryListEvent) => {
    if (theme.value === 'system') {
      applyTheme(e.matches ? 'dark' : 'light')
    }
  }

  const setupSystemListener = () => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', onSystemThemeChange)
  }

  const cleanupSystemListener = () => {
    mediaQuery?.removeEventListener('change', onSystemThemeChange)
  }

  const setTheme = (value: 'light' | 'dark' | 'system') => {
    theme.value = value
    localStorage.setItem('theme', value)

    cleanupSystemListener()

    if (value === 'system') {
      setupSystemListener()
      applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } else {
      applyTheme(value)
    }
  }

  const toggleTheme = () => {
    const next = theme.value === 'light' ? 'dark' : theme.value === 'dark' ? 'system' : 'light'
    setTheme(next)
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    setTheme(saved || 'light')
  })

  onBeforeUnmount(() => {
    cleanupSystemListener()
  })

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}

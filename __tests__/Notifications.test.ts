// @vitest-environment nuxt
import { render } from '@testing-library/vue'
import { test, expect } from 'vitest'
import Notifications from '~/pages/notifications.vue'

test('Component mounts without the errors', () => {
  const { container } = render(Notifications)
  expect(container).toBeTruthy()
})

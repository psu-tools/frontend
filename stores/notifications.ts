import { defineStore } from 'pinia';

export interface Notification {
  id: string;
  type: string;
  headerText: string;
  bodyText: string;
  createdAt: string;
}

export interface Paging {
  sorted: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  last: boolean;
}

export interface NotificationsResponse {
  success: boolean;
  data: Notification[];
  paging: Paging;
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
    paging: {} as Paging,
    loading: false,
    error: '' as string | null,
  }),
  actions: {
    async fetchNotifications(page: number = 0, pageSize: number = 50) {
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const response = await $fetch<NotificationsResponse>(`${config.public.apiHost}/notifications-service/notifications?receiverId=1a1a28b4-4b90-46f3-9381-35420bbb13fc`, {
          method: 'GET',
          query: { pageNumber: page, pageSize },
        });
        if (response.success) {
          if (page === 0) {
            this.notifications = response.data;
          } else {
            this.notifications.push(...response.data);
          }
          this.paging = response.paging;
        }
      } catch (err: any) {
        this.error = err.message || 'Ошибка загрузки уведомлений';
        console.error('Ошибка при получении уведомлений:', err);
      } finally {
        this.loading = false;
      }
    },
    async loadNextPage() {
      if (this.paging.last) return;
      const nextPage = this.paging.pageNumber + 1;
      await this.fetchNotifications(nextPage, this.paging.pageSize || 50);
    },
  },
});

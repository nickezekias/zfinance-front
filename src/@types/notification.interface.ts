interface NotificationInterface {
  createdAt: string;
  id: number;
  type: string;
  data: {
    description: string
    title: string
  }
  readAt: string
  updatedAt: string
}

export type { NotificationInterface }
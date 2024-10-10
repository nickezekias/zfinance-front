interface NotificationInterface {
  createdAt: string;
  id: number;
  type: string;
  data: {
    description: string
    title: string
  }
  updatedAt: string
}

export type { NotificationInterface }
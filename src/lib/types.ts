export type Client = {
  id: string;
  name: string;
};

export type StoryStatus = "Backlog" | "In Progress" | "Done";
export type StoryType = "Incident" | "Request" | "Change" | "Other";
export type StoryTicketType = "Request" | "Change" | "Change" | "Other";

export type Story = {
  id: string;
  reference: string;
  shortDescription: string;
  ticketType: StoryTicketType;
  title: string;
  clientId: string;
  status: StoryStatus;
  type: StoryType;
  updatedAt: string;
};

export type Development = {
  id: string;
  clientId: string;
  storyId?: string;
  type: string;
  name: string;
  table: string;
  author: string;
  updatedAt: string;
};

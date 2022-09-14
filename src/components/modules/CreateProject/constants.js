export const createProjectFormInputFields = [
  {
    type: "text",
    id: "title",
    label: "Title",
    placeholder: "Give your exhibition a title ...",
  },
  {
    type: "textarea",
    id: "description",
    label: "Description",
    placeholder: "Describe your exhibition ...",
  },
  {
    type: "number",
    id: "goal",
    label: "Goal",
    placeholder: "What's your crowdfunding goal ...",
  },
  {
    type: "date",
    id: "date_due",
    label: "Due date",
    placeholder: "Enter a due date ...",
  },
  {
    type: "text",
    id: "image",
    label: "Image",
    placeholder: "Put an image url here ...",
  },
];

export const initialLocationStates = [
  { Adelaide: false },
  { Brisbane: false },
  { Canberra: false },
  { Darwin: false },
  { Hobart: false },
  { Melbourne: false },
  { Perth: false },
  { Sydney: false },
];

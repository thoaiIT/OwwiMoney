export const sendLimitExceededEmail = (resp: UserBudgetResponse) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Limit Exceeded Email</title>
  </head>
  <body>
      <h2>Hi ${resp.user.name}</h2>
      <p>Your budget limit for ${resp.category.name} (${resp.category.type.name}) has been exceeded.</p>
      <p>Details:</p>
      <ul>
        <li>User ID: ${resp.userId}</li>
        <li>Category ID: ${resp.categoryId}</li>
        <li>Expected: ${resp.expected}</li>
        <li>Actual: ${resp.actual}</li>
        <li>Status: ${resp.status}</li>
      </ul>
  </body>
  </html>
  `;
};

type UserBudgetResponse = {
  id: string;
  categoryId: string;
  userId: string;
  expected: number | null;
  actual: number | null;
  status: string | null;
  user: {
    name: string;
    email: string;
  };
  category: {
    name: string;
    type: {
      name: string;
    };
  };
};

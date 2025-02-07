export default {
  routes: [
    {
      method: "DELETE",
      path: "/accounts",
      handler: "account.deleteMany"
    }
  ]
};

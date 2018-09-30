async function createItem(parent, args, ctx, info) {
  // Check if logged in

  const item = await ctx.db.mutation.createItem(
    {
      data: { ...args },
    },
    info
  );

  return item;
}

function updateItem(parent, args, ctx, info) {
  const updates = { ...args };
  delete updates.id;
  return ctx.db.mutation.updateItem(
    {
      data: updates,
      where: {
        id: args.id,
      },
    },
    info
  );
}

async function deleteItem(parent, args, ctx, info) {
  const where = { id: args.id };

  const item = await ctx.db.query.item(
    { where },
    `{id 
    title}`
  );

  return ctx.db.mutation.deleteItem({ where }, info);
}

const Mutations = {
  createItem,
  updateItem,
  deleteItem,
};

module.exports = Mutations;

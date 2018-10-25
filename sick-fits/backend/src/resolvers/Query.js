const { forwardTo } = require('prisma-binding');

function me(parent, args, ctx, info) {
  if (!ctx.request.userId) {
    return null;
  }

  return ctx.db.query.user(
    {
      where: { id: ctx.request.userId },
    },
    info
  );
}

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me,
};

module.exports = Query;

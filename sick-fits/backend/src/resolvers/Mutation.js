const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

async function signup(parent, args, ctx, info) {
  args.email = args.email.toLowerCase();

  const password = await bcrypt.hash(args.password, 10);

  const user = await ctx.db.mutation.createUser(
    {
      data: {
        ...args,
        password,
        permissions: {
          set: ['USER'],
        },
      },
    },
    info
  );

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.APP_SECRET
  );

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  return user;
}

async function signin(parent, args, ctx, info) {
  args.email = args.email.toLowerCase();

  const user = await ctx.db.query.user({ where: { email: args.email } });

  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.APP_SECRET
  );

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  return user;
}

function signout(parent, args, ctx, info) {
  ctx.response.clearCookie('token');
  return { message: 'Goodbye!' };
}

const Mutations = {
  createItem,
  updateItem,
  deleteItem,
  signup,
  signin,
  signout,
};

module.exports = Mutations;

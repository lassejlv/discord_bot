import { GetUserDataWithTodos } from '@/lib/helpers';
import { defineCommand } from '@/types/Command';

export default defineCommand({
  details: {
    name: 'todo',
    description: 'Create, Update, Delete, and List your todos',
  },

  run: async ({ message, args, prisma }) => {
    const user = await GetUserDataWithTodos(message.author.id);
    if (!user) return;

    const subCommand = args[0];
    if (!subCommand) return;

    const msg = await message.reply('Processing...');

    switch (subCommand) {
      case 'add': {
        const task = args.slice(1).join(' ');

        if (!task) return msg.edit('Please provide a task to add');
        if (task.length > 250) return msg.edit('Task length should be less than 250 characters');
        if (task.length < 3) return msg.edit('Task length should be more than 3 characters');

        const shouldBeDoneAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days from now

        const newTodo = await prisma.todoList.create({
          data: {
            name: task.slice(0, 50) + (task.length > 50 ? '...' : ''),
            task,
            shouldBeDoneAt,
            userId: user.id,
          },
        });

        console.log(newTodo);

        msg.edit('added :thumbsup:');
        break;
      }

      default: {
        msg.edit('Invalid subcommand');
        break;
      }
    }
  },
});

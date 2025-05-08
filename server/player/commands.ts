import { addCommand } from '@communityox/ox_lib/server';
import { OxPlayer } from 'player/class';

// NOTE: These commands are intended for development purposes.

addCommand('logout', async (playerId) => OxPlayer.get(playerId).logout(true), {
  help: 'Logout and return to character selection.',
  restricted: 'group.admin',
});

addCommand(
  'deletechar',
  async (playerId) => {
    const player = OxPlayer.get(playerId);

    if (!player.charId) return;

    player.deleteCharacter(player.charId);
  },
  {
    help: 'Hard delete your current character (cannot be reversed).',
    restricted: 'group.admin',
  },
);

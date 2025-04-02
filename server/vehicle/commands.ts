import { addCommand } from '@overextended/ox_lib/server';
import { OxVehicle } from './class';
import { sleep } from '@overextended/ox_lib';
import { CreateVehicle } from 'vehicle';
import { OxPlayer } from 'player/class';

export function DeleteCurrentVehicle(ped: number) {
  const entity = GetVehiclePedIsIn(ped, false);

  if (!entity) return;

  const vehicle = OxVehicle.get(entity);

  vehicle ? vehicle.setStored('impound', true) : DeleteEntity(entity);
}

addCommand<{ model: string; owner?: number }>(
  'car',
  async (playerId, args, raw) => {
    const ped = playerId && GetPlayerPed(playerId as any);

    if (!ped) return;

    const player = args.owner ? OxPlayer.get(args.owner) : null;
    const data = {
      model: args.model,
      owner: player?.charId || undefined,
    };

    const vehicle = await CreateVehicle(data, GetEntityCoords(ped), GetEntityHeading(ped)) as OxVehicle;

    if (!vehicle) return;

    exports.mgcl_vehicles.giveKey(playerId, vehicle.netId);
    DeleteCurrentVehicle(ped);
    await sleep(200);
    SetPedIntoVehicle(ped, vehicle.entity, -1);
  },
  {
    help: `Spawn a vehicle with the given model.`,
    params: [
      { name: 'model', paramType: 'string', help: 'The vehicle archetype.' },
      {
        name: 'owner',
        paramType: 'playerId',
        help: "Create a persistent vehicle owned by the target's active character.",
        optional: true,
      },
    ],
    restricted: 'group.admin',
  }
);

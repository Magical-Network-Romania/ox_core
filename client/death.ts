import { OxPlayer } from "player";

function ResetDeathState() {
  OxPlayer.state.set("isDead", false, true);
}

on("ox:playerLogout", ResetDeathState);
on("ox:playerRevived", ResetDeathState);

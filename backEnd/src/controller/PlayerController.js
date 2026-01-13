import db from "../models/index.js";
const { Player, Stats } = db;

export const getPlayer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Cannot find player" });
    const player = await Player.findByPk(id);

    const playerStats = await Stats.findOne({
      where: { player_id: player.id },
    });

    if (!player) return res.status(404).json({ message: "Cannot find player" });
    return res.status(200).json({ player, playerStats });
  } catch (error) {
    console.error("Error fetching player:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

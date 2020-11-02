function validateLineup(lineup) {
  let totalSalary = lineup.reduce((acc, val) => acc + val.salary, 0)

  if (totalSalary > 45000) {
    return false
  }
  const playerPosition = lineup.reduce((acc, player) => {
    acc[player.position]++

    return acc
  }, {
    'P': 0, 'C': 0, '1B': 0, '2B': 0, '3B': 0, 'SS': 0, 'OF': 0
  })

  if (playerPosition['P'] !== 1 || playerPosition['C'] !== 1 ||
  playerPosition['1B'] !== 1 || playerPosition['2B'] !== 1 ||
  playerPosition['3B'] !== 1 || playerPosition['SS'] !== 1 ||
  playerPosition['OF'] !== 3)
  {
    return false
  }
  if (!validateTeams(lineup) || !validateGames(lineup)) {
    return false
  }

  return true
}
function validateTeams(lineup) {
  const playerTeam = lineup.reduce((acc, player) => {
    acc.hasOwnProperty(player.teamId)
      ? acc[player.teamId]++
      : acc[player.teamId] = 1

    return acc
  }, { })

  return Object.values(playerTeam).every(el => el <= 2)
}
function validateGames(lineup) {
  const playerGame = lineup.reduce((acc, player) => {
    acc.hasOwnProperty(player.gameId)
      ? acc[player.gameId]++
      : acc[player.gameId] = 1

    return acc
  }, { })

  return Object.values(playerGame).every(el => el <= 3)
}
module.exports = validateLineup

const calculateHealthDrift = (signals) => {
  const { voice, motor, cognition, face } = signals;
  
  // Weights from spec
  const weights = {
    voice: 0.30,
    motor: 0.25,
    cognition: 0.25,
    face: 0.20
  };

  const totalScore = (
    (voice * weights.voice) +
    (motor * weights.motor) +
    (cognition * weights.cognition) +
    (face * weights.face)
  );

  let riskCategory = 'Normal';
  if (totalScore < 30) riskCategory = 'Critical monitoring';
  else if (totalScore < 50) riskCategory = 'Elevated risk';
  else if (totalScore < 75) riskCategory = 'Mild drift';

  return {
    totalScore: Math.round(totalScore),
    riskCategory,
    timestamp: Date.now()
  };
};

module.exports = { calculateHealthDrift };

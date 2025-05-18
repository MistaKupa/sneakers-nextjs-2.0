import { motion } from "motion/react";

const passwordLevelMenu = [
  {
    level: 1,
    strength: "Weak",
    indicatorColor: "bg-red-500",
    messageColor: "text-red-500",
  },
  {
    level: 2,
    strength: "Medium",
    indicatorColor: "bg-amber-500",
    messageColor: "text-amber-500",
  },
  {
    level: 3,
    strength: "Strong",
    indicatorColor: "bg-amber-400",
    messageColor: "text-amber-400",
  },
  {
    level: 4,
    strength: "Very Strong",
    indicatorColor: "bg-green-500",
    messageColor: "text-green-500",
  },
];

const validatePassword = (password) => {
  // const levels = { 1: "Weak", 2: "Medium", 3: "Strong", 4: "Very Strong" };

  if (password.length > 15)
    return { score: 0, strength: "Password is too long!" };
  if (password.length < 8)
    return { score: 0, strength: "Password is too short!" };

  const checks = [
    /[a-z]/, // LowerCase
    /[A-Z]/, // UpperCase
    /\d/, // Digit
    /[@.#$!%^&*.?]/, // Special character
  ];
  let score = checks.reduce((acc, rgx) => acc + rgx.test(password), 0);
  const strength = passwordLevelMenu[score - 1]?.strength || "Very Weak";
  const isValid = score >= 1;

  return {
    score,
    strength,
    isValid,
  };
};

function PasswordStrengthIndicator({ password, setIsValid }) {
  const { score, strength, isValid } = validatePassword(password);
  const color = passwordLevelMenu[score - 1]?.messageColor || "text-red-500";

  return (
    <div className="flex flex-col w-full justify-center px-3">
      <span className={`min-h-5 text-xs ${color}`}>{strength}</span>
      <div className="w-full h-3 flex justify-between gap-3">
        {passwordLevelMenu.map((level, index) => (
          <div
            key={level.level}
            className={`w-full h-3 rounded-sm ${
              strength === "Password is too long!"
                ? "bg-red-500"
                : "bg-slate-200"
            }`}
          >
            {strength === level.strength && (
              <motion.div
                layoutId="passwordStrength"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className={`w-full h-full rounded-sm ${level.indicatorColor}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PasswordStrengthIndicator;

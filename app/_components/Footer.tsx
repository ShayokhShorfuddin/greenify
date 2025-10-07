import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-500 p-2 font-sans">
      <p className="text-white font-medium text-sm text-center">
        Built with {getRandomEmoji()} by{" "}
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/shayokh-the-frontend-dev/"
          className="underline"
        >
          Shayokh Shorfuddin
        </Link>
      </p>
    </footer>
  );
}

// Picks a random emoji for the footer
function getRandomEmoji() {
  const emojis = ["🌸", "🌼", "🌷", "🤍", "💖", "💕"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

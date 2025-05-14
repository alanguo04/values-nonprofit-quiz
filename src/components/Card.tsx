"use client";

type Nonprofit = {
  name: string;
  cause: string;
  mission: string;
  location: string;
  annualcharity: string;
  peopleaffected: string;
  website: string;
};

export default function Card({
  nonprofit,
  onNext,
  onPrev,
}: {
  nonprofit: Nonprofit;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  return (
    <div className="relative flex flex-col items-center w-full max-w-xl space-y-4">
      <div className="flex items-center justify-between w-full">
        {/* Left Button (outside card) */}
        {onPrev ? (
          <button
            onClick={onPrev}
            className="p-3 bg-white border rounded-full shadow hover:bg-gray-100"
          >
            ←
          </button>
        ) : (
          <div className="w-10" />
        )}

        {/* Card */}
        <div className="p-6 bg-white rounded-xl shadow-lg space-y-2 flex-1 mx-4">
          <h2 className="text-xl font-bold">{nonprofit.name}</h2>
          <p className="text-gray-600 italic">{nonprofit.mission}</p>
          <p><strong>Cause:</strong> {nonprofit.cause}</p>
          <p><strong>Location:</strong> {nonprofit.location}</p>
          <p><strong>Annual Donations:</strong> {nonprofit.annualcharity}</p>
          <p><strong>People Affected:</strong> {nonprofit.peopleaffected}</p>
          <a
            href={nonprofit.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Visit Website
          </a>
        </div>

        {/* Right Button (outside card) */}
        {onNext ? (
          <button
            onClick={onNext}
            className="p-3 bg-white border rounded-full shadow hover:bg-gray-100"
          >
            →
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>
    </div>
  );
}

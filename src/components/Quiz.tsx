"use client";
import { useState } from "react";

type QuizAnswers = {
  cause: string;
  scope: string;
  size: string;
  count: number;
};

export default function Quiz({
  onSubmit,
}: {
  onSubmit: (answers: QuizAnswers) => void;
}) {
  const [form, setForm] = useState<QuizAnswers>({
    cause: "climate",
    scope: "global",
    size: "large",
    count: 3,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "count" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <label className="block">
        Cause:
        <select name="cause" onChange={handleChange} value={form.cause} className="ml-2">
          <option value="climate">Climate</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="dei">DEI</option>
        </select>
      </label>

      <label className="block">
        Scope:
        <select name="scope" onChange={handleChange} value={form.scope} className="ml-2">
          <option value="local">Local</option>
          <option value="global">Global</option>
        </select>
      </label>

      <label className="block">
        Nonprofit Size:
        <select name="size" onChange={handleChange} value={form.size} className="ml-2">
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
      </label>

      <label className="block">
        How many nonprofits do you want to see?
        <input
          name="count"
          type="number"
          min={1}
          max={10}
          value={form.count}
          onChange={handleChange}
          className="ml-2 w-16"
        />
      </label>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Submit
      </button>
    </form>
  );
}
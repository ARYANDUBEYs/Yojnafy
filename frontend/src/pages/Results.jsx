import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import { useState } from "react";
import SchemeCard from "../components/results/SchemeCard";
import { dummySchemes } from "../data/schemes";

function Results() {
  const [schemes, setSchemes] = useState(dummySchemes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (schemes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-5xl mx-auto py-10 px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-blue-700">
            YojnaFy - AI Powered Smart Scheme Navigaotr
          </h1>

          <p className="text-gray-600 mt-3 text-lg">Smart Scheme Navigator</p>

          <div className="mt-6 border-t pt-5">
            <h2 className="text-2xl font-semibold">
              ✅ Eligible Government Schemes
            </h2>

            <p className="text-gray-500 mt-2">
              Based on your responses, we found
              <span className="font-bold text-blue-700">
                {" "}
                {schemes.length} schemes
              </span>{" "}
              that match your profile.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {schemes.map((scheme, index) => (
            <SchemeCard key={index} scheme={scheme} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;

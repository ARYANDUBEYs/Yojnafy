import React, { useState } from "react";
import DocumentChecklist from "./DocumentChecklist";

function SchemeCard({ scheme }) {
  const [showChecklist, setShowChecklist] = useState(false);

 return (
   <>
     <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition">
       {/* Top Section */}
       <div className="flex justify-between items-start">
         <div>
           <h2 className="text-2xl font-bold text-blue-700">
             📘 {scheme.name}
           </h2>

           <p className="text-gray-600 mt-3 leading-relaxed">
             {scheme.description}
           </p>
         </div>

         <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
           Eligible
         </span>
       </div>

       {/* Extra Info */}
       <div className="mt-5 flex flex-wrap gap-3">
         <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
           Government Scheme
         </span>

         <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">
           Verified
         </span>
       </div>

       {/* Buttons */}
       <div className="mt-8 flex flex-wrap gap-4">
         <button
           onClick={() => setShowChecklist(true)}
           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium flex-1"
         >
           📄 View Documents
         </button>

         <button
           onClick={() => window.open(scheme.portal, "_blank")}
           className="border border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-5 py-3 rounded-xl font-medium flex-1 transition"
         >
           🌐 Official Portal
         </button>
       </div>
     </div>

     {showChecklist && (
       <DocumentChecklist
         documents={scheme.documents}
         onClose={() => setShowChecklist(false)}
       />
     )}
   </>
 );
}

export default SchemeCard;

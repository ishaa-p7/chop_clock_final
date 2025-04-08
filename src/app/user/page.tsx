// app/appointments/page.tsx
import { authOptions } from "@/lib/config/authOptions";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AppointmentsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      services: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Your Appointments
        </h1>
        {appointments.length === 0 ? (
          <p className="text-blue-700">You have no appointments yet.</p>
        ) : (
          <ul className="space-y-6">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="bg-white rounded-xl shadow-md p-6 border border-blue-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-800">
                      {appointment.customerName}
                    </h2>
                    <p className="text-blue-600 text-sm">{appointment.customerEmail}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
                <p className="text-sm text-blue-700">
                  📅 {new Date(appointment.date).toLocaleDateString()} @ ⏰ {appointment.time}
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  💰 Total: ${appointment.totalPrice.toFixed(2)} | ⏳ Duration: {appointment.totalDuration} mins
                </p>
                {appointment.services.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-blue-800 mb-1">Services:</h3>
                    <ul className="list-disc list-inside text-sm text-blue-700">
                      {appointment.services.map((service) => (
                        <li key={service.id}>{service.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

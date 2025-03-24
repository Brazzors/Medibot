const API_URL = 'http://localhost:3000';
const token = localStorage.getItem("token");

if (!token) window.location.href = "login.html";

async function getAppointments() {
    const res = await fetch(`${API_URL}/doctor/appointments`, {
        headers: { Authorization: token }
    });

    const appointments = await res.json();
    let html = "<h3>Appuntamenti</h3>";
    
    appointments.forEach(app => {
        html += `<p>${app.appointment_date} - Stato: ${app.status} 
        <button onclick="confirmAppointment(${app.id})">Conferma</button></p>`;
    });

    document.getElementById("appointments").innerHTML = html;
}

async function confirmAppointment(id) {
    await fetch(`${API_URL}/doctor/confirm/${id}`, {
        method: "PUT",
        headers: { "Authorization": token }
    });
    alert("Prenotazione confermata!");
    getAppointments();
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

getAppointments();

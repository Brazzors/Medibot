const API_URL = 'http://localhost:3000';
const token = localStorage.getItem("token");

// Verifica se l'utente è autenticato
if (!token) {
    window.location.href = "login.html";
}

// Recupera l'elenco dei medici disponibili
async function getDoctors() {
    const res = await fetch(`${API_URL}/doctors`, {
        headers: { "Authorization": token }
    });
    const doctors = await res.json();
    
    let options = "<option value=''>Seleziona un medico</option>";
    doctors.forEach(doctor => {
        options += `<option value="${doctor.id}">${doctor.name}</option>`;
    });

    document.getElementById("doctorSelect").innerHTML = options;
}

// Prenota una visita
async function bookAppointment() {
    const doctorId = document.getElementById("doctorSelect").value;
    const appointmentDate = document.getElementById("appointmentDate").value;

    if (!doctorId || !appointmentDate) {
        alert("Seleziona un medico e una data valida.");
        return;
    }

    const res = await fetch(`${API_URL}/patient/book`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ doctor_id: doctorId, appointment_date: appointmentDate })
    });

    const data = await res.json();
    if (res.ok) {
        alert("Prenotazione effettuata con successo!");
        getAppointments();
    } else {
        alert(data.message);
    }
}

// Recupera le prenotazioni del paziente
async function getAppointments() {
    const res = await fetch(`${API_URL}/patient/appointments`, {
        headers: { "Authorization": token }
    });

    const appointments = await res.json();
    let html = "<h3>Le tue prenotazioni</h3>";

    appointments.forEach(app => {
        html += `
            <p>${app.appointment_date} - Medico: ${app.doctor_name} - Stato: ${app.status}
            <button onclick="cancelAppointment(${app.id})">Annulla</button></p>`;
    });

    document.getElementById("appointments").innerHTML = html;
}

// Cancella una prenotazione
async function cancelAppointment(id) {
    const res = await fetch(`${API_URL}/patient/cancel/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
    });

    if (res.ok) {
        alert("Prenotazione annullata!");
        getAppointments();
    } else {
        const data = await res.json();
        alert(data.message);
    }
}

// Inizializza la pagina
getDoctors();
getAppointments();

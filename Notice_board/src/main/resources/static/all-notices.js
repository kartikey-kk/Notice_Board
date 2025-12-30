const baseUrl = "http://localhost:8081/notices";

// Page load par notices fetch
fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("notices");

        if (data.length === 0) {
            container.innerHTML = "<p>No notices available</p>";
            return;
        }

        data.forEach(n => {
            container.innerHTML += `
                <div class="notice">
                    <b>${n.title}</b><br>
                    ${n.description}<br><br>

                    <button onclick="goToUpdate(${n.id})" style="background-color: skyblue; color: black;"
>Update</button>
                    <button onclick="deleteNotice(${n.id})">Delete</button>
                </div>
            `;
        });
    });

function goToUpdate(id) {
    window.location.href = `update.html?id=${id}`;
}

function deleteNotice(id) {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    fetch(`${baseUrl}/${id}`, { method: "DELETE" })
        .then(() => {
            alert("Notice deleted");
            location.reload(); // refresh page
        });
}

function goBack() {
    window.location.href = "index.html";
}

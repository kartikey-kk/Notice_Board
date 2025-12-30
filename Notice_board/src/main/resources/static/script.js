const baseUrl = "http://localhost:8081/notices";
let noticesVisible = false;

function loadNotices() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("notices");
            container.innerHTML = "";
            data.forEach(n => {
                container.innerHTML += `
                    <div class="notice">
                        <b>${n.title}</b><br>
                        ${n.description}<br><br>
                        <button onclick="goToUpdate(${n.id})">Update</button>
                        <button onclick="deleteNotice(${n.id})">Delete</button>
                    </div>
                `;
            });
        });
}

function toggleNotices() {
    const container = document.getElementById("notices");
    const btn = document.getElementById("toggleBtn");

    if (!noticesVisible) {
        loadNotices();
        container.style.display = "block";
        btn.innerText = "Hide Notices";
        noticesVisible = true;
    } else {
        container.style.display = "none";
        btn.innerText = "Show All Notices";
        noticesVisible = false;
    }
}

function addOrUpdateNotice() {
    const id = document.getElementById("noticeId").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!title || !description) {
        alert("Title and Description required");
        return;
    }

    if (id) {
        fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description })
        }).then(() => {
            resetForm();
            loadNotices();
        });
    } else {
        fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description })
        }).then(() => {
            resetForm();
            loadNotices();
        });
    }
}

function editNotice(id, title, description) {
    document.getElementById("noticeId").value = id;
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("submitBtn").innerText = "Update Notice";
}

function deleteNotice(id) {
    fetch(`${baseUrl}/${id}`, { method: "DELETE" })
        .then(() => loadNotices());
}

function resetForm() {
    document.getElementById("noticeId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("submitBtn").innerText = "Add Notice";
}
function goToUpdate(id) {
    window.location.href = `update.html?id=${id}`;
}
function goToAllNotices() {
    window.location.href = "all-notices.html";
}

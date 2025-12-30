const baseUrl = "http://localhost:8081/notices";

// URL se id nikalna
const params = new URLSearchParams(window.location.search);
const noticeId = params.get("id");

// Page load pe notice fetch
fetch(`${baseUrl}`)
    .then(res => res.json())
    .then(data => {
        const notice = data.find(n => n.id == noticeId);
        if (notice) {
            document.getElementById("title").value = notice.title;
            document.getElementById("description").value = notice.description;
        }
    });

// UPDATE function
function updateNotice() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!title || !description) {
        alert("All fields required");
        return;
    }

    fetch(`${baseUrl}/${noticeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    }).then(() => {
        alert("Notice updated successfully");
        window.location.href = "all-notices.html";
    });
}

function goBack() {
    window.location.href = "all-notices.html";
}

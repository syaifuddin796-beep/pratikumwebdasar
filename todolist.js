// Data tugas (array of object)
let tasks = [
  { id: 1, text: 'Belajar JavaScript', done: false },
  { id: 2, text: 'Buat proyek sederhana', done: false },
  { id: 3, text: 'Coba To-Do List ini', done: true },
];

let currentFilter = 'all';
let nextId = 4;

// Fungsi untuk menampilkan tugas ke layar
function render() {
  const list = document.getElementById('taskList');
  const emptyMsg = document.getElementById('emptyMsg');

  // Filter tugas sesuai pilihan
  let filtered = tasks;
  if (currentFilter === 'active') filtered = tasks.filter(t => !t.done);
  if (currentFilter === 'done')   filtered = tasks.filter(t => t.done);

  // Kosongkan list sebelum diisi ulang
  list.innerHTML = '';

  if (filtered.length === 0) {
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';

    // Buat elemen <li> untuk setiap tugas
    filtered.forEach(function(task) {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.done ? ' done' : '');

      li.innerHTML =
        '<input type="checkbox" ' + (task.done ? 'checked' : '') + ' onchange="toggleTask(' + task.id + ')" />' +
        '<span class="task-text" onclick="toggleTask(' + task.id + ')">' + task.text + '</span>' +
        '<button class="btn-delete" onclick="deleteTask(' + task.id + ')">✕</button>';

      list.appendChild(li);
    });
  }

  // Update counter
  const remaining = tasks.filter(t => !t.done).length;
  document.getElementById('counter').textContent = remaining + ' tugas tersisa';
}

// Tambah tugas baru
function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();

  if (text === '') {
    alert('Tugas tidak boleh kosong!');
    return;
  }

  tasks.unshift({ id: nextId++, text: text, done: false });
  input.value = '';
  render();
}

// Centang / batalkan tugas
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.done = !task.done;
  render();
}

// Hapus satu tugas
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

// Hapus semua tugas yang sudah selesai
function clearDone() {
  tasks = tasks.filter(t => !t.done);
  render();
}

// Filter: semua / aktif / selesai
function filterTasks(filter) {
  currentFilter = filter;

  // Update tampilan tombol aktif
  document.getElementById('btn-all').classList.remove('active');
  document.getElementById('btn-active').classList.remove('active');
  document.getElementById('btn-done').classList.remove('active');
  document.getElementById('btn-' + filter).classList.add('active');

  render();
}

// Tekan Enter untuk tambah tugas
document.getElementById('taskInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addTask();
});

// Tampilkan tugas saat halaman pertama kali dibuka
render();
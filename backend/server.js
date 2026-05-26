const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// ── Ensure videos folder exists ──────────────────────────────
const VIDEOS_DIR = path.join(__dirname, 'videos');
if (!fs.existsSync(VIDEOS_DIR)) fs.mkdirSync(VIDEOS_DIR, { recursive: true });

// ── Multer storage config ────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, VIDEOS_DIR),
  destination: (req, file, cb) => cb(null, VIDEOS_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
  fileFilter: (req, file, cb) => {
    const allowed = /mp4|webm|ogg|mov|avi|mkv/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
               allowed.test(file.mimetype.split('/')[1]);
    ok ? cb(null, true) : cb(new Error('Only video files are allowed!'));
  }
});

// ── Metadata file (acts as a tiny database) ──────────────────
const META_FILE = path.join(__dirname, 'videos.json');

function readMeta() {
  if (!fs.existsSync(META_FILE)) return [];
  return JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
}

function writeMeta(data) {
  fs.writeFileSync(META_FILE, JSON.stringify(data, null, 2));
}

// ── Seed 5 placeholder entries on first run ───────────────────
if (!fs.existsSync(META_FILE)) {
  writeMeta([
    { id: 1, title: 'Web Dev Crash Course', channel: 'Easy Tutorials', views: '15k', uploaded: '2 days ago', filename: null, thumbnail: 'https://picsum.photos/seed/vid1/480/270' },
    { id: 2, title: 'CSS Mastery Guide', channel: 'Easy Tutorials', views: '22k', uploaded: '5 days ago', filename: null, thumbnail: 'https://picsum.photos/seed/vid2/480/270' },
    { id: 3, title: 'JavaScript ES2025 Features', channel: 'Easy Tutorials', views: '18k', uploaded: '1 week ago', filename: null, thumbnail: 'https://picsum.photos/seed/vid3/480/270' },
    { id: 4, title: 'Node.js REST API Tutorial', channel: 'Easy Tutorials', views: '31k', uploaded: '2 weeks ago', filename: null, thumbnail: 'https://picsum.photos/seed/vid4/480/270' },
    { id: 5, title: 'React Hooks Deep Dive', channel: 'Easy Tutorials', views: '27k', uploaded: '3 weeks ago', filename: null, thumbnail: 'https://picsum.photos/seed/vid5/480/270' }
  ]);
}

// ── Middleware ────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/videos', express.static(VIDEOS_DIR)); // serve uploaded videos

// ── API: list all videos ──────────────────────────────────────
app.get('/api/videos', (req, res) => {
  res.json(readMeta());
});

// ── API: upload a new video ───────────────────────────────────
app.post('/api/upload', upload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const meta = readMeta();
  const newVideo = {
    id: Date.now(),
    title: req.body.title || req.file.originalname,
    channel: req.body.channel || 'My Channel',
    views: '0',
    uploaded: 'Just now',
    filename: req.file.filename,
    thumbnail: `https://picsum.photos/seed/${req.file.filename}/480/270`
  };
  meta.push(newVideo);
  writeMeta(meta);

  res.json({ success: true, video: newVideo });
});

// ── API: download a video ─────────────────────────────────────
app.get('/api/download/:filename', (req, res) => {
  const filePath = path.join(VIDEOS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  res.download(filePath);
});

// ── API: delete a video ───────────────────────────────────────
app.delete('/api/videos/:id', (req, res) => {
  let meta = readMeta();
  const video = meta.find(v => v.id == req.params.id);
  if (!video) return res.status(404).json({ error: 'Not found' });

  if (video.filename) {
    const filePath = path.join(VIDEOS_DIR, video.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  meta = meta.filter(v => v.id != req.params.id);
  writeMeta(meta);
  res.json({ success: true });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎬 Video Site running at: http://localhost:${PORT}\n`);
});

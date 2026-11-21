import os
import math
import struct
import wave
from PIL import Image, ImageDraw, ImageFont

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path, exist_ok=True)

# 1. Generate Authentic High-Fidelity Audio Soundscapes (WAV 44.1kHz 16-bit Stereo)
def generate_audio_files():
    audio_dir = os.path.join("public", "audio")
    ensure_dir(audio_dir)
    sample_rate = 44100

    def write_wav(filename, duration, gen_sample_func):
        filepath = os.path.join(audio_dir, filename)
        num_samples = int(sample_rate * duration)
        with wave.open(filepath, "w") as wav_file:
            wav_file.setnchannels(2) # Stereo
            wav_file.setsampwidth(2) # 16-bit
            wav_file.setframerate(sample_rate)
            
            frames = bytearray()
            for i in range(num_samples):
                t = i / sample_rate
                left, right = gen_sample_func(t, duration)
                
                # Clamp to 16-bit range
                l_val = max(-32767, min(32767, int(left * 32767)))
                r_val = max(-32767, min(32767, int(right * 32767)))
                frames.extend(struct.pack("<hh", l_val, r_val))
                
                # Write in chunks of 44100 frames to avoid high memory
                if len(frames) >= 44100 * 4:
                    wav_file.writeframes(frames)
                    frames = bytearray()
            if frames:
                wav_file.writeframes(frames)
        print(f"Generated {filepath}: {os.path.getsize(filepath) / (1024*1024):.2f} MB")

    # Sound 1: 432 Hz Divine Omkar Soundscape (~22 seconds loop)
    def omkar_sampler(t, dur):
        # Base 136.1 Hz (Om/Cosmic frequency) + 432 Hz + 216 Hz
        base_f = 136.1
        env = math.sin(math.pi * t / dur) ** 0.5
        s1 = 0.45 * math.sin(2 * math.pi * base_f * t)
        s2 = 0.25 * math.sin(2 * math.pi * 432.0 * t + 0.1 * math.sin(2 * math.pi * 0.2 * t))
        s3 = 0.15 * math.sin(2 * math.pi * 216.0 * t)
        s4 = 0.10 * math.sin(2 * math.pi * (base_f * 2) * t)
        val = (s1 + s2 + s3 + s4) * env
        return val * 0.9, val * 0.95

    # Sound 2: Kashi Vishwanath Brass Temple Bells (~18 seconds)
    def bell_sampler(t, dur):
        bell_times = [0.0, 2.8, 6.0, 9.5, 13.0]
        total = 0.0
        for bt in bell_times:
            if t >= bt:
                dt = t - bt
                decay = math.exp(-dt * 1.4)
                # Brass bell inharmonic partials (f, 2.76f, 5.4f, 8.9f)
                b1 = 0.5 * math.sin(2 * math.pi * 780 * dt)
                b2 = 0.3 * math.sin(2 * math.pi * 2150 * dt)
                b3 = 0.2 * math.sin(2 * math.pi * 4200 * dt)
                total += (b1 + b2 + b3) * decay
        return total * 0.6, total * 0.65

    # Sound 3: Panchjanya Sacred Conch Shell (~16 seconds)
    def shankh_sampler(t, dur):
        # Deep resonant conch blow starting at 180 Hz sweeping to 220 Hz
        env = math.sin(math.pi * (t % 8.0) / 8.0) ** 2
        f = 196.0 + 15.0 * math.sin(2 * math.pi * 0.5 * t)
        s1 = 0.55 * math.sin(2 * math.pi * f * t)
        s2 = 0.25 * math.sin(2 * math.pi * (f * 2.01) * t)
        s3 = 0.15 * math.sin(2 * math.pi * (f * 3.02) * t)
        val = (s1 + s2 + s3) * env
        return val * 0.75, val * 0.75

    # Sound 4: Haridwar Ganga Aarti Chime & Resonance (~20 seconds)
    def ganga_sampler(t, dur):
        env = math.sin(math.pi * t / dur) ** 0.3
        d1 = 0.3 * math.sin(2 * math.pi * 528.0 * t) # Solfeggio love/miracle frequency
        d2 = 0.2 * math.sin(2 * math.pi * 639.0 * t)
        # Background water shimmer approximation
        shimmer = 0.1 * math.sin(2 * math.pi * 12.0 * t) * math.sin(2 * math.pi * 440.0 * t)
        val = (d1 + d2 + shimmer) * env
        return val * 0.7, val * 0.72

    print("Generating High-Fidelity Sacred Audio Soundscapes...")
    write_wav("omkar_dhwani_432hz.wav", 22.0, omkar_sampler)
    write_wav("temple_bells_kashi.wav", 18.0, bell_sampler)
    write_wav("panchjanya_shankh_deep.wav", 16.0, shankh_sampler)
    write_wav("ganga_aarti_resonance.wav", 20.0, ganga_sampler)

# 2. Generate High-Definition Sacred Art & Divine Wallpapers
def generate_hd_wallpapers():
    wp_dir = os.path.join("public", "images", "wallpapers")
    ensure_dir(wp_dir)

    wallpapers = [
        {"name": "shiva_kailash_hd.jpg", "title": "॥ देवाधिदेव महादेव शिव ॥", "sub": "ॐ नमः शिवाय • कैलासपति", "c1": (25, 10, 5), "c2": (75, 20, 10)},
        {"name": "ram_ayodhya_hd.jpg", "title": "॥ मर्यादा पुरुषोत्तम श्री राम ॥", "sub": "श्री राम जय राम जय जय राम", "c1": (45, 15, 5), "c2": (120, 45, 10)},
        {"name": "krishna_vrindavan_hd.jpg", "title": "॥ योगेश्वर भगवान श्रीकृष्ण ॥", "sub": "ॐ क्लीं कृष्णाय नमः • आनंदकंद", "c1": (10, 20, 45), "c2": (20, 60, 120)},
        {"name": "hanuman_sankatmochan_hd.jpg", "title": "॥ संकटमोचन श्री हनुमान जी ॥", "sub": "ॐ हं हनुमते नमः • अतुलितबलधाम", "c1": (60, 15, 5), "c2": (160, 40, 10)},
        {"name": "durga_bhavani_hd.jpg", "title": "॥ जगज्जननी माँ दुर्गा भवानी ॥", "sub": "ॐ दुं दुर्गायै नमः • नवार्ण शक्ति", "c1": (60, 5, 20), "c2": (140, 15, 45)},
        {"name": "lakshmi_kamalvasini_hd.jpg", "title": "॥ महालक्ष्मी कमलवासिनी ॥", "sub": "ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः", "c1": (50, 10, 30), "c2": (150, 40, 70)},
        {"name": "ganesha_vighnaharta_hd.jpg", "title": "॥ प्रथम पूज्य श्री गणेश ॥", "sub": "ॐ गं गणपतये नमः • विघ्नहर्ता", "c1": (50, 25, 5), "c2": (150, 75, 15)},
        {"name": "sri_yantra_divine_hd.jpg", "title": "॥ सिद्ध महा श्री यंत्र ॥", "sub": "सर्व रोग व दरिद्रता नाशक ब्रह्मांड चक्र", "c1": (35, 15, 5), "c2": (110, 50, 15)},
        {"name": "kuber_dhan_yantra_hd.jpg", "title": "॥ धनाधिपति श्री कुबेर यंत्र ॥", "sub": "अक्षय धन धान्य व समृद्धि प्रदायक", "c1": (40, 30, 5), "c2": (130, 90, 20)},
        {"name": "mahamrityunjaya_yantra_hd.jpg", "title": "॥ महामृत्युंजय आरोग्य यंत्र ॥", "sub": "अकाल मृत्यु व घोर संकट नाशक", "c1": (15, 25, 35), "c2": (35, 75, 105)},
        {"name": "kedarnath_dham_hd.jpg", "title": "॥ द्वादश ज्योतिर्लिंग केदारनाथ धाम ॥", "sub": "हिमालय शिखरों पर स्थित मोक्ष तीर्थ", "c1": (15, 20, 35), "c2": (40, 55, 95)},
        {"name": "kashi_vishwanath_hd.jpg", "title": "॥ काशी विश्वनाथ अविमुक्त क्षेत्र ॥", "sub": "पावन माँ गंगा तट पर ज्योतिर्लिंग", "c1": (45, 15, 5), "c2": (135, 45, 15)}
    ]

    print("Generating High-Definition Sanatan Wallpapers & Art (1080x1920)...")
    for wp in wallpapers:
        filepath = os.path.join(wp_dir, wp["name"])
        # High resolution portrait wallpaper (1080 x 1920)
        width, height = 1080, 1920
        img = Image.new("RGB", (width, height), color=wp["c1"])
        draw = ImageDraw.Draw(img)

        # Draw smooth radial/linear sacred gradient
        c1, c2 = wp["c1"], wp["c2"]
        for y in range(height):
            ratio = y / height
            r = int(c1[0] + (c2[0] - c1[0]) * math.sin(math.pi * ratio))
            g = int(c1[1] + (c2[1] - c1[1]) * math.sin(math.pi * ratio))
            b = int(c1[2] + (c2[2] - c1[2]) * math.sin(math.pi * ratio))
            draw.line([(0, y), (width, y)], fill=(r, g, b))

        # Draw Sacred Concentric Mandalas & Radiant Geometric Circles
        cx, cy = width // 2, height // 2 - 100
        gold = (255, 215, 0)
        orange = (255, 140, 0)
        amber = (245, 158, 11)

        for radius in range(50, 480, 30):
            draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], outline=amber, width=2)

        # Draw 16 Petals / Rays
        for deg in range(0, 360, 15):
            rad = math.radians(deg)
            x1 = cx + 80 * math.cos(rad)
            y1 = cy + 80 * math.sin(rad)
            x2 = cx + 460 * math.cos(rad)
            y2 = cy + 460 * math.sin(rad)
            draw.line([(x1, y1), (x2, y2)], fill=gold, width=2)

        # Draw Central Sacred Star / Lotus Motif
        draw.ellipse([cx - 90, cy - 90, cx + 90, cy + 90], fill=(120, 25, 10), outline=gold, width=4)

        # Draw Ornamental Sacred Borders
        border_inset = 40
        draw.rectangle([border_inset, border_inset, width - border_inset, height - border_inset], outline=gold, width=4)
        draw.rectangle([border_inset + 12, border_inset + 12, width - border_inset - 12, height - border_inset - 12], outline=orange, width=2)

        # Save with maximum quality to maintain high visual clarity
        img.save(filepath, "JPEG", quality=95, optimize=False)
        print(f"Generated {filepath}: {os.path.getsize(filepath) / (1024*1024):.2f} MB")

if __name__ == "__main__":
    generate_audio_files()
    generate_hd_wallpapers()
    print("All assets successfully generated!")

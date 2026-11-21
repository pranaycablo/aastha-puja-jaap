import os
import math
import struct
import wave
from PIL import Image, ImageDraw

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path, exist_ok=True)

def generate_more_audio():
    audio_dir = os.path.join("public", "audio")
    ensure_dir(audio_dir)
    sample_rate = 44100

    def write_wav(filename, duration, gen_sample_func):
        filepath = os.path.join(audio_dir, filename)
        num_samples = int(sample_rate * duration)
        with wave.open(filepath, "w") as wav_file:
            wav_file.setnchannels(2)
            wav_file.setsampwidth(2)
            wav_file.setframerate(sample_rate)
            
            frames = bytearray()
            for i in range(num_samples):
                t = i / sample_rate
                left, right = gen_sample_func(t, duration)
                l_val = max(-32767, min(32767, int(left * 32767)))
                r_val = max(-32767, min(32767, int(right * 32767)))
                frames.extend(struct.pack("<hh", l_val, r_val))
                if len(frames) >= 44100 * 4:
                    wav_file.writeframes(frames)
                    frames = bytearray()
            if frames:
                wav_file.writeframes(frames)
        print(f"Generated {filepath}: {os.path.getsize(filepath) / (1024*1024):.2f} MB")

    # Sound 5: Badrinath Himalaya Devshankh (~18 sec)
    def badrinath_sampler(t, dur):
        env = math.sin(math.pi * t / dur) ** 0.5
        f = 174.0 # Solfeggio healing pain relief
        s1 = 0.5 * math.sin(2 * math.pi * f * t)
        s2 = 0.3 * math.sin(2 * math.pi * (f * 2) * t)
        s3 = 0.15 * math.sin(2 * math.pi * (f * 3) * t)
        val = (s1 + s2 + s3) * env
        return val * 0.8, val * 0.8

    # Sound 6: Vrindavan Sacred Flute Meditation (~20 sec)
    def flute_sampler(t, dur):
        env = math.sin(math.pi * (t % 5.0) / 5.0) ** 0.8
        notes = [523.25, 587.33, 659.25, 783.99] # Raag Bhupali notes
        curr_note = notes[int(t / 2.5) % len(notes)]
        vib = 1.0 + 0.015 * math.sin(2 * math.pi * 5.0 * t)
        s1 = 0.6 * math.sin(2 * math.pi * curr_note * vib * t)
        s2 = 0.2 * math.sin(2 * math.pi * curr_note * 2 * vib * t)
        val = (s1 + s2) * env
        return val * 0.75, val * 0.78

    # Sound 7: Ujjain Mahakal Damru & Rudra Resonance (~16 sec)
    def damru_sampler(t, dur):
        beat = (t * 4.0) % 1.0
        env = math.exp(-beat * 8.0)
        drum = 0.6 * math.sin(2 * math.pi * 110.0 * beat)
        drone = 0.25 * math.sin(2 * math.pi * 136.1 * t)
        val = (drum * env + drone)
        return val * 0.8, val * 0.85

    print("Generating Additional Sacred Audio Soundscapes...")
    write_wav("badrinath_horn_deep.wav", 18.0, badrinath_sampler)
    write_wav("vrindavan_venu_dhwani.wav", 20.0, flute_sampler)
    write_wav("damru_mahakal_rudra.wav", 16.0, damru_sampler)

def generate_more_wallpapers():
    wp_dir = os.path.join("public", "images", "wallpapers")
    ensure_dir(wp_dir)

    temples = [
        {"name": "ayodhya_ram_mandir_hd.jpg", "c1": (55, 20, 5), "c2": (150, 50, 10)},
        {"name": "tirupati_balaji_hd.jpg", "c1": (45, 25, 5), "c2": (130, 80, 15)},
        {"name": "jagannath_puri_hd.jpg", "c1": (50, 15, 10), "c2": (140, 40, 20)},
        {"name": "somnath_jyotirlinga_hd.jpg", "c1": (15, 25, 45), "c2": (40, 70, 120)},
        {"name": "meenakshi_amman_hd.jpg", "c1": (50, 10, 35), "c2": (130, 25, 80)},
        {"name": "ujjain_mahakal_hd.jpg", "c1": (35, 10, 5), "c2": (90, 20, 10)}
    ]

    print("Generating Additional Sacred Temple HD Art...")
    for tm in temples:
        filepath = os.path.join(wp_dir, tm["name"])
        width, height = 1080, 1920
        img = Image.new("RGB", (width, height), color=tm["c1"])
        draw = ImageDraw.Draw(img)

        c1, c2 = tm["c1"], tm["c2"]
        for y in range(height):
            ratio = y / height
            r = int(c1[0] + (c2[0] - c1[0]) * math.sin(math.pi * ratio))
            g = int(c1[1] + (c2[1] - c1[1]) * math.sin(math.pi * ratio))
            b = int(c1[2] + (c2[2] - c1[2]) * math.sin(math.pi * ratio))
            draw.line([(0, y), (width, y)], fill=(r, g, b))

        cx, cy = width // 2, height // 2 - 80
        gold = (255, 215, 0)
        amber = (245, 158, 11)

        for radius in range(60, 500, 28):
            draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], outline=amber, width=2)

        for deg in range(0, 360, 12):
            rad = math.radians(deg)
            draw.line([(cx + 90 * math.cos(rad), cy + 90 * math.sin(rad)), (cx + 480 * math.cos(rad), cy + 480 * math.sin(rad))], fill=gold, width=2)

        draw.rectangle([40, 40, width - 40, height - 40], outline=gold, width=4)
        img.save(filepath, "JPEG", quality=95, optimize=False)
        print(f"Generated {filepath}: {os.path.getsize(filepath) / (1024*1024):.2f} MB")

if __name__ == "__main__":
    generate_more_audio()
    generate_more_wallpapers()

import subprocess, sys, os
import os.path
S=os.environ.get('DOSSIER_DIR', '.')
SRC=S+'/src'; OUT=S+'/out'; os.makedirs(OUT,exist_ok=True)
FPS=30; DUR=3.2; XF=0.8
clips={
 'hero':((1920,1080),['blue-3','meli-2','tecate-3','icare-2','summit-1','polima-2']),
 'empresas':((1920,1080),['meli-1','walmart-2','summit-1','worktech-2','santotomas-3','astara-3','muno-2','icare-1']),
 's1':((720,1080),['santotomas-2','doctores-1','cuenta-2']),
 's2':((720,1080),['blue-1','icare-2','meli-3']),
 's3':((720,1080),['walmart-3','summit-2','eaton-1']),
 's4':((720,1080),['chevrolet-1','astara-1','muno-3']),
 'blue':((1920,1080),['blue-3','blue-2','blue-1']),
 'm1':((960,540),['meli-1','meli-2','meli-3']),
 'm2':((960,540),['muno-1','muno-2','muno-3']),
 'm3':((960,540),['summit-1','worktech-3','summit-3']),
 'm4':((960,540),['activaciones-2','colombia-2','activaciones-1']),
 'shows':((1920,1080),['tecate-1','polima-1','movistar13-1','hiphop-2','entremares-2','rumble-2','tecate-2','polima-2']),
 'cierre':((1920,1080),['icare-3','rumble-1','walmart-1']),
}
def build(name):
  (W,H),imgs=clips[name]; n=len(imgs); fr=int(DUR*FPS)
  args=['ffmpeg','-y','-loglevel','error']
  for im in imgs: args+=['-loop','1','-t',str(DUR),'-i',f'{SRC}/{im}.jpg']
  f=[]
  for i in range(n):
    zin = i%2==0
    z = f"'1+0.0009*on'" if zin else f"'1.09-0.0009*on'"
    f.append(f"[{i}:v]scale={W*2}:{H*2}:force_original_aspect_ratio=increase,crop={W*2}:{H*2},zoompan=z={z}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={fr}:s={W}x{H}:fps={FPS},trim=duration={DUR},setpts=PTS-STARTPTS,format=yuv420p[v{i}]")
  last='v0'; off=DUR-XF
  for i in range(1,n):
    f.append(f"[{last}][v{i}]xfade=transition=fade:duration={XF}:offset={off:.3f}[x{i}]"); last=f'x{i}'; off+=DUR-XF
  # loop seam: fade end to first frame look -> fade to black and in
  total=n*DUR-(n-1)*XF
  f.append(f"[{last}]fade=t=in:st=0:d=0.5,fade=t=out:st={total-0.5:.3f}:d=0.5[out]")
  args+=['-filter_complex',';'.join(f),'-map','[out]','-c:v','libx264','-preset','medium','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart','-an',f'{OUT}/{name}.mp4']
  subprocess.run(args,check=True)
  subprocess.run(['ffmpeg','-y','-loglevel','error','-ss','1.6','-i',f'{OUT}/{name}.mp4','-frames:v','1','-q:v','3',f'{OUT}/{name}.jpg'],check=True)
  print(name, os.path.getsize(f'{OUT}/{name}.mp4')//1024,'KB', round(total,1),'s')
for k in (sys.argv[1:] or clips): build(k)

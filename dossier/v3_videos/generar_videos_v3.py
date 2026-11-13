import subprocess, sys, os
S=os.environ.get('DOSSIER_DIR', '.')
SRC=S+'/v2/src'; OUT=S+'/v3/out'; os.makedirs(OUT,exist_ok=True)
FPS=30
TR=['smoothleft','circleopen','slideup','fade','wipeleft','zoomin','smoothright','fadeblack','slidedown','smoothup']
FHD=(1920,1080)
clips={
 'hero':(FHD,2.4,0.5,['blue-3','meli-2','tecate-3','icare-2','summit-1','polima-2','muno-2','hiphop-2']),
 'reel':(FHD,1.5,0.35,['tecate-1','blue-2','meli-1','dvd-3','icare-3','walmart-2','entremares-3','chevrolet-1','face-1','santotomas-3','polima-1','astara-3','rumble-2','doctores-2','movistar13-2','worktech-2','hiphop-3','cuenta-2']),
 'empresas':(FHD,2.4,0.5,['meli-1','walmart-2','summit-1','worktech-2','santotomas-3','astara-3','muno-2','icare-1']),
 's1':((720,1080),2.4,0.5,['santotomas-2','doctores-1','cuenta-2','eaton-1']),
 's2':((720,1080),2.4,0.5,['blue-1','icare-2','meli-3','ciberseg-1']),
 's3':((720,1080),2.4,0.5,['walmart-3','summit-2','eaton-3','colombia-1']),
 's4':((720,1080),2.4,0.5,['chevrolet-1','astara-1','muno-3','santotomas-1']),
 'blue':(FHD,2.8,0.6,['blue-3','blue-2','blue-1']),
 'm1':((960,540),2.2,0.45,['meli-1','meli-2','meli-3']),
 'm2':((960,540),2.2,0.45,['muno-1','muno-2','muno-3']),
 'm3':((960,540),2.2,0.45,['summit-1','worktech-3','summit-3','worktech-1']),
 'm4':((960,540),2.2,0.45,['activaciones-2','colombia-2','activaciones-1','colombia-1']),
 'shows':(FHD,2.0,0.45,['tecate-1','polima-1','movistar13-1','hiphop-2','entremares-2','rumble-2','tecate-2','polima-2','face-2','dvd-2']),
 'cierre':(FHD,2.8,0.6,['icare-3','rumble-1','walmart-1','meli-2']),
}
def motion(i,W,H,fr):
  k=i%4
  c="x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
  if k==0: return f"z='1+0.12*on/{fr}':{c}"
  if k==1: return f"z='1.14':x='(iw-iw/zoom)*on/{fr}':y='ih/2-(ih/zoom/2)'"
  if k==2: return f"z='1.13-0.12*on/{fr}':{c}"
  return f"z='1.14':x='(iw-iw/zoom)*(1-on/{fr})':y='ih/2-(ih/zoom/2)'"
def build(name):
  (W,H),DUR,XF,imgs=clips[name]; n=len(imgs); fr=int(DUR*FPS)
  args=['ffmpeg','-y','-loglevel','error']
  for im in imgs: args+=['-loop','1','-t',str(DUR),'-i',f'{SRC}/{im}.jpg']
  f=[]
  for i in range(n):
    f.append(f"[{i}:v]scale={W*2}:{H*2}:force_original_aspect_ratio=increase,crop={W*2}:{H*2},zoompan={motion(i,W,H,fr)}:d={fr}:s={W}x{H}:fps={FPS},trim=duration={DUR},setpts=PTS-STARTPTS,format=yuv420p[v{i}]")
  last='v0'; off=DUR-XF
  for i in range(1,n):
    t=TR[(i-1+hash(name)%3)%len(TR)]
    f.append(f"[{last}][v{i}]xfade=transition={t}:duration={XF}:offset={off:.3f}[x{i}]"); last=f'x{i}'; off+=DUR-XF
  total=n*DUR-(n-1)*XF
  f.append(f"[{last}]fade=t=in:st=0:d=0.4,fade=t=out:st={total-0.4:.3f}:d=0.4[out]")
  args+=['-filter_complex',';'.join(f),'-map','[out]','-c:v','libx264','-preset','medium','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart','-an',f'{OUT}/{name}.mp4']
  subprocess.run(args,check=True)
  subprocess.run(['ffmpeg','-y','-loglevel','error','-ss',str(DUR*0.5),'-i',f'{OUT}/{name}.mp4','-frames:v','1','-q:v','3',f'{OUT}/{name}.jpg'],check=True)
  print(name, os.path.getsize(f'{OUT}/{name}.mp4')//1024,'KB', round(total,1),'s')
for k in (sys.argv[1:] or clips): build(k)

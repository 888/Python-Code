echo on
cp *.py /home/mininet/pyretic/pyretic/pyresonance/apps/
cp global.config /home/mininet/pyretic/pyretic/pyresonance
cd /home/mininet/pyretic
./pyretic.py pyretic.pyresonance.main --config=./pyretic/pyresonance/global.config --mode=manual


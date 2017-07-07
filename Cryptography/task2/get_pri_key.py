#!/usr/bin/python
import json, sys, hashlib,math

mod30 = [1, 7, 11, 13, 17, 19, 23, 29] # note: every prime > 5 is congruent to one of these values modulo 30.

def getPrevPrime(pr):
  # get the previous prime before the given one.
  q = pr / 30
  r = pr % 30
  i = mod30.index(r)
  i = (i + 7) % 8
  if (i == 7):
    q = q - 1
  return q * 30 + mod30[i]

def getInv(e,phi):
  # stoled from http://stackoverflow.com/questions/4798654/modular-multiplicative-inverse-function-in-python
  d = pow(e, phi-2, phi)
  return d

def usage():
    print """Usage:
        python get_pri_key.py student_id (i.e., qchenxiong3)"""
    sys.exit(1)

# TODO -- get n's factors
# reminder: you can cheat ;-), as long as you can get p and q
def get_factors(n):
    p = 0
    q = 0
   # your code starts here
    root = int(math.ceil(math.sqrt(n)))	# start at the square root of n, work away from it (assume primes are large and close together)
    quo = root / 30			# make a mod 30 unit.
    rem = 29
    pr = quo*30+rem
    while (n % pr != 0):		# if it doesn't work, find the previous prime.
      pr = getPrevPrime(pr)
    p = pr
    q = n / pr 

    # print ("%d %d" % (p,q))
    # your code ends here
    return (p, q)

# TODO: write code to get d from p, q and e
def get_key(p, q, e):
    d = 0

    # your code starts here
    phi = (p-1)*(q-1)
    d = getInv(e, phi)
    # your code ends here
    return d

def main():
    if len(sys.argv) != 2:
        usage()

    n = 0
    e = 0

    all_keys = None
    with open("keys.json", 'r') as f:
        all_keys = json.load(f)
    
    name = hashlib.sha224(sys.argv[1].strip()).hexdigest()
    if name not in all_keys:
        print sys.argv[1], "not in keylist"
        usage()
    
    pub_key = all_keys[name]
    n = int(pub_key['N'], 16)
    e = int(pub_key['e'], 16)

    print "your public key: (", hex(n).rstrip("L"), ",", hex(e).rstrip("L"), ")"

    (p, q) = get_factors(n)
    d = get_key(p, q, e)
    print "your private key:", hex(d).rstrip("L")

if __name__ == "__main__":
    main()

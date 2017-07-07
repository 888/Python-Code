#!/usr/bin/python
import json, sys, hashlib,math,fractions

def usage():
    print """Usage:
    python find_waldo.py student_id (i.e., qchenxiong3)"""
    sys.exit(1)

def getInv(e,phi):
  # stoled from http://stackoverflow.com/questions/4798654/modular-multiplicative-inverse-function-in-python
  d = pow(e, phi-2, phi)
  return d

def get_factors(n):
    p = 0
    q = 0
   # your code starts here
    root = int(math.ceil(math.sqrt(n))) # start at the square root of n, work away from it (assume primes are large and close together)
    quo = root / 30                     # make a mod 30 unit.
    rem = 29
    pr = quo*30+rem
    while (n % pr != 0):                # if it doesn't work, find the previous prime.
      pr = getPrevPrime(pr)
    p = pr
    q = n / pr

    return [p,q]

#TODO -- n1 and n2 share p or q?
def is_waldo(n1, n2):
    result = False

    #your code start here
    result = fractions.gcd(n1,n2) != 1 # if they share a factor, then a p or q for n1 must match one for n2.

    #your code ends here

    return result

#TODO -- get private key of n1
def get_private_key(n1, n2, e):
    d = 0

    #your code starts here
    p = fractions.gcd(n1,n2)
    q1 = n1/p
    phi1 = (p-1)*(q1-1)
    d = getInv(e,phi1)
    #your code ends here
    return d

def main():
    if len(sys.argv) != 2:
        usage()

    all_keys = None
    with open("keys.json", 'r') as f:
        all_keys = json.load(f)

    name = hashlib.sha224(sys.argv[1].strip()).hexdigest()
    if name not in all_keys:
        print sys.argv[1], "not in keylist"
        usage()

    pub_key = all_keys[name]
    n1 = int(pub_key['N'], 16)
    e = int(pub_key['e'], 16)
    d = 0
    waldo = "dolores"

    print "your public key: (", hex(n1).rstrip("L"), ",", hex(e).rstrip("L"), ")"

    for classmate in all_keys:
        if classmate == name:
            continue
        n2 = int(all_keys[classmate]['N'], 16)

        if is_waldo(n1, n2):
            waldo = classmate
            d = get_private_key(n1, n2, e)
            break
    
    print "your private key: ", hex(d).rstrip("L")
    print "your waldo: ", waldo


if __name__ == "__main__":
    main()

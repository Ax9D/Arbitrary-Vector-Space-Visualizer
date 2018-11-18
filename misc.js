function mapSpc(val, from_l, from_h, to_l, to_h) {

    let frac = val / (from_h - from_l);
    return to_l + frac * (to_h - to_l);
}
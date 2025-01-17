! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Matter = t()
    }
}(function() {
    return function() {
        return function t(e, i, r) {
            function n(s, a) {
                if (!i[s]) {
                    if (!e[s]) {
                        var h = "function" == typeof require && require;
                        if (!a && h) return h(s, !0);
                        if (o) return o(s, !0);
                        var u = new Error("Cannot find module '" + s + "'");
                        throw u.code = "MODULE_NOT_FOUND", u
                    }
                    var l = i[s] = {
                        exports: {}
                    };
                    e[s][0].call(l.exports, function(t) {
                        return n(e[s][1][t] || t)
                    }, l, l.exports, t, e, i, r)
                }
                return i[s].exports
            }
            for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) n(r[s]);
            return n
        }
    }()({
        1: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../geometry/Vertices"),
                o = t("../geometry/Vector"),
                s = t("../core/Sleeping"),
                a = (t("../render/Render"), t("../core/Common")),
                h = t("../geometry/Bounds"),
                u = t("../geometry/Axes");
            ! function() {
                r._inertiaScale = 4, r._nextCollidingGroupId = 1, r._nextNonCollidingGroupId = -1, r._nextCategory = 1, r.create = function(e) {
                    var i = {
                            id: a.nextId(),
                            type: "body",
                            label: "Body",
                            parts: [],
                            plugin: {},
                            angle: 0,
                            vertices: n.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),
                            position: {
                                x: 0,
                                y: 0
                            },
                            force: {
                                x: 0,
                                y: 0
                            },
                            torque: 0,
                            positionImpulse: {
                                x: 0,
                                y: 0
                            },
                            constraintImpulse: {
                                x: 0,
                                y: 0,
                                angle: 0
                            },
                            totalContacts: 0,
                            speed: 0,
                            angularSpeed: 0,
                            velocity: {
                                x: 0,
                                y: 0
                            },
                            angularVelocity: 0,
                            isSensor: !1,
                            isStatic: !1,
                            isSleeping: !1,
                            motion: 0,
                            sleepThreshold: 60,
                            density: .001,
                            restitution: 0,
                            friction: .1,
                            frictionStatic: .5,
                            frictionAir: .01,
                            collisionFilter: {
                                category: 1,
                                mask: 4294967295,
                                group: 0
                            },
                            slop: .05,
                            timeScale: 1,
                            render: {
                                visible: !0,
                                opacity: 1,
                                sprite: {
                                    xScale: 1,
                                    yScale: 1,
                                    xOffset: 0,
                                    yOffset: 0
                                },
                                lineWidth: 0
                            }
                        },
                        r = a.extend(i, e);
                    return t(r, e), r
                }, r.nextGroup = function(t) {
                    return t ? r._nextNonCollidingGroupId-- : r._nextCollidingGroupId++
                }, r.nextCategory = function() {
                    return r._nextCategory = r._nextCategory << 1, r._nextCategory
                };
                var t = function(t, e) {
                    e = e || {}, r.set(t, {
                        bounds: t.bounds || h.create(t.vertices),
                        positionPrev: t.positionPrev || o.clone(t.position),
                        anglePrev: t.anglePrev || t.angle,
                        vertices: t.vertices,
                        parts: t.parts || [t],
                        isStatic: t.isStatic,
                        isSleeping: t.isSleeping,
                        parent: t.parent || t
                    }), n.rotate(t.vertices, t.angle, t.position), u.rotate(t.axes, t.angle), h.update(t.bounds, t.vertices, t.velocity), r.set(t, {
                        axes: e.axes || t.axes,
                        area: e.area || t.area,
                        mass: e.mass || t.mass,
                        inertia: e.inertia || t.inertia
                    });
                    var i = t.isStatic ? "#2e2b44" : a.choose(["#006BA6", "#0496FF", "#FFBC42", "#D81159", "#8F2D56"]);
                    t.render.fillStyle = t.render.fillStyle || i, t.render.strokeStyle = t.render.strokeStyle || "#000", t.render.sprite.xOffset += -(t.bounds.min.x - t.position.x) / (t.bounds.max.x - t.bounds.min.x), t.render.sprite.yOffset += -(t.bounds.min.y - t.position.y) / (t.bounds.max.y - t.bounds.min.y)
                };
                r.set = function(t, e, i) {
                    var n;
                    for (n in "string" == typeof e && (n = e, (e = {})[n] = i), e)
                        if (i = e[n], e.hasOwnProperty(n)) switch (n) {
                            case "isStatic":
                                r.setStatic(t, i);
                                break;
                            case "isSleeping":
                                s.set(t, i);
                                break;
                            case "mass":
                                r.setMass(t, i);
                                break;
                            case "density":
                                r.setDensity(t, i);
                                break;
                            case "inertia":
                                r.setInertia(t, i);
                                break;
                            case "vertices":
                                r.setVertices(t, i);
                                break;
                            case "position":
                                r.setPosition(t, i);
                                break;
                            case "angle":
                                r.setAngle(t, i);
                                break;
                            case "velocity":
                                r.setVelocity(t, i);
                                break;
                            case "angularVelocity":
                                r.setAngularVelocity(t, i);
                                break;
                            case "parts":
                                r.setParts(t, i);
                                break;
                            default:
                                t[n] = i
                        }
                }, r.setStatic = function(t, e) {
                    for (var i = 0; i < t.parts.length; i++) {
                        var r = t.parts[i];
                        r.isStatic = e, e ? (r._original = {
                            restitution: r.restitution,
                            friction: r.friction,
                            mass: r.mass,
                            inertia: r.inertia,
                            density: r.density,
                            inverseMass: r.inverseMass,
                            inverseInertia: r.inverseInertia
                        }, r.restitution = 0, r.friction = 1, r.mass = r.inertia = r.density = 1 / 0, r.inverseMass = r.inverseInertia = 0, r.positionPrev.x = r.position.x, r.positionPrev.y = r.position.y, r.anglePrev = r.angle, r.angularVelocity = 0, r.speed = 0, r.angularSpeed = 0, r.motion = 0) : r._original && (r.restitution = r._original.restitution, r.friction = r._original.friction, r.mass = r._original.mass, r.inertia = r._original.inertia, r.density = r._original.density, r.inverseMass = r._original.inverseMass, r.inverseInertia = r._original.inverseInertia, delete r._original)
                    }
                }, r.setMass = function(t, e) {
                    var i = t.inertia / (t.mass / 6);
                    t.inertia = i * (e / 6), t.inverseInertia = 1 / t.inertia, t.mass = e, t.inverseMass = 1 / t.mass, t.density = t.mass / t.area
                }, r.setDensity = function(t, e) {
                    r.setMass(t, e * t.area), t.density = e
                }, r.setInertia = function(t, e) {
                    t.inertia = e, t.inverseInertia = 1 / t.inertia
                }, r.setVertices = function(t, e) {
                    e[0].body === t ? t.vertices = e : t.vertices = n.create(e, t), t.axes = u.fromVertices(t.vertices), t.area = n.area(t.vertices), r.setMass(t, t.density * t.area);
                    var i = n.centre(t.vertices);
                    n.translate(t.vertices, i, -1), r.setInertia(t, r._inertiaScale * n.inertia(t.vertices, t.mass)), n.translate(t.vertices, t.position), h.update(t.bounds, t.vertices, t.velocity)
                }, r.setParts = function(t, e, i) {
                    var o;
                    for (e = e.slice(0), t.parts.length = 0, t.parts.push(t), t.parent = t, o = 0; o < e.length; o++) {
                        var s = e[o];
                        s !== t && (s.parent = t, t.parts.push(s))
                    }
                    if (1 !== t.parts.length) {
                        if (i = void 0 === i || i) {
                            var a = [];
                            for (o = 0; o < e.length; o++) a = a.concat(e[o].vertices);
                            n.clockwiseSort(a);
                            var h = n.hull(a),
                                u = n.centre(h);
                            r.setVertices(t, h), n.translate(t.vertices, u)
                        }
                        var l = r._totalProperties(t);
                        t.area = l.area, t.parent = t, t.position.x = l.centre.x, t.position.y = l.centre.y, t.positionPrev.x = l.centre.x, t.positionPrev.y = l.centre.y, r.setMass(t, l.mass), r.setInertia(t, l.inertia), r.setPosition(t, l.centre)
                    }
                }, r.setPosition = function(t, e) {
                    var i = o.sub(e, t.position);
                    t.positionPrev.x += i.x, t.positionPrev.y += i.y;
                    for (var r = 0; r < t.parts.length; r++) {
                        var s = t.parts[r];
                        s.position.x += i.x, s.position.y += i.y, n.translate(s.vertices, i), h.update(s.bounds, s.vertices, t.velocity)
                    }
                }, r.setAngle = function(t, e) {
                    var i = e - t.angle;
                    t.anglePrev += i;
                    for (var r = 0; r < t.parts.length; r++) {
                        var s = t.parts[r];
                        s.angle += i, n.rotate(s.vertices, i, t.position), u.rotate(s.axes, i), h.update(s.bounds, s.vertices, t.velocity), r > 0 && o.rotateAbout(s.position, i, t.position, s.position)
                    }
                }, r.setVelocity = function(t, e) {
                    t.positionPrev.x = t.position.x - e.x, t.positionPrev.y = t.position.y - e.y, t.velocity.x = e.x, t.velocity.y = e.y, t.speed = o.magnitude(t.velocity)
                }, r.setAngularVelocity = function(t, e) {
                    t.anglePrev = t.angle - e, t.angularVelocity = e, t.angularSpeed = Math.abs(t.angularVelocity)
                }, r.translate = function(t, e) {
                    r.setPosition(t, o.add(t.position, e))
                }, r.rotate = function(t, e, i) {
                    if (i) {
                        var n = Math.cos(e),
                            o = Math.sin(e),
                            s = t.position.x - i.x,
                            a = t.position.y - i.y;
                        r.setPosition(t, {
                            x: i.x + (s * n - a * o),
                            y: i.y + (s * o + a * n)
                        }), r.setAngle(t, t.angle + e)
                    } else r.setAngle(t, t.angle + e)
                }, r.scale = function(t, e, i, o) {
                    var s = 0,
                        a = 0;
                    o = o || t.position;
                    for (var l = 0; l < t.parts.length; l++) {
                        var c = t.parts[l];
                        n.scale(c.vertices, e, i, o), c.axes = u.fromVertices(c.vertices), c.area = n.area(c.vertices), r.setMass(c, t.density * c.area), n.translate(c.vertices, {
                            x: -c.position.x,
                            y: -c.position.y
                        }), r.setInertia(c, r._inertiaScale * n.inertia(c.vertices, c.mass)), n.translate(c.vertices, {
                            x: c.position.x,
                            y: c.position.y
                        }), l > 0 && (s += c.area, a += c.inertia), c.position.x = o.x + (c.position.x - o.x) * e, c.position.y = o.y + (c.position.y - o.y) * i, h.update(c.bounds, c.vertices, t.velocity)
                    }
                    t.parts.length > 1 && (t.area = s, t.isStatic || (r.setMass(t, t.density * s), r.setInertia(t, a))), t.circleRadius && (e === i ? t.circleRadius *= e : t.circleRadius = null)
                }, r.update = function(t, e, i, r) {
                    var s = Math.pow(e * i * t.timeScale, 2),
                        a = 1 - t.frictionAir * i * t.timeScale,
                        l = t.position.x - t.positionPrev.x,
                        c = t.position.y - t.positionPrev.y;
                    t.velocity.x = l * a * r + t.force.x / t.mass * s, t.velocity.y = c * a * r + t.force.y / t.mass * s, t.positionPrev.x = t.position.x, t.positionPrev.y = t.position.y, t.position.x += t.velocity.x, t.position.y += t.velocity.y, t.angularVelocity = (t.angle - t.anglePrev) * a * r + t.torque / t.inertia * s, t.anglePrev = t.angle, t.angle += t.angularVelocity, t.speed = o.magnitude(t.velocity), t.angularSpeed = Math.abs(t.angularVelocity);
                    for (var d = 0; d < t.parts.length; d++) {
                        var p = t.parts[d];
                        n.translate(p.vertices, t.velocity), d > 0 && (p.position.x += t.velocity.x, p.position.y += t.velocity.y), 0 !== t.angularVelocity && (n.rotate(p.vertices, t.angularVelocity, t.position), u.rotate(p.axes, t.angularVelocity), d > 0 && o.rotateAbout(p.position, t.angularVelocity, t.position, p.position)), h.update(p.bounds, p.vertices, t.velocity)
                    }
                }, r.applyForce = function(t, e, i) {
                    t.force.x += i.x, t.force.y += i.y;
                    var r = e.x - t.position.x,
                        n = e.y - t.position.y;
                    t.torque += r * i.y - n * i.x
                }, r._totalProperties = function(t) {
                    for (var e = {
                            mass: 0,
                            area: 0,
                            inertia: 0,
                            centre: {
                                x: 0,
                                y: 0
                            }
                        }, i = 1 === t.parts.length ? 0 : 1; i < t.parts.length; i++) {
                        var r = t.parts[i],
                            n = r.mass !== 1 / 0 ? r.mass : 1;
                        e.mass += n, e.area += r.area, e.inertia += r.inertia, e.centre = o.add(e.centre, o.mult(r.position, n))
                    }
                    return e.centre = o.div(e.centre, e.mass), e
                }
            }()
        }, {
            "../core/Common": 14,
            "../core/Sleeping": 22,
            "../geometry/Axes": 25,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29,
            "../render/Render": 31
        }],
        2: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../core/Events"),
                o = t("../core/Common"),
                s = t("../geometry/Bounds"),
                a = t("./Body");
            r.create = function(t) {
                return o.extend({
                    id: o.nextId(),
                    type: "composite",
                    parent: null,
                    isModified: !1,
                    bodies: [],
                    constraints: [],
                    composites: [],
                    label: "Composite",
                    plugin: {}
                }, t)
            }, r.setModified = function(t, e, i, n) {
                if (t.isModified = e, i && t.parent && r.setModified(t.parent, e, i, n), n)
                    for (var o = 0; o < t.composites.length; o++) {
                        var s = t.composites[o];
                        r.setModified(s, e, i, n)
                    }
            }, r.add = function(t, e) {
                var i = [].concat(e);
                n.trigger(t, "beforeAdd", {
                    object: e
                });
                for (var s = 0; s < i.length; s++) {
                    var a = i[s];
                    switch (a.type) {
                        case "body":
                            if (a.parent !== a) {
                                o.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");
                                break
                            }
                            r.addBody(t, a);
                            break;
                        case "constraint":
                            r.addConstraint(t, a);
                            break;
                        case "composite":
                            r.addComposite(t, a);
                            break;
                        case "mouseConstraint":
                            r.addConstraint(t, a.constraint)
                    }
                }
                return n.trigger(t, "afterAdd", {
                    object: e
                }), t
            }, r.remove = function(t, e, i) {
                var o = [].concat(e);
                n.trigger(t, "beforeRemove", {
                    object: e
                });
                for (var s = 0; s < o.length; s++) {
                    var a = o[s];
                    switch (a.type) {
                        case "body":
                            r.removeBody(t, a, i);
                            break;
                        case "constraint":
                            r.removeConstraint(t, a, i);
                            break;
                        case "composite":
                            r.removeComposite(t, a, i);
                            break;
                        case "mouseConstraint":
                            r.removeConstraint(t, a.constraint)
                    }
                }
                return n.trigger(t, "afterRemove", {
                    object: e
                }), t
            }, r.addComposite = function(t, e) {
                return t.composites.push(e), e.parent = t, r.setModified(t, !0, !0, !1), t
            }, r.removeComposite = function(t, e, i) {
                var n = o.indexOf(t.composites, e);
                if (-1 !== n && (r.removeCompositeAt(t, n), r.setModified(t, !0, !0, !1)), i)
                    for (var s = 0; s < t.composites.length; s++) r.removeComposite(t.composites[s], e, !0);
                return t
            }, r.removeCompositeAt = function(t, e) {
                return t.composites.splice(e, 1), r.setModified(t, !0, !0, !1), t
            }, r.addBody = function(t, e) {
                return t.bodies.push(e), r.setModified(t, !0, !0, !1), t
            }, r.removeBody = function(t, e, i) {
                var n = o.indexOf(t.bodies, e);
                if (-1 !== n && (r.removeBodyAt(t, n), r.setModified(t, !0, !0, !1)), i)
                    for (var s = 0; s < t.composites.length; s++) r.removeBody(t.composites[s], e, !0);
                return t
            }, r.removeBodyAt = function(t, e) {
                return t.bodies.splice(e, 1), r.setModified(t, !0, !0, !1), t
            }, r.addConstraint = function(t, e) {
                return t.constraints.push(e), r.setModified(t, !0, !0, !1), t
            }, r.removeConstraint = function(t, e, i) {
                var n = o.indexOf(t.constraints, e);
                if (-1 !== n && r.removeConstraintAt(t, n), i)
                    for (var s = 0; s < t.composites.length; s++) r.removeConstraint(t.composites[s], e, !0);
                return t
            }, r.removeConstraintAt = function(t, e) {
                return t.constraints.splice(e, 1), r.setModified(t, !0, !0, !1), t
            }, r.clear = function(t, e, i) {
                if (i)
                    for (var n = 0; n < t.composites.length; n++) r.clear(t.composites[n], e, !0);
                return e ? t.bodies = t.bodies.filter(function(t) {
                    return t.isStatic
                }) : t.bodies.length = 0, t.constraints.length = 0, t.composites.length = 0, r.setModified(t, !0, !0, !1), t
            }, r.allBodies = function(t) {
                for (var e = [].concat(t.bodies), i = 0; i < t.composites.length; i++) e = e.concat(r.allBodies(t.composites[i]));
                return e
            }, r.allConstraints = function(t) {
                for (var e = [].concat(t.constraints), i = 0; i < t.composites.length; i++) e = e.concat(r.allConstraints(t.composites[i]));
                return e
            }, r.allComposites = function(t) {
                for (var e = [].concat(t.composites), i = 0; i < t.composites.length; i++) e = e.concat(r.allComposites(t.composites[i]));
                return e
            }, r.get = function(t, e, i) {
                var n, o;
                switch (i) {
                    case "body":
                        n = r.allBodies(t);
                        break;
                    case "constraint":
                        n = r.allConstraints(t);
                        break;
                    case "composite":
                        n = r.allComposites(t).concat(t)
                }
                return n ? 0 === (o = n.filter(function(t) {
                    return t.id.toString() === e.toString()
                })).length ? null : o[0] : null
            }, r.move = function(t, e, i) {
                return r.remove(t, e), r.add(i, e), t
            }, r.rebase = function(t) {
                for (var e = r.allBodies(t).concat(r.allConstraints(t)).concat(r.allComposites(t)), i = 0; i < e.length; i++) e[i].id = o.nextId();
                return r.setModified(t, !0, !0, !1), t
            }, r.translate = function(t, e, i) {
                for (var n = i ? r.allBodies(t) : t.bodies, o = 0; o < n.length; o++) a.translate(n[o], e);
                return r.setModified(t, !0, !0, !1), t
            }, r.rotate = function(t, e, i, n) {
                for (var o = Math.cos(e), s = Math.sin(e), h = n ? r.allBodies(t) : t.bodies, u = 0; u < h.length; u++) {
                    var l = h[u],
                        c = l.position.x - i.x,
                        d = l.position.y - i.y;
                    a.setPosition(l, {
                        x: i.x + (c * o - d * s),
                        y: i.y + (c * s + d * o)
                    }), a.rotate(l, e)
                }
                return r.setModified(t, !0, !0, !1), t
            }, r.scale = function(t, e, i, n, o) {
                for (var s = o ? r.allBodies(t) : t.bodies, h = 0; h < s.length; h++) {
                    var u = s[h],
                        l = u.position.x - n.x,
                        c = u.position.y - n.y;
                    a.setPosition(u, {
                        x: n.x + l * e,
                        y: n.y + c * i
                    }), a.scale(u, e, i)
                }
                return r.setModified(t, !0, !0, !1), t
            }, r.bounds = function(t) {
                for (var e = r.allBodies(t), i = [], n = 0; n < e.length; n += 1) {
                    var o = e[n];
                    i.push(o.bounds.min, o.bounds.max)
                }
                return s.create(i)
            }
        }, {
            "../core/Common": 14,
            "../core/Events": 16,
            "../geometry/Bounds": 26,
            "./Body": 1
        }],
        3: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("./Composite"),
                o = (t("../constraint/Constraint"), t("../core/Common"));
            r.create = function(t) {
                var e = n.create();
                return o.extend(e, {
                    label: "World",
                    gravity: {
                        x: 0,
                        y: 1,
                        scale: .001
                    },
                    bounds: {
                        min: {
                            x: -1 / 0,
                            y: -1 / 0
                        },
                        max: {
                            x: 1 / 0,
                            y: 1 / 0
                        }
                    }
                }, t)
            }
        }, {
            "../constraint/Constraint": 12,
            "../core/Common": 14,
            "./Composite": 2
        }],
        4: [function(t, e, i) {
            var r = {};
            e.exports = r, r.create = function(t) {
                return {
                    id: r.id(t),
                    vertex: t,
                    normalImpulse: 0,
                    tangentImpulse: 0
                }
            }, r.id = function(t) {
                return t.body.id + "_" + t.index
            }
        }, {}],
        5: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("./SAT"),
                o = t("./Pair"),
                s = t("../geometry/Bounds");
            r.collisions = function(t, e) {
                for (var i = [], a = e.pairs.table, h = 0; h < t.length; h++) {
                    var u = t[h][0],
                        l = t[h][1];
                    if ((!u.isStatic && !u.isSleeping || !l.isStatic && !l.isSleeping) && r.canCollide(u.collisionFilter, l.collisionFilter) && s.overlaps(u.bounds, l.bounds))
                        for (var c = u.parts.length > 1 ? 1 : 0; c < u.parts.length; c++)
                            for (var d = u.parts[c], p = l.parts.length > 1 ? 1 : 0; p < l.parts.length; p++) {
                                var f = l.parts[p];
                                if (d === u && f === l || s.overlaps(d.bounds, f.bounds)) {
                                    var m, g = a[o.id(d, f)];
                                    m = g && g.isActive ? g.collision : null;
                                    var v = n.collides(d, f, m);
                                    v.collided && i.push(v)
                                }
                            }
                }
                return i
            }, r.canCollide = function(t, e) {
                return t.group === e.group && 0 !== t.group ? t.group > 0 : 0 != (t.mask & e.category) && 0 != (e.mask & t.category)
            }
        }, {
            "../geometry/Bounds": 26,
            "./Pair": 7,
            "./SAT": 11
        }],
        6: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("./Pair"),
                o = t("./Detector"),
                s = t("../core/Common");
            r.create = function(t) {
                var e = {
                    controller: r,
                    detector: o.collisions,
                    buckets: {},
                    pairs: {},
                    pairsList: [],
                    bucketWidth: 48,
                    bucketHeight: 48
                };
                return s.extend(e, t)
            }, r.update = function(t, e, i, n) {
                var o, s, a, h, u, l = i.world,
                    c = t.buckets,
                    d = !1;
                for (o = 0; o < e.length; o++) {
                    var p = e[o];
                    if ((!p.isSleeping || n) && !(p.bounds.max.x < l.bounds.min.x || p.bounds.min.x > l.bounds.max.x || p.bounds.max.y < l.bounds.min.y || p.bounds.min.y > l.bounds.max.y)) {
                        var f = r._getRegion(t, p);
                        if (!p.region || f.id !== p.region.id || n) {
                            p.region && !n || (p.region = f);
                            var m = r._regionUnion(f, p.region);
                            for (s = m.startCol; s <= m.endCol; s++)
                                for (a = m.startRow; a <= m.endRow; a++) {
                                    h = c[u = r._getBucketId(s, a)];
                                    var g = s >= f.startCol && s <= f.endCol && a >= f.startRow && a <= f.endRow,
                                        v = s >= p.region.startCol && s <= p.region.endCol && a >= p.region.startRow && a <= p.region.endRow;
                                    !g && v && v && h && r._bucketRemoveBody(t, h, p), (p.region === f || g && !v || n) && (h || (h = r._createBucket(c, u)), r._bucketAddBody(t, h, p))
                                }
                            p.region = f, d = !0
                        }
                    }
                }
                d && (t.pairsList = r._createActivePairsList(t))
            }, r.clear = function(t) {
                t.buckets = {}, t.pairs = {}, t.pairsList = []
            }, r._regionUnion = function(t, e) {
                var i = Math.min(t.startCol, e.startCol),
                    n = Math.max(t.endCol, e.endCol),
                    o = Math.min(t.startRow, e.startRow),
                    s = Math.max(t.endRow, e.endRow);
                return r._createRegion(i, n, o, s)
            }, r._getRegion = function(t, e) {
                var i = e.bounds,
                    n = Math.floor(i.min.x / t.bucketWidth),
                    o = Math.floor(i.max.x / t.bucketWidth),
                    s = Math.floor(i.min.y / t.bucketHeight),
                    a = Math.floor(i.max.y / t.bucketHeight);
                return r._createRegion(n, o, s, a)
            }, r._createRegion = function(t, e, i, r) {
                return {
                    id: t + "," + e + "," + i + "," + r,
                    startCol: t,
                    endCol: e,
                    startRow: i,
                    endRow: r
                }
            }, r._getBucketId = function(t, e) {
                return "C" + t + "R" + e
            }, r._createBucket = function(t, e) {
                return t[e] = []
            }, r._bucketAddBody = function(t, e, i) {
                for (var r = 0; r < e.length; r++) {
                    var o = e[r];
                    if (!(i.id === o.id || i.isStatic && o.isStatic)) {
                        var s = n.id(i, o),
                            a = t.pairs[s];
                        a ? a[2] += 1 : t.pairs[s] = [i, o, 1]
                    }
                }
                e.push(i)
            }, r._bucketRemoveBody = function(t, e, i) {
                e.splice(s.indexOf(e, i), 1);
                for (var r = 0; r < e.length; r++) {
                    var o = e[r],
                        a = n.id(i, o),
                        h = t.pairs[a];
                    h && (h[2] -= 1)
                }
            }, r._createActivePairsList = function(t) {
                var e, i, r = [];
                e = s.keys(t.pairs);
                for (var n = 0; n < e.length; n++)(i = t.pairs[e[n]])[2] > 0 ? r.push(i) : delete t.pairs[e[n]];
                return r
            }
        }, {
            "../core/Common": 14,
            "./Detector": 5,
            "./Pair": 7
        }],
        7: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("./Contact");
            r.create = function(t, e) {
                var i = t.bodyA,
                    n = t.bodyB,
                    o = t.parentA,
                    s = t.parentB,
                    a = {
                        id: r.id(i, n),
                        bodyA: i,
                        bodyB: n,
                        contacts: {},
                        activeContacts: [],
                        separation: 0,
                        isActive: !0,
                        isSensor: i.isSensor || n.isSensor,
                        timeCreated: e,
                        timeUpdated: e,
                        inverseMass: o.inverseMass + s.inverseMass,
                        friction: Math.min(o.friction, s.friction),
                        frictionStatic: Math.max(o.frictionStatic, s.frictionStatic),
                        restitution: Math.max(o.restitution, s.restitution),
                        slop: Math.max(o.slop, s.slop)
                    };
                return r.update(a, t, e), a
            }, r.update = function(t, e, i) {
                var o = t.contacts,
                    s = e.supports,
                    a = t.activeContacts,
                    h = e.parentA,
                    u = e.parentB;
                if (t.collision = e, t.inverseMass = h.inverseMass + u.inverseMass, t.friction = Math.min(h.friction, u.friction), t.frictionStatic = Math.max(h.frictionStatic, u.frictionStatic), t.restitution = Math.max(h.restitution, u.restitution), t.slop = Math.max(h.slop, u.slop), a.length = 0, e.collided) {
                    for (var l = 0; l < s.length; l++) {
                        var c = s[l],
                            d = n.id(c),
                            p = o[d];
                        p ? a.push(p) : a.push(o[d] = n.create(c))
                    }
                    t.separation = e.depth, r.setActive(t, !0, i)
                } else !0 === t.isActive && r.setActive(t, !1, i)
            }, r.setActive = function(t, e, i) {
                e ? (t.isActive = !0, t.timeUpdated = i) : (t.isActive = !1, t.activeContacts.length = 0)
            }, r.id = function(t, e) {
                return t.id < e.id ? "A" + t.id + "B" + e.id : "A" + e.id + "B" + t.id
            }
        }, {
            "./Contact": 4
        }],
        8: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("./Pair"),
                o = t("../core/Common");
            r._pairMaxIdleLife = 1e3, r.create = function(t) {
                return o.extend({
                    table: {},
                    list: [],
                    collisionStart: [],
                    collisionActive: [],
                    collisionEnd: []
                }, t)
            }, r.update = function(t, e, i) {
                var r, s, a, h, u = t.list,
                    l = t.table,
                    c = t.collisionStart,
                    d = t.collisionEnd,
                    p = t.collisionActive,
                    f = [];
                for (c.length = 0, d.length = 0, p.length = 0, h = 0; h < e.length; h++)(r = e[h]).collided && (s = n.id(r.bodyA, r.bodyB), f.push(s), (a = l[s]) ? (a.isActive ? p.push(a) : c.push(a), n.update(a, r, i)) : (a = n.create(r, i), l[s] = a, c.push(a), u.push(a)));
                for (h = 0; h < u.length; h++)(a = u[h]).isActive && -1 === o.indexOf(f, a.id) && (n.setActive(a, !1, i), d.push(a))
            }, r.removeOld = function(t, e) {
                var i, n, o, s, a = t.list,
                    h = t.table,
                    u = [];
                for (s = 0; s < a.length; s++)(n = (i = a[s]).collision).bodyA.isSleeping || n.bodyB.isSleeping ? i.timeUpdated = e : e - i.timeUpdated > r._pairMaxIdleLife && u.push(s);
                for (s = 0; s < u.length; s++) delete h[(i = a[o = u[s] - s]).id], a.splice(o, 1)
            }, r.clear = function(t) {
                return t.table = {}, t.list.length = 0, t.collisionStart.length = 0, t.collisionActive.length = 0, t.collisionEnd.length = 0, t
            }
        }, {
            "../core/Common": 14,
            "./Pair": 7
        }],
        9: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../geometry/Vector"),
                o = t("./SAT"),
                s = t("../geometry/Bounds"),
                a = t("../factory/Bodies"),
                h = t("../geometry/Vertices");
            r.collides = function(t, e) {
                for (var i = [], r = 0; r < e.length; r++) {
                    var n = e[r];
                    if (s.overlaps(n.bounds, t.bounds))
                        for (var a = 1 === n.parts.length ? 0 : 1; a < n.parts.length; a++) {
                            var h = n.parts[a];
                            if (s.overlaps(h.bounds, t.bounds)) {
                                var u = o.collides(h, t);
                                if (u.collided) {
                                    i.push(u);
                                    break
                                }
                            }
                        }
                }
                return i
            }, r.ray = function(t, e, i, o) {
                o = o || 1e-100;
                for (var s = n.angle(e, i), h = n.magnitude(n.sub(e, i)), u = .5 * (i.x + e.x), l = .5 * (i.y + e.y), c = a.rectangle(u, l, h, o, {
                        angle: s
                    }), d = r.collides(c, t), p = 0; p < d.length; p += 1) {
                    var f = d[p];
                    f.body = f.bodyB = f.bodyA
                }
                return d
            }, r.region = function(t, e, i) {
                for (var r = [], n = 0; n < t.length; n++) {
                    var o = t[n],
                        a = s.overlaps(o.bounds, e);
                    (a && !i || !a && i) && r.push(o)
                }
                return r
            }, r.point = function(t, e) {
                for (var i = [], r = 0; r < t.length; r++) {
                    var n = t[r];
                    if (s.contains(n.bounds, e))
                        for (var o = 1 === n.parts.length ? 0 : 1; o < n.parts.length; o++) {
                            var a = n.parts[o];
                            if (s.contains(a.bounds, e) && h.contains(a.vertices, e)) {
                                i.push(n);
                                break
                            }
                        }
                }
                return i
            }
        }, {
            "../factory/Bodies": 23,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29,
            "./SAT": 11
        }],
        10: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../geometry/Vertices"),
                o = t("../geometry/Vector"),
                s = t("../core/Common"),
                a = t("../geometry/Bounds");
            r._restingThresh = 4, r._restingThreshTangent = 6, r._positionDampen = .9, r._positionWarming = .8, r._frictionNormalMultiplier = 5, r.preSolvePosition = function(t) {
                var e, i, r;
                for (e = 0; e < t.length; e++)(i = t[e]).isActive && (r = i.activeContacts.length, i.collision.parentA.totalContacts += r, i.collision.parentB.totalContacts += r)
            }, r.solvePosition = function(t, e) {
                var i, n, s, a, h, u, l, c, d, p = o._temp[0],
                    f = o._temp[1],
                    m = o._temp[2],
                    g = o._temp[3];
                for (i = 0; i < t.length; i++)(n = t[i]).isActive && !n.isSensor && (a = (s = n.collision).parentA, h = s.parentB, u = s.normal, l = o.sub(o.add(h.positionImpulse, h.position, p), o.add(a.positionImpulse, o.sub(h.position, s.penetration, f), m), g), n.separation = o.dot(u, l));
                for (i = 0; i < t.length; i++)(n = t[i]).isActive && !n.isSensor && (a = (s = n.collision).parentA, h = s.parentB, u = s.normal, d = (n.separation - n.slop) * e, (a.isStatic || h.isStatic) && (d *= 2), a.isStatic || a.isSleeping || (c = r._positionDampen / a.totalContacts, a.positionImpulse.x += u.x * d * c, a.positionImpulse.y += u.y * d * c), h.isStatic || h.isSleeping || (c = r._positionDampen / h.totalContacts, h.positionImpulse.x -= u.x * d * c, h.positionImpulse.y -= u.y * d * c))
            }, r.postSolvePosition = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    if (i.totalContacts = 0, 0 !== i.positionImpulse.x || 0 !== i.positionImpulse.y) {
                        for (var s = 0; s < i.parts.length; s++) {
                            var h = i.parts[s];
                            n.translate(h.vertices, i.positionImpulse), a.update(h.bounds, h.vertices, i.velocity), h.position.x += i.positionImpulse.x, h.position.y += i.positionImpulse.y
                        }
                        i.positionPrev.x += i.positionImpulse.x, i.positionPrev.y += i.positionImpulse.y, o.dot(i.positionImpulse, i.velocity) < 0 ? (i.positionImpulse.x = 0, i.positionImpulse.y = 0) : (i.positionImpulse.x *= r._positionWarming, i.positionImpulse.y *= r._positionWarming)
                    }
                }
            }, r.preSolveVelocity = function(t) {
                var e, i, r, n, s, a, h, u, l, c, d, p, f, m, g = o._temp[0],
                    v = o._temp[1];
                for (e = 0; e < t.length; e++)
                    if ((r = t[e]).isActive && !r.isSensor)
                        for (n = r.activeContacts, a = (s = r.collision).parentA, h = s.parentB, u = s.normal, l = s.tangent, i = 0; i < n.length; i++) d = (c = n[i]).vertex, p = c.normalImpulse, f = c.tangentImpulse, 0 === p && 0 === f || (g.x = u.x * p + l.x * f, g.y = u.y * p + l.y * f, a.isStatic || a.isSleeping || (m = o.sub(d, a.position, v), a.positionPrev.x += g.x * a.inverseMass, a.positionPrev.y += g.y * a.inverseMass, a.anglePrev += o.cross(m, g) * a.inverseInertia), h.isStatic || h.isSleeping || (m = o.sub(d, h.position, v), h.positionPrev.x -= g.x * h.inverseMass, h.positionPrev.y -= g.y * h.inverseMass, h.anglePrev -= o.cross(m, g) * h.inverseInertia))
            }, r.solveVelocity = function(t, e) {
                for (var i = e * e, n = o._temp[0], a = o._temp[1], h = o._temp[2], u = o._temp[3], l = o._temp[4], c = o._temp[5], d = 0; d < t.length; d++) {
                    var p = t[d];
                    if (p.isActive && !p.isSensor) {
                        var f = p.collision,
                            m = f.parentA,
                            g = f.parentB,
                            v = f.normal,
                            y = f.tangent,
                            _ = p.activeContacts,
                            b = 1 / _.length;
                        m.velocity.x = m.position.x - m.positionPrev.x, m.velocity.y = m.position.y - m.positionPrev.y, g.velocity.x = g.position.x - g.positionPrev.x, g.velocity.y = g.position.y - g.positionPrev.y, m.angularVelocity = m.angle - m.anglePrev, g.angularVelocity = g.angle - g.anglePrev;
                        for (var x = 0; x < _.length; x++) {
                            var w = _[x],
                                T = w.vertex,
                                S = o.sub(T, m.position, a),
                                E = o.sub(T, g.position, h),
                                P = o.add(m.velocity, o.mult(o.perp(S), m.angularVelocity), u),
                                I = o.add(g.velocity, o.mult(o.perp(E), g.angularVelocity), l),
                                C = o.sub(P, I, c),
                                A = o.dot(v, C),
                                M = o.dot(y, C),
                                O = Math.abs(M),
                                R = s.sign(M),
                                D = (1 + p.restitution) * A,
                                F = s.clamp(p.separation + A, 0, 1) * r._frictionNormalMultiplier,
                                L = M,
                                B = 1 / 0;
                            O > p.friction * p.frictionStatic * F * i && (B = O, L = s.clamp(p.friction * R * i, -B, B));
                            var k = o.cross(S, v),
                                N = o.cross(E, v),
                                U = b / (m.inverseMass + g.inverseMass + m.inverseInertia * k * k + g.inverseInertia * N * N);
                            if (D *= U, L *= U, A < 0 && A * A > r._restingThresh * i) w.normalImpulse = 0;
                            else {
                                var j = w.normalImpulse;
                                w.normalImpulse = Math.min(w.normalImpulse + D, 0), D = w.normalImpulse - j
                            }
                            if (M * M > r._restingThreshTangent * i) w.tangentImpulse = 0;
                            else {
                                var X = w.tangentImpulse;
                                w.tangentImpulse = s.clamp(w.tangentImpulse + L, -B, B), L = w.tangentImpulse - X
                            }
                            n.x = v.x * D + y.x * L, n.y = v.y * D + y.y * L, m.isStatic || m.isSleeping || (m.positionPrev.x += n.x * m.inverseMass, m.positionPrev.y += n.y * m.inverseMass, m.anglePrev += o.cross(S, n) * m.inverseInertia), g.isStatic || g.isSleeping || (g.positionPrev.x -= n.x * g.inverseMass, g.positionPrev.y -= n.y * g.inverseMass, g.anglePrev -= o.cross(E, n) * g.inverseInertia)
                        }
                    }
                }
            }
        }, {
            "../core/Common": 14,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29
        }],
        11: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../geometry/Vertices"),
                o = t("../geometry/Vector");
            r.collides = function(t, e, i) {
                var s, a, h, u, l = !1;
                if (i) {
                    var c = t.parent,
                        d = e.parent,
                        p = c.speed * c.speed + c.angularSpeed * c.angularSpeed + d.speed * d.speed + d.angularSpeed * d.angularSpeed;
                    l = i && i.collided && p < .2, u = i
                } else u = {
                    collided: !1,
                    bodyA: t,
                    bodyB: e
                };
                if (i && l) {
                    var f = u.axisBody,
                        m = f === t ? e : t,
                        g = [f.axes[i.axisNumber]];
                    if (h = r._overlapAxes(f.vertices, m.vertices, g), u.reused = !0, h.overlap <= 0) return u.collided = !1, u
                } else {
                    if ((s = r._overlapAxes(t.vertices, e.vertices, t.axes)).overlap <= 0) return u.collided = !1, u;
                    if ((a = r._overlapAxes(e.vertices, t.vertices, e.axes)).overlap <= 0) return u.collided = !1, u;
                    s.overlap < a.overlap ? (h = s, u.axisBody = t) : (h = a, u.axisBody = e), u.axisNumber = h.axisNumber
                }
                u.bodyA = t.id < e.id ? t : e, u.bodyB = t.id < e.id ? e : t, u.collided = !0, u.depth = h.overlap, u.parentA = u.bodyA.parent, u.parentB = u.bodyB.parent, t = u.bodyA, e = u.bodyB, o.dot(h.axis, o.sub(e.position, t.position)) < 0 ? u.normal = {
                    x: h.axis.x,
                    y: h.axis.y
                } : u.normal = {
                    x: -h.axis.x,
                    y: -h.axis.y
                }, u.tangent = o.perp(u.normal), u.penetration = u.penetration || {}, u.penetration.x = u.normal.x * u.depth, u.penetration.y = u.normal.y * u.depth;
                var v = r._findSupports(t, e, u.normal),
                    y = [];
                if (n.contains(t.vertices, v[0]) && y.push(v[0]), n.contains(t.vertices, v[1]) && y.push(v[1]), y.length < 2) {
                    var _ = r._findSupports(e, t, o.neg(u.normal));
                    n.contains(e.vertices, _[0]) && y.push(_[0]), y.length < 2 && n.contains(e.vertices, _[1]) && y.push(_[1])
                }
                return y.length < 1 && (y = [v[0]]), u.supports = y, u
            }, r._overlapAxes = function(t, e, i) {
                for (var n, s, a = o._temp[0], h = o._temp[1], u = {
                        overlap: Number.MAX_VALUE
                    }, l = 0; l < i.length; l++) {
                    if (s = i[l], r._projectToAxis(a, t, s), r._projectToAxis(h, e, s), (n = Math.min(a.max - h.min, h.max - a.min)) <= 0) return u.overlap = n, u;
                    n < u.overlap && (u.overlap = n, u.axis = s, u.axisNumber = l)
                }
                return u
            }, r._projectToAxis = function(t, e, i) {
                for (var r = o.dot(e[0], i), n = r, s = 1; s < e.length; s += 1) {
                    var a = o.dot(e[s], i);
                    a > n ? n = a : a < r && (r = a)
                }
                t.min = r, t.max = n
            }, r._findSupports = function(t, e, i) {
                for (var r, n, s, a, h = Number.MAX_VALUE, u = o._temp[0], l = e.vertices, c = t.position, d = 0; d < l.length; d++) n = l[d], u.x = n.x - c.x, u.y = n.y - c.y, (r = -o.dot(i, u)) < h && (h = r, s = n);
                return n = l[s.index - 1 >= 0 ? s.index - 1 : l.length - 1], u.x = n.x - c.x, u.y = n.y - c.y, h = -o.dot(i, u), a = n, n = l[(s.index + 1) % l.length], u.x = n.x - c.x, u.y = n.y - c.y, (r = -o.dot(i, u)) < h && (a = n), [s, a]
            }
        }, {
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29
        }],
        12: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../geometry/Vertices"),
                o = t("../geometry/Vector"),
                s = t("../core/Sleeping"),
                a = t("../geometry/Bounds"),
                h = t("../geometry/Axes"),
                u = t("../core/Common");
            r._warming = .4, r._torqueDampen = 1, r._minLength = 1e-6, r.create = function(t) {
                var e = t;
                e.bodyA && !e.pointA && (e.pointA = {
                    x: 0,
                    y: 0
                }), e.bodyB && !e.pointB && (e.pointB = {
                    x: 0,
                    y: 0
                });
                var i = e.bodyA ? o.add(e.bodyA.position, e.pointA) : e.pointA,
                    r = e.bodyB ? o.add(e.bodyB.position, e.pointB) : e.pointB,
                    n = o.magnitude(o.sub(i, r));
                e.length = void 0 !== e.length ? e.length : n, e.id = e.id || u.nextId(), e.label = e.label || "Constraint", e.type = "constraint", e.stiffness = e.stiffness || (e.length > 0 ? 1 : .7), e.damping = e.damping || 0, e.angularStiffness = e.angularStiffness || 0, e.angleA = e.bodyA ? e.bodyA.angle : e.angleA, e.angleB = e.bodyB ? e.bodyB.angle : e.angleB, e.plugin = {};
                var s = {
                    visible: !0,
                    lineWidth: 2,
                    strokeStyle: "#ffffff",
                    type: "line",
                    anchors: !0
                };
                return 0 === e.length && e.stiffness > .1 ? (s.type = "pin", s.anchors = !1) : e.stiffness < .9 && (s.type = "spring"), e.render = u.extend(s, e.render), e
            }, r.preSolveAll = function(t) {
                for (var e = 0; e < t.length; e += 1) {
                    var i = t[e],
                        r = i.constraintImpulse;
                    i.isStatic || 0 === r.x && 0 === r.y && 0 === r.angle || (i.position.x += r.x, i.position.y += r.y, i.angle += r.angle)
                }
            }, r.solveAll = function(t, e) {
                for (var i = 0; i < t.length; i += 1) {
                    var n = t[i],
                        o = !n.bodyA || n.bodyA && n.bodyA.isStatic,
                        s = !n.bodyB || n.bodyB && n.bodyB.isStatic;
                    (o || s) && r.solve(t[i], e)
                }
                for (i = 0; i < t.length; i += 1) o = !(n = t[i]).bodyA || n.bodyA && n.bodyA.isStatic, s = !n.bodyB || n.bodyB && n.bodyB.isStatic, o || s || r.solve(t[i], e)
            }, r.solve = function(t, e) {
                var i = t.bodyA,
                    n = t.bodyB,
                    s = t.pointA,
                    a = t.pointB;
                if (i || n) {
                    i && !i.isStatic && (o.rotate(s, i.angle - t.angleA, s), t.angleA = i.angle), n && !n.isStatic && (o.rotate(a, n.angle - t.angleB, a), t.angleB = n.angle);
                    var h = s,
                        u = a;
                    if (i && (h = o.add(i.position, s)), n && (u = o.add(n.position, a)), h && u) {
                        var l = o.sub(h, u),
                            c = o.magnitude(l);
                        c < r._minLength && (c = r._minLength);
                        var d, p, f, m, g, v = (c - t.length) / c,
                            y = t.stiffness < 1 ? t.stiffness * e : t.stiffness,
                            _ = o.mult(l, v * y),
                            b = (i ? i.inverseMass : 0) + (n ? n.inverseMass : 0),
                            x = b + ((i ? i.inverseInertia : 0) + (n ? n.inverseInertia : 0));
                        if (t.damping) {
                            var w = o.create();
                            f = o.div(l, c), g = o.sub(n && o.sub(n.position, n.positionPrev) || w, i && o.sub(i.position, i.positionPrev) || w), m = o.dot(f, g)
                        }
                        i && !i.isStatic && (p = i.inverseMass / b, i.constraintImpulse.x -= _.x * p, i.constraintImpulse.y -= _.y * p, i.position.x -= _.x * p, i.position.y -= _.y * p, t.damping && (i.positionPrev.x -= t.damping * f.x * m * p, i.positionPrev.y -= t.damping * f.y * m * p), d = o.cross(s, _) / x * r._torqueDampen * i.inverseInertia * (1 - t.angularStiffness), i.constraintImpulse.angle -= d, i.angle -= d), n && !n.isStatic && (p = n.inverseMass / b, n.constraintImpulse.x += _.x * p, n.constraintImpulse.y += _.y * p, n.position.x += _.x * p, n.position.y += _.y * p, t.damping && (n.positionPrev.x += t.damping * f.x * m * p, n.positionPrev.y += t.damping * f.y * m * p), d = o.cross(a, _) / x * r._torqueDampen * n.inverseInertia * (1 - t.angularStiffness), n.constraintImpulse.angle += d, n.angle += d)
                    }
                }
            }, r.postSolveAll = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e],
                        u = i.constraintImpulse;
                    if (!(i.isStatic || 0 === u.x && 0 === u.y && 0 === u.angle)) {
                        s.set(i, !1);
                        for (var l = 0; l < i.parts.length; l++) {
                            var c = i.parts[l];
                            n.translate(c.vertices, u), l > 0 && (c.position.x += u.x, c.position.y += u.y), 0 !== u.angle && (n.rotate(c.vertices, u.angle, i.position), h.rotate(c.axes, u.angle), l > 0 && o.rotateAbout(c.position, u.angle, i.position, c.position)), a.update(c.bounds, c.vertices, i.velocity)
                        }
                        u.angle *= r._warming, u.x *= r._warming, u.y *= r._warming
                    }
                }
            }
        }, {
            "../core/Common": 14,
            "../core/Sleeping": 22,
            "../geometry/Axes": 25,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29
        }],
        13: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../geometry/Vertices"),
                o = t("../core/Sleeping"),
                s = t("../core/Mouse"),
                a = t("../core/Events"),
                h = t("../collision/Detector"),
                u = t("./Constraint"),
                l = t("../body/Composite"),
                c = t("../core/Common"),
                d = t("../geometry/Bounds");
            r.create = function(t, e) {
                var i = (t ? t.mouse : null) || (e ? e.mouse : null);
                i || (t && t.render && t.render.canvas ? i = s.create(t.render.canvas) : e && e.element ? i = s.create(e.element) : (i = s.create(), c.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));
                var n = {
                        type: "mouseConstraint",
                        mouse: i,
                        element: null,
                        body: null,
                        constraint: u.create({
                            label: "Mouse Constraint",
                            pointA: i.position,
                            pointB: {
                                x: 0,
                                y: 0
                            },
                            length: .01,
                            stiffness: .1,
                            angularStiffness: 1,
                            render: {
                                strokeStyle: "#90EE90",
                                lineWidth: 3
                            }
                        }),
                        collisionFilter: {
                            category: 1,
                            mask: 4294967295,
                            group: 0
                        }
                    },
                    o = c.extend(n, e);
                return a.on(t, "beforeUpdate", function() {
                    var e = l.allBodies(t.world);
                    r.update(o, e), r._triggerEvents(o)
                }), o
            }, r.update = function(t, e) {
                var i = t.mouse,
                    r = t.constraint,
                    s = t.body;
                if (0 === i.button) {
                    if (r.bodyB) o.set(r.bodyB, !1), r.pointA = i.position;
                    else
                        for (var u = 0; u < e.length; u++)
                            if (s = e[u], d.contains(s.bounds, i.position) && h.canCollide(s.collisionFilter, t.collisionFilter))
                                for (var l = s.parts.length > 1 ? 1 : 0; l < s.parts.length; l++) {
                                    var c = s.parts[l];
                                    if (n.contains(c.vertices, i.position)) {
                                        r.pointA = i.position, r.bodyB = t.body = s, r.pointB = {
                                            x: i.position.x - s.position.x,
                                            y: i.position.y - s.position.y
                                        }, r.angleB = s.angle, o.set(s, !1), a.trigger(t, "startdrag", {
                                            mouse: i,
                                            body: s
                                        });
                                        break
                                    }
                                }
                } else r.bodyB = t.body = null, r.pointB = null, s && a.trigger(t, "enddrag", {
                    mouse: i,
                    body: s
                })
            }, r._triggerEvents = function(t) {
                var e = t.mouse,
                    i = e.sourceEvents;
                i.mousemove && a.trigger(t, "mousemove", {
                    mouse: e
                }), i.mousedown && a.trigger(t, "mousedown", {
                    mouse: e
                }), i.mouseup && a.trigger(t, "mouseup", {
                    mouse: e
                }), s.clearSourceEvents(e)
            }
        }, {
            "../body/Composite": 2,
            "../collision/Detector": 5,
            "../core/Common": 14,
            "../core/Events": 16,
            "../core/Mouse": 19,
            "../core/Sleeping": 22,
            "../geometry/Bounds": 26,
            "../geometry/Vertices": 29,
            "./Constraint": 12
        }],
        14: [function(t, e, i) {
            (function(i) {
                var r = {};
                e.exports = r,
                    function() {
                        r._nextId = 0, r._seed = 0, r._nowStartTime = +new Date, r.extend = function(t, e) {
                            var i, n;
                            "boolean" == typeof e ? (i = 2, n = e) : (i = 1, n = !0);
                            for (var o = i; o < arguments.length; o++) {
                                var s = arguments[o];
                                if (s)
                                    for (var a in s) n && s[a] && s[a].constructor === Object ? t[a] && t[a].constructor !== Object ? t[a] = s[a] : (t[a] = t[a] || {}, r.extend(t[a], n, s[a])) : t[a] = s[a]
                            }
                            return t
                        }, r.clone = function(t, e) {
                            return r.extend({}, e, t)
                        }, r.keys = function(t) {
                            if (Object.keys) return Object.keys(t);
                            var e = [];
                            for (var i in t) e.push(i);
                            return e
                        }, r.values = function(t) {
                            var e = [];
                            if (Object.keys) {
                                for (var i = Object.keys(t), r = 0; r < i.length; r++) e.push(t[i[r]]);
                                return e
                            }
                            for (var n in t) e.push(t[n]);
                            return e
                        }, r.get = function(t, e, i, r) {
                            e = e.split(".").slice(i, r);
                            for (var n = 0; n < e.length; n += 1) t = t[e[n]];
                            return t
                        }, r.set = function(t, e, i, n, o) {
                            var s = e.split(".").slice(n, o);
                            return r.get(t, e, 0, -1)[s[s.length - 1]] = i, i
                        }, r.shuffle = function(t) {
                            for (var e = t.length - 1; e > 0; e--) {
                                var i = Math.floor(r.random() * (e + 1)),
                                    n = t[e];
                                t[e] = t[i], t[i] = n
                            }
                            return t
                        }, r.choose = function(t) {
                            return t[Math.floor(r.random() * t.length)]
                        }, r.isElement = function(t) {
                            return "undefined" != typeof HTMLElement ? t instanceof HTMLElement : !!(t && t.nodeType && t.nodeName)
                        }, r.isArray = function(t) {
                            return "[object Array]" === Object.prototype.toString.call(t)
                        }, r.isFunction = function(t) {
                            return "function" == typeof t
                        }, r.isPlainObject = function(t) {
                            return "object" == typeof t && t.constructor === Object
                        }, r.isString = function(t) {
                            return "[object String]" === toString.call(t)
                        }, r.clamp = function(t, e, i) {
                            return t < e ? e : t > i ? i : t
                        }, r.sign = function(t) {
                            return t < 0 ? -1 : 1
                        }, r.now = function() {
                            if (window.performance) {
                                if (window.performance.now) return window.performance.now();
                                if (window.performance.webkitNow) return window.performance.webkitNow()
                            }
                            return new Date - r._nowStartTime
                        }, r.random = function(t, i) {
                            return t = void 0 !== t ? t : 0, i = void 0 !== i ? i : 1, t + e() * (i - t)
                        };
                        var e = function() {
                            return r._seed = (9301 * r._seed + 49297) % 233280, r._seed / 233280
                        };
                        r.colorToNumber = function(t) {
                            return 3 == (t = t.replace("#", "")).length && (t = t.charAt(0) + t.charAt(0) + t.charAt(1) + t.charAt(1) + t.charAt(2) + t.charAt(2)), parseInt(t, 16)
                        }, r.logLevel = 1, r.log = function() {
                            console && r.logLevel > 0 && r.logLevel <= 3 && console.log.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)))
                        }, r.info = function() {
                            console && r.logLevel > 0 && r.logLevel <= 2 && console.info.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)))
                        }, r.warn = function() {
                            console && r.logLevel > 0 && r.logLevel <= 3 && console.warn.apply(console, ["matter-js:"].concat(Array.prototype.slice.call(arguments)))
                        }, r.nextId = function() {
                            return r._nextId++
                        }, r.indexOf = function(t, e) {
                            if (t.indexOf) return t.indexOf(e);
                            for (var i = 0; i < t.length; i++)
                                if (t[i] === e) return i;
                            return -1
                        }, r.map = function(t, e) {
                            if (t.map) return t.map(e);
                            for (var i = [], r = 0; r < t.length; r += 1) i.push(e(t[r]));
                            return i
                        }, r.topologicalSort = function(t) {
                            var e = [],
                                i = [],
                                n = [];
                            for (var o in t) i[o] || n[o] || r._topologicalSort(o, i, n, t, e);
                            return e
                        }, r._topologicalSort = function(t, e, i, n, o) {
                            var s = n[t] || [];
                            i[t] = !0;
                            for (var a = 0; a < s.length; a += 1) {
                                var h = s[a];
                                i[h] || e[h] || r._topologicalSort(h, e, i, n, o)
                            }
                            i[t] = !1, e[t] = !0, o.push(t)
                        }, r.chain = function() {
                            for (var t = [], e = 0; e < arguments.length; e += 1) {
                                var i = arguments[e];
                                i._chained ? t.push.apply(t, i._chained) : t.push(i)
                            }
                            var r = function() {
                                for (var e, i = new Array(arguments.length), r = 0, n = arguments.length; r < n; r++) i[r] = arguments[r];
                                for (r = 0; r < t.length; r += 1) {
                                    var o = t[r].apply(e, i);
                                    void 0 !== o && (e = o)
                                }
                                return e
                            };
                            return r._chained = t, r
                        }, r.chainPathBefore = function(t, e, i) {
                            return r.set(t, e, r.chain(i, r.get(t, e)))
                        }, r.chainPathAfter = function(t, e, i) {
                            return r.set(t, e, r.chain(r.get(t, e), i))
                        }, r._requireGlobal = function(e, r) {
                            return ("undefined" != typeof window ? window[e] : void 0 !== i ? i[e] : null) || t(r)
                        }
                    }()
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        15: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../body/World"),
                o = t("./Sleeping"),
                s = t("../collision/Resolver"),
                a = t("../render/Render"),
                h = t("../collision/Pairs"),
                u = (t("./Metrics"), t("../collision/Grid")),
                l = t("./Events"),
                c = t("../body/Composite"),
                d = t("../constraint/Constraint"),
                p = t("./Common"),
                f = t("../body/Body");
            r.create = function(t, e) {
                e = p.isElement(t) ? e : t, t = p.isElement(t) ? t : null, e = e || {}, (t || e.render) && p.warn("Engine.create: engine.render is deprecated (see docs)");
                var i = {
                        positionIterations: 6,
                        velocityIterations: 4,
                        constraintIterations: 2,
                        enableSleeping: !1,
                        events: [],
                        plugin: {},
                        timing: {
                            timestamp: 0,
                            timeScale: 1
                        },
                        broadphase: {
                            controller: u
                        }
                    },
                    r = p.extend(i, e);
                if (t || r.render) {
                    var o = {
                        element: t,
                        controller: a
                    };
                    r.render = p.extend(o, r.render)
                }
                return r.render && r.render.controller && (r.render = r.render.controller.create(r.render)), r.render && (r.render.engine = r), r.world = e.world || n.create(r.world), r.pairs = h.create(), r.broadphase = r.broadphase.controller.create(r.broadphase), r.metrics = r.metrics || {
                    extended: !1
                }, r
            }, r.update = function(t, e, i) {
                e = e || 1e3 / 60, i = i || 1;
                var n, a = t.world,
                    u = t.timing,
                    p = t.broadphase,
                    f = [];
                u.timestamp += e * u.timeScale;
                var m = {
                    timestamp: u.timestamp
                };
                l.trigger(t, "beforeUpdate", m);
                var g = c.allBodies(a),
                    v = c.allConstraints(a);
                for (t.enableSleeping && o.update(g, u.timeScale), r._bodiesApplyGravity(g, a.gravity), r._bodiesUpdate(g, e, u.timeScale, i, a.bounds), d.preSolveAll(g), n = 0; n < t.constraintIterations; n++) d.solveAll(v, u.timeScale);
                d.postSolveAll(g), p.controller ? (a.isModified && p.controller.clear(p), p.controller.update(p, g, t, a.isModified), f = p.pairsList) : f = g, a.isModified && c.setModified(a, !1, !1, !0);
                var y = p.detector(f, t),
                    _ = t.pairs,
                    b = u.timestamp;
                for (h.update(_, y, b), h.removeOld(_, b), t.enableSleeping && o.afterCollisions(_.list, u.timeScale), _.collisionStart.length > 0 && l.trigger(t, "collisionStart", {
                        pairs: _.collisionStart
                    }), s.preSolvePosition(_.list), n = 0; n < t.positionIterations; n++) s.solvePosition(_.list, u.timeScale);
                for (s.postSolvePosition(g), d.preSolveAll(g), n = 0; n < t.constraintIterations; n++) d.solveAll(v, u.timeScale);
                for (d.postSolveAll(g), s.preSolveVelocity(_.list), n = 0; n < t.velocityIterations; n++) s.solveVelocity(_.list, u.timeScale);
                return _.collisionActive.length > 0 && l.trigger(t, "collisionActive", {
                    pairs: _.collisionActive
                }), _.collisionEnd.length > 0 && l.trigger(t, "collisionEnd", {
                    pairs: _.collisionEnd
                }), r._bodiesClearForces(g), l.trigger(t, "afterUpdate", m), t
            }, r.merge = function(t, e) {
                if (p.extend(t, e), e.world) {
                    t.world = e.world, r.clear(t);
                    for (var i = c.allBodies(t.world), n = 0; n < i.length; n++) {
                        var s = i[n];
                        o.set(s, !1), s.id = p.nextId()
                    }
                }
            }, r.clear = function(t) {
                var e = t.world;
                h.clear(t.pairs);
                var i = t.broadphase;
                if (i.controller) {
                    var r = c.allBodies(e);
                    i.controller.clear(i), i.controller.update(i, r, t, !0)
                }
            }, r._bodiesClearForces = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    i.force.x = 0, i.force.y = 0, i.torque = 0
                }
            }, r._bodiesApplyGravity = function(t, e) {
                var i = void 0 !== e.scale ? e.scale : .001;
                if ((0 !== e.x || 0 !== e.y) && 0 !== i)
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.isStatic || n.isSleeping || (n.force.y += n.mass * e.y * i, n.force.x += n.mass * e.x * i)
                    }
            }, r._bodiesUpdate = function(t, e, i, r, n) {
                for (var o = 0; o < t.length; o++) {
                    var s = t[o];
                    s.isStatic || s.isSleeping || f.update(s, e, i, r)
                }
            }
        }, {
            "../body/Body": 1,
            "../body/Composite": 2,
            "../body/World": 3,
            "../collision/Grid": 6,
            "../collision/Pairs": 8,
            "../collision/Resolver": 10,
            "../constraint/Constraint": 12,
            "../render/Render": 31,
            "./Common": 14,
            "./Events": 16,
            "./Metrics": 18,
            "./Sleeping": 22
        }],
        16: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("./Common");
            r.on = function(t, e, i) {
                for (var r, n = e.split(" "), o = 0; o < n.length; o++) r = n[o], t.events = t.events || {}, t.events[r] = t.events[r] || [], t.events[r].push(i);
                return i
            }, r.off = function(t, e, i) {
                if (e) {
                    "function" == typeof e && (i = e, e = n.keys(t.events).join(" "));
                    for (var r = e.split(" "), o = 0; o < r.length; o++) {
                        var s = t.events[r[o]],
                            a = [];
                        if (i && s)
                            for (var h = 0; h < s.length; h++) s[h] !== i && a.push(s[h]);
                        t.events[r[o]] = a
                    }
                } else t.events = {}
            }, r.trigger = function(t, e, i) {
                var r, o, s, a;
                if (t.events) {
                    i || (i = {}), r = e.split(" ");
                    for (var h = 0; h < r.length; h++)
                        if (o = r[h], s = t.events[o]) {
                            (a = n.clone(i, !1)).name = o, a.source = t;
                            for (var u = 0; u < s.length; u++) s[u].apply(t, [a])
                        }
                }
            }
        }, {
            "./Common": 14
        }],
        17: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("./Plugin"),
                o = t("./Common");
            r.name = "matter-js", r.version = "0.14.2", r.uses = [], r.used = [], r.use = function() {
                n.use(r, Array.prototype.slice.call(arguments))
            }, r.before = function(t, e) {
                return t = t.replace(/^Matter./, ""), o.chainPathBefore(r, t, e)
            }, r.after = function(t, e) {
                return t = t.replace(/^Matter./, ""), o.chainPathAfter(r, t, e)
            }
        }, {
            "./Common": 14,
            "./Plugin": 20
        }],
        18: [function(t, e, i) {}, {
            "../body/Composite": 2,
            "./Common": 14
        }],
        19: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../core/Common");
            r.create = function(t) {
                var e = {};
                return t || n.log("Mouse.create: element was undefined, defaulting to document.body", "warn"), e.element = t || document.body, e.absolute = {
                    x: 0,
                    y: 0
                }, e.position = {
                    x: 0,
                    y: 0
                }, e.mousedownPosition = {
                    x: 0,
                    y: 0
                }, e.mouseupPosition = {
                    x: 0,
                    y: 0
                }, e.offset = {
                    x: 0,
                    y: 0
                }, e.scale = {
                    x: 1,
                    y: 1
                }, e.wheelDelta = 0, e.button = -1, e.pixelRatio = e.element.getAttribute("data-pixel-ratio") || 1, e.sourceEvents = {
                    mousemove: null,
                    mousedown: null,
                    mouseup: null,
                    mousewheel: null
                }, e.mousemove = function(t) {
                    var i = r._getRelativeMousePosition(t, e.element, e.pixelRatio);
                    t.changedTouches && (e.button = 0, t.preventDefault()), e.absolute.x = i.x, e.absolute.y = i.y, e.position.x = e.absolute.x * e.scale.x + e.offset.x, e.position.y = e.absolute.y * e.scale.y + e.offset.y, e.sourceEvents.mousemove = t
                }, e.mousedown = function(t) {
                    var i = r._getRelativeMousePosition(t, e.element, e.pixelRatio);
                    t.changedTouches ? (e.button = 0, t.preventDefault()) : e.button = t.button, e.absolute.x = i.x, e.absolute.y = i.y, e.position.x = e.absolute.x * e.scale.x + e.offset.x, e.position.y = e.absolute.y * e.scale.y + e.offset.y, e.mousedownPosition.x = e.position.x, e.mousedownPosition.y = e.position.y, e.sourceEvents.mousedown = t
                }, e.mouseup = function(t) {
                    var i = r._getRelativeMousePosition(t, e.element, e.pixelRatio);
                    t.changedTouches && t.preventDefault(), e.button = -1, e.absolute.x = i.x, e.absolute.y = i.y, e.position.x = e.absolute.x * e.scale.x + e.offset.x, e.position.y = e.absolute.y * e.scale.y + e.offset.y, e.mouseupPosition.x = e.position.x, e.mouseupPosition.y = e.position.y, e.sourceEvents.mouseup = t
                }, e.mousewheel = function(t) {
                    e.wheelDelta = Math.max(-1, Math.min(1, t.wheelDelta || -t.detail)), t.preventDefault()
                }, r.setElement(e, e.element), e
            }, r.setElement = function(t, e) {
                t.element = e, e.addEventListener("mousemove", t.mousemove), e.addEventListener("mousedown", t.mousedown), e.addEventListener("mouseup", t.mouseup), e.addEventListener("mousewheel", t.mousewheel), e.addEventListener("DOMMouseScroll", t.mousewheel), e.addEventListener("touchmove", t.mousemove), e.addEventListener("touchstart", t.mousedown), e.addEventListener("touchend", t.mouseup)
            }, r.clearSourceEvents = function(t) {
                t.sourceEvents.mousemove = null, t.sourceEvents.mousedown = null, t.sourceEvents.mouseup = null, t.sourceEvents.mousewheel = null, t.wheelDelta = 0
            }, r.setOffset = function(t, e) {
                t.offset.x = e.x, t.offset.y = e.y, t.position.x = t.absolute.x * t.scale.x + t.offset.x, t.position.y = t.absolute.y * t.scale.y + t.offset.y
            }, r.setScale = function(t, e) {
                t.scale.x = e.x, t.scale.y = e.y, t.position.x = t.absolute.x * t.scale.x + t.offset.x, t.position.y = t.absolute.y * t.scale.y + t.offset.y
            }, r._getRelativeMousePosition = function(t, e, i) {
                var r, n, o = e.getBoundingClientRect(),
                    s = document.documentElement || document.body.parentNode || document.body,
                    a = void 0 !== window.pageXOffset ? window.pageXOffset : s.scrollLeft,
                    h = void 0 !== window.pageYOffset ? window.pageYOffset : s.scrollTop,
                    u = t.changedTouches;
                return u ? (r = u[0].pageX - o.left - a, n = u[0].pageY - o.top - h) : (r = t.pageX - o.left - a, n = t.pageY - o.top - h), {
                    x: r / (e.clientWidth / (e.width || e.clientWidth) * i),
                    y: n / (e.clientHeight / (e.height || e.clientHeight) * i)
                }
            }
        }, {
            "../core/Common": 14
        }],
        20: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("./Common");
            r._registry = {}, r.register = function(t) {
                if (r.isPlugin(t) || n.warn("Plugin.register:", r.toString(t), "does not implement all required fields."), t.name in r._registry) {
                    var e = r._registry[t.name],
                        i = r.versionParse(t.version).number,
                        o = r.versionParse(e.version).number;
                    i > o ? (n.warn("Plugin.register:", r.toString(e), "was upgraded to", r.toString(t)), r._registry[t.name] = t) : i < o ? n.warn("Plugin.register:", r.toString(e), "can not be downgraded to", r.toString(t)) : t !== e && n.warn("Plugin.register:", r.toString(t), "is already registered to different plugin object")
                } else r._registry[t.name] = t;
                return t
            }, r.resolve = function(t) {
                return r._registry[r.dependencyParse(t).name]
            }, r.toString = function(t) {
                return "string" == typeof t ? t : (t.name || "anonymous") + "@" + (t.version || t.range || "0.0.0")
            }, r.isPlugin = function(t) {
                return t && t.name && t.version && t.install
            }, r.isUsed = function(t, e) {
                return t.used.indexOf(e) > -1
            }, r.isFor = function(t, e) {
                var i = t.for && r.dependencyParse(t.for);
                return !t.for || e.name === i.name && r.versionSatisfies(e.version, i.range)
            }, r.use = function(t, e) {
                if (t.uses = (t.uses || []).concat(e || []), 0 !== t.uses.length) {
                    for (var i = r.dependencies(t), o = n.topologicalSort(i), s = [], a = 0; a < o.length; a += 1)
                        if (o[a] !== t.name) {
                            var h = r.resolve(o[a]);
                            h ? r.isUsed(t, h.name) || (r.isFor(h, t) || (n.warn("Plugin.use:", r.toString(h), "is for", h.for, "but installed on", r.toString(t) + "."), h._warned = !0), h.install ? h.install(t) : (n.warn("Plugin.use:", r.toString(h), "does not specify an install function."), h._warned = !0), h._warned ? (s.push("🔶 " + r.toString(h)), delete h._warned) : s.push("✅ " + r.toString(h)), t.used.push(h.name)) : s.push("❌ " + o[a])
                        }
                    s.length > 0 && n.info(s.join("  "))
                } else n.warn("Plugin.use:", r.toString(t), "does not specify any dependencies to install.")
            }, r.dependencies = function(t, e) {
                var i = r.dependencyParse(t),
                    o = i.name;
                if (!(o in (e = e || {}))) {
                    t = r.resolve(t) || t, e[o] = n.map(t.uses || [], function(e) {
                        r.isPlugin(e) && r.register(e);
                        var o = r.dependencyParse(e),
                            s = r.resolve(e);
                        return s && !r.versionSatisfies(s.version, o.range) ? (n.warn("Plugin.dependencies:", r.toString(s), "does not satisfy", r.toString(o), "used by", r.toString(i) + "."), s._warned = !0, t._warned = !0) : s || (n.warn("Plugin.dependencies:", r.toString(e), "used by", r.toString(i), "could not be resolved."), t._warned = !0), o.name
                    });
                    for (var s = 0; s < e[o].length; s += 1) r.dependencies(e[o][s], e);
                    return e
                }
            }, r.dependencyParse = function(t) {
                return n.isString(t) ? (/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/.test(t) || n.warn("Plugin.dependencyParse:", t, "is not a valid dependency string."), {
                    name: t.split("@")[0],
                    range: t.split("@")[1] || "*"
                }) : {
                    name: t.name,
                    range: t.range || t.version
                }
            }, r.versionParse = function(t) {
                /^\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?$/.test(t) || n.warn("Plugin.versionParse:", t, "is not a valid version or range.");
                var e = t.split("-");
                t = e[0];
                var i = isNaN(Number(t[0])),
                    r = i ? t.substr(1) : t,
                    o = n.map(r.split("."), function(t) {
                        return Number(t)
                    });
                return {
                    isRange: i,
                    version: r,
                    range: t,
                    operator: i ? t[0] : "",
                    parts: o,
                    prerelease: e[1],
                    number: 1e8 * o[0] + 1e4 * o[1] + o[2]
                }
            }, r.versionSatisfies = function(t, e) {
                e = e || "*";
                var i = r.versionParse(e),
                    n = i.parts,
                    o = r.versionParse(t),
                    s = o.parts;
                if (i.isRange) {
                    if ("*" === i.operator || "*" === t) return !0;
                    if ("~" === i.operator) return s[0] === n[0] && s[1] === n[1] && s[2] >= n[2];
                    if ("^" === i.operator) return n[0] > 0 ? s[0] === n[0] && o.number >= i.number : n[1] > 0 ? s[1] === n[1] && s[2] >= n[2] : s[2] === n[2]
                }
                return t === e || "*" === t
            }
        }, {
            "./Common": 14
        }],
        21: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("./Events"),
                o = t("./Engine"),
                s = t("./Common");
            ! function() {
                var t, e, i;
                ("undefined" != typeof window && (t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame, e = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), t) || (t = function(t) {
                    i = setTimeout(function() {
                        t(s.now())
                    }, 1e3 / 60)
                }, e = function() {
                    clearTimeout(i)
                });
                r.create = function(t) {
                    var e = s.extend({
                        fps: 60,
                        correction: 1,
                        deltaSampleSize: 60,
                        counterTimestamp: 0,
                        frameCounter: 0,
                        deltaHistory: [],
                        timePrev: null,
                        timeScalePrev: 1,
                        frameRequestId: null,
                        isFixed: !1,
                        enabled: !0
                    }, t);
                    return e.delta = e.delta || 1e3 / e.fps, e.deltaMin = e.deltaMin || 1e3 / e.fps, e.deltaMax = e.deltaMax || 1e3 / (.5 * e.fps), e.fps = 1e3 / e.delta, e
                }, r.run = function(e, i) {
                    return void 0 !== e.positionIterations && (i = e, e = r.create()),
                        function n(o) {
                            e.frameRequestId = t(n), o && e.enabled && r.tick(e, i, o)
                        }(), e
                }, r.tick = function(t, e, i) {
                    var r, s = e.timing,
                        a = 1,
                        h = {
                            timestamp: s.timestamp
                        };
                    n.trigger(t, "beforeTick", h), n.trigger(e, "beforeTick", h), t.isFixed ? r = t.delta : (r = i - t.timePrev || t.delta, t.timePrev = i, t.deltaHistory.push(r), t.deltaHistory = t.deltaHistory.slice(-t.deltaSampleSize), a = (r = (r = (r = Math.min.apply(null, t.deltaHistory)) < t.deltaMin ? t.deltaMin : r) > t.deltaMax ? t.deltaMax : r) / t.delta, t.delta = r), 0 !== t.timeScalePrev && (a *= s.timeScale / t.timeScalePrev), 0 === s.timeScale && (a = 0), t.timeScalePrev = s.timeScale, t.correction = a, t.frameCounter += 1, i - t.counterTimestamp >= 1e3 && (t.fps = t.frameCounter * ((i - t.counterTimestamp) / 1e3), t.counterTimestamp = i, t.frameCounter = 0), n.trigger(t, "tick", h), n.trigger(e, "tick", h), e.world.isModified && e.render && e.render.controller && e.render.controller.clear && e.render.controller.clear(e.render), n.trigger(t, "beforeUpdate", h), o.update(e, r, a), n.trigger(t, "afterUpdate", h), e.render && e.render.controller && (n.trigger(t, "beforeRender", h), n.trigger(e, "beforeRender", h), e.render.controller.world(e.render), n.trigger(t, "afterRender", h), n.trigger(e, "afterRender", h)), n.trigger(t, "afterTick", h), n.trigger(e, "afterTick", h)
                }, r.stop = function(t) {
                    e(t.frameRequestId)
                }, r.start = function(t, e) {
                    r.run(t, e)
                }
            }()
        }, {
            "./Common": 14,
            "./Engine": 15,
            "./Events": 16
        }],
        22: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("./Events");
            r._motionWakeThreshold = .18, r._motionSleepThreshold = .08, r._minBias = .9, r.update = function(t, e) {
                for (var i = e * e * e, n = 0; n < t.length; n++) {
                    var o = t[n],
                        s = o.speed * o.speed + o.angularSpeed * o.angularSpeed;
                    if (0 === o.force.x && 0 === o.force.y) {
                        var a = Math.min(o.motion, s),
                            h = Math.max(o.motion, s);
                        o.motion = r._minBias * a + (1 - r._minBias) * h, o.sleepThreshold > 0 && o.motion < r._motionSleepThreshold * i ? (o.sleepCounter += 1, o.sleepCounter >= o.sleepThreshold && r.set(o, !0)) : o.sleepCounter > 0 && (o.sleepCounter -= 1)
                    } else r.set(o, !1)
                }
            }, r.afterCollisions = function(t, e) {
                for (var i = e * e * e, n = 0; n < t.length; n++) {
                    var o = t[n];
                    if (o.isActive) {
                        var s = o.collision,
                            a = s.bodyA.parent,
                            h = s.bodyB.parent;
                        if (!(a.isSleeping && h.isSleeping || a.isStatic || h.isStatic) && (a.isSleeping || h.isSleeping)) {
                            var u = a.isSleeping && !a.isStatic ? a : h,
                                l = u === a ? h : a;
                            !u.isStatic && l.motion > r._motionWakeThreshold * i && r.set(u, !1)
                        }
                    }
                }
            }, r.set = function(t, e) {
                var i = t.isSleeping;
                e ? (t.isSleeping = !0, t.sleepCounter = t.sleepThreshold, t.positionImpulse.x = 0, t.positionImpulse.y = 0, t.positionPrev.x = t.position.x, t.positionPrev.y = t.position.y, t.anglePrev = t.angle, t.speed = 0, t.angularSpeed = 0, t.motion = 0, i || n.trigger(t, "sleepStart")) : (t.isSleeping = !1, t.sleepCounter = 0, i && n.trigger(t, "sleepEnd"))
            }
        }, {
            "./Events": 16
        }],
        23: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n, o = t("../geometry/Vertices"),
                s = t("../core/Common"),
                a = t("../body/Body"),
                h = t("../geometry/Bounds"),
                u = t("../geometry/Vector");
            r.rectangle = function(t, e, i, r, n) {
                n = n || {};
                var h = {
                    label: "Rectangle Body",
                    position: {
                        x: t,
                        y: e
                    },
                    vertices: o.fromPath("L 0 0 L " + i + " 0 L " + i + " " + r + " L 0 " + r)
                };
                if (n.chamfer) {
                    var u = n.chamfer;
                    h.vertices = o.chamfer(h.vertices, u.radius, u.quality, u.qualityMin, u.qualityMax), delete n.chamfer
                }
                return a.create(s.extend({}, h, n))
            }, r.trapezoid = function(t, e, i, r, n, h) {
                h = h || {};
                var u, l = i * (n *= .5),
                    c = l + (1 - 2 * n) * i,
                    d = c + l;
                u = n < .5 ? "L 0 0 L " + l + " " + -r + " L " + c + " " + -r + " L " + d + " 0" : "L 0 0 L " + c + " " + -r + " L " + d + " 0";
                var p = {
                    label: "Trapezoid Body",
                    position: {
                        x: t,
                        y: e
                    },
                    vertices: o.fromPath(u)
                };
                if (h.chamfer) {
                    var f = h.chamfer;
                    p.vertices = o.chamfer(p.vertices, f.radius, f.quality, f.qualityMin, f.qualityMax), delete h.chamfer
                }
                return a.create(s.extend({}, p, h))
            }, r.circle = function(t, e, i, n, o) {
                n = n || {};
                var a = {
                    label: "Circle Body",
                    circleRadius: i
                };
                o = o || 25;
                var h = Math.ceil(Math.max(10, Math.min(o, i)));
                return h % 2 == 1 && (h += 1), r.polygon(t, e, h, i, s.extend({}, a, n))
            }, r.polygon = function(t, e, i, n, h) {
                if (h = h || {}, i < 3) return r.circle(t, e, n, h);
                for (var u = 2 * Math.PI / i, l = "", c = .5 * u, d = 0; d < i; d += 1) {
                    var p = c + d * u,
                        f = Math.cos(p) * n,
                        m = Math.sin(p) * n;
                    l += "L " + f.toFixed(3) + " " + m.toFixed(3) + " "
                }
                var g = {
                    label: "Polygon Body",
                    position: {
                        x: t,
                        y: e
                    },
                    vertices: o.fromPath(l)
                };
                if (h.chamfer) {
                    var v = h.chamfer;
                    g.vertices = o.chamfer(g.vertices, v.radius, v.quality, v.qualityMin, v.qualityMax), delete h.chamfer
                }
                return a.create(s.extend({}, g, h))
            }, r.fromVertices = function(t, e, i, r, l, c, d) {
                var p, f, m, g, v, y, _, b, x;
                for (n || (n = s._requireGlobal("decomp", "poly-decomp")), r = r || {}, f = [], l = void 0 !== l && l, c = void 0 !== c ? c : .01, d = void 0 !== d ? d : 10, n || s.warn("Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull."), s.isArray(i[0]) || (i = [i]), b = 0; b < i.length; b += 1)
                    if (g = i[b], (m = o.isConvex(g)) || !n) g = m ? o.clockwiseSort(g) : o.hull(g), f.push({
                        position: {
                            x: t,
                            y: e
                        },
                        vertices: g
                    });
                    else {
                        var w = g.map(function(t) {
                            return [t.x, t.y]
                        });
                        n.makeCCW(w), !1 !== c && n.removeCollinearPoints(w, c);
                        var T = n.quickDecomp(w);
                        for (v = 0; v < T.length; v++) {
                            var S = T[v].map(function(t) {
                                return {
                                    x: t[0],
                                    y: t[1]
                                }
                            });
                            d > 0 && o.area(S) < d || f.push({
                                position: o.centre(S),
                                vertices: S
                            })
                        }
                    }
                for (v = 0; v < f.length; v++) f[v] = a.create(s.extend(f[v], r));
                if (l)
                    for (v = 0; v < f.length; v++) {
                        var E = f[v];
                        for (y = v + 1; y < f.length; y++) {
                            var P = f[y];
                            if (h.overlaps(E.bounds, P.bounds)) {
                                var I = E.vertices,
                                    C = P.vertices;
                                for (_ = 0; _ < E.vertices.length; _++)
                                    for (x = 0; x < P.vertices.length; x++) {
                                        var A = u.magnitudeSquared(u.sub(I[(_ + 1) % I.length], C[x])),
                                            M = u.magnitudeSquared(u.sub(I[_], C[(x + 1) % C.length]));
                                        A < 5 && M < 5 && (I[_].isInternal = !0, C[x].isInternal = !0)
                                    }
                            }
                        }
                    }
                return f.length > 1 ? (p = a.create(s.extend({
                    parts: f.slice(0)
                }, r)), a.setPosition(p, {
                    x: t,
                    y: e
                }), p) : f[0]
            }
        }, {
            "../body/Body": 1,
            "../core/Common": 14,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29
        }],
        24: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../body/Composite"),
                o = t("../constraint/Constraint"),
                s = t("../core/Common"),
                a = t("../body/Body"),
                h = t("./Bodies");
            r.stack = function(t, e, i, r, o, s, h) {
                for (var u, l = n.create({
                        label: "Stack"
                    }), c = t, d = e, p = 0, f = 0; f < r; f++) {
                    for (var m = 0, g = 0; g < i; g++) {
                        var v = h(c, d, g, f, u, p);
                        if (v) {
                            var y = v.bounds.max.y - v.bounds.min.y,
                                _ = v.bounds.max.x - v.bounds.min.x;
                            y > m && (m = y), a.translate(v, {
                                x: .5 * _,
                                y: .5 * y
                            }), c = v.bounds.max.x + o, n.addBody(l, v), u = v, p += 1
                        } else c += o
                    }
                    d += m + s, c = t
                }
                return l
            }, r.chain = function(t, e, i, r, a, h) {
                for (var u = t.bodies, l = 1; l < u.length; l++) {
                    var c = u[l - 1],
                        d = u[l],
                        p = c.bounds.max.y - c.bounds.min.y,
                        f = c.bounds.max.x - c.bounds.min.x,
                        m = d.bounds.max.y - d.bounds.min.y,
                        g = {
                            bodyA: c,
                            pointA: {
                                x: f * e,
                                y: p * i
                            },
                            bodyB: d,
                            pointB: {
                                x: (d.bounds.max.x - d.bounds.min.x) * r,
                                y: m * a
                            }
                        },
                        v = s.extend(g, h);
                    n.addConstraint(t, o.create(v))
                }
                return t.label += " Chain", t
            }, r.mesh = function(t, e, i, r, a) {
                var h, u, l, c, d, p = t.bodies;
                for (h = 0; h < i; h++) {
                    for (u = 1; u < e; u++) l = p[u - 1 + h * e], c = p[u + h * e], n.addConstraint(t, o.create(s.extend({
                        bodyA: l,
                        bodyB: c
                    }, a)));
                    if (h > 0)
                        for (u = 0; u < e; u++) l = p[u + (h - 1) * e], c = p[u + h * e], n.addConstraint(t, o.create(s.extend({
                            bodyA: l,
                            bodyB: c
                        }, a))), r && u > 0 && (d = p[u - 1 + (h - 1) * e], n.addConstraint(t, o.create(s.extend({
                            bodyA: d,
                            bodyB: c
                        }, a)))), r && u < e - 1 && (d = p[u + 1 + (h - 1) * e], n.addConstraint(t, o.create(s.extend({
                            bodyA: d,
                            bodyB: c
                        }, a))))
                }
                return t.label += " Mesh", t
            }, r.pyramid = function(t, e, i, n, o, s, h) {
                return r.stack(t, e, i, n, o, s, function(e, r, s, u, l, c) {
                    var d = Math.min(n, Math.ceil(i / 2)),
                        p = l ? l.bounds.max.x - l.bounds.min.x : 0;
                    if (!(u > d || s < (u = d - u) || s > i - 1 - u)) return 1 === c && a.translate(l, {
                        x: (s + (i % 2 == 1 ? 1 : -1)) * p,
                        y: 0
                    }), h(t + (l ? s * p : 0) + s * o, r, s, u, l, c)
                })
            }, r.newtonsCradle = function(t, e, i, r, s) {
                for (var a = n.create({
                        label: "Newtons Cradle"
                    }), u = 0; u < i; u++) {
                    var l = h.circle(t + u * (1.9 * r), e + s, r, {
                            inertia: 1 / 0,
                            restitution: 1,
                            friction: 0,
                            frictionAir: 1e-4,
                            slop: 1
                        }),
                        c = o.create({
                            pointA: {
                                x: t + u * (1.9 * r),
                                y: e
                            },
                            bodyB: l
                        });
                    n.addBody(a, l), n.addConstraint(a, c)
                }
                return a
            }, r.car = function(t, e, i, r, s) {
                var u = a.nextGroup(!0),
                    l = .5 * -i + 20,
                    c = .5 * i - 20,
                    d = n.create({
                        label: "Car"
                    }),
                    p = h.rectangle(t, e, i, r, {
                        collisionFilter: {
                            group: u
                        },
                        chamfer: {
                            radius: .5 * r
                        },
                        density: 2e-4
                    }),
                    f = h.circle(t + l, e + 0, s, {
                        collisionFilter: {
                            group: u
                        },
                        friction: .8
                    }),
                    m = h.circle(t + c, e + 0, s, {
                        collisionFilter: {
                            group: u
                        },
                        friction: .8
                    }),
                    g = o.create({
                        bodyB: p,
                        pointB: {
                            x: l,
                            y: 0
                        },
                        bodyA: f,
                        stiffness: 1,
                        length: 0
                    }),
                    v = o.create({
                        bodyB: p,
                        pointB: {
                            x: c,
                            y: 0
                        },
                        bodyA: m,
                        stiffness: 1,
                        length: 0
                    });
                return n.addBody(d, p), n.addBody(d, f), n.addBody(d, m), n.addConstraint(d, g), n.addConstraint(d, v), d
            }, r.softBody = function(t, e, i, n, o, a, u, l, c, d) {
                c = s.extend({
                    inertia: 1 / 0
                }, c), d = s.extend({
                    stiffness: .2,
                    render: {
                        type: "line",
                        anchors: !1
                    }
                }, d);
                var p = r.stack(t, e, i, n, o, a, function(t, e) {
                    return h.circle(t, e, l, c)
                });
                return r.mesh(p, i, n, u, d), p.label = "Soft Body", p
            }
        }, {
            "../body/Body": 1,
            "../body/Composite": 2,
            "../constraint/Constraint": 12,
            "../core/Common": 14,
            "./Bodies": 23
        }],
        25: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../geometry/Vector"),
                o = t("../core/Common");
            r.fromVertices = function(t) {
                for (var e = {}, i = 0; i < t.length; i++) {
                    var r = (i + 1) % t.length,
                        s = n.normalise({
                            x: t[r].y - t[i].y,
                            y: t[i].x - t[r].x
                        }),
                        a = 0 === s.y ? 1 / 0 : s.x / s.y;
                    e[a = a.toFixed(3).toString()] = s
                }
                return o.values(e)
            }, r.rotate = function(t, e) {
                if (0 !== e)
                    for (var i = Math.cos(e), r = Math.sin(e), n = 0; n < t.length; n++) {
                        var o, s = t[n];
                        o = s.x * i - s.y * r, s.y = s.x * r + s.y * i, s.x = o
                    }
            }
        }, {
            "../core/Common": 14,
            "../geometry/Vector": 28
        }],
        26: [function(t, e, i) {
            var r = {};
            e.exports = r, r.create = function(t) {
                var e = {
                    min: {
                        x: 0,
                        y: 0
                    },
                    max: {
                        x: 0,
                        y: 0
                    }
                };
                return t && r.update(e, t), e
            }, r.update = function(t, e, i) {
                t.min.x = 1 / 0, t.max.x = -1 / 0, t.min.y = 1 / 0, t.max.y = -1 / 0;
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.x > t.max.x && (t.max.x = n.x), n.x < t.min.x && (t.min.x = n.x), n.y > t.max.y && (t.max.y = n.y), n.y < t.min.y && (t.min.y = n.y)
                }
                i && (i.x > 0 ? t.max.x += i.x : t.min.x += i.x, i.y > 0 ? t.max.y += i.y : t.min.y += i.y)
            }, r.contains = function(t, e) {
                return e.x >= t.min.x && e.x <= t.max.x && e.y >= t.min.y && e.y <= t.max.y
            }, r.overlaps = function(t, e) {
                return t.min.x <= e.max.x && t.max.x >= e.min.x && t.max.y >= e.min.y && t.min.y <= e.max.y
            }, r.translate = function(t, e) {
                t.min.x += e.x, t.max.x += e.x, t.min.y += e.y, t.max.y += e.y
            }, r.shift = function(t, e) {
                var i = t.max.x - t.min.x,
                    r = t.max.y - t.min.y;
                t.min.x = e.x, t.max.x = e.x + i, t.min.y = e.y, t.max.y = e.y + r
            }
        }, {}],
        27: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = (t("../geometry/Bounds"), t("../core/Common"));
            r.pathToVertices = function(t, e) {
                "undefined" == typeof window || "SVGPathSeg" in window || n.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");
                var i, o, s, a, h, u, l, c, d, p, f, m = [],
                    g = 0,
                    v = 0,
                    y = 0;
                e = e || 15;
                var _ = function(t, e, i) {
                        var r = i % 2 == 1 && i > 1;
                        if (!d || t != d.x || e != d.y) {
                            d && r ? (p = d.x, f = d.y) : (p = 0, f = 0);
                            var n = {
                                x: p + t,
                                y: f + e
                            };
                            !r && d || (d = n), m.push(n), v = p + t, y = f + e
                        }
                    },
                    b = function(t) {
                        var e = t.pathSegTypeAsLetter.toUpperCase();
                        if ("Z" !== e) {
                            switch (e) {
                                case "M":
                                case "L":
                                case "T":
                                case "C":
                                case "S":
                                case "Q":
                                    v = t.x, y = t.y;
                                    break;
                                case "H":
                                    v = t.x;
                                    break;
                                case "V":
                                    y = t.y
                            }
                            _(v, y, t.pathSegType)
                        }
                    };
                for (r._svgPathToAbsolute(t), s = t.getTotalLength(), u = [], i = 0; i < t.pathSegList.numberOfItems; i += 1) u.push(t.pathSegList.getItem(i));
                for (l = u.concat(); g < s;) {
                    if ((h = u[t.getPathSegAtLength(g)]) != c) {
                        for (; l.length && l[0] != h;) b(l.shift());
                        c = h
                    }
                    switch (h.pathSegTypeAsLetter.toUpperCase()) {
                        case "C":
                        case "T":
                        case "S":
                        case "Q":
                        case "A":
                            a = t.getPointAtLength(g), _(a.x, a.y, 0)
                    }
                    g += e
                }
                for (i = 0, o = l.length; i < o; ++i) b(l[i]);
                return m
            }, r._svgPathToAbsolute = function(t) {
                for (var e, i, r, n, o, s, a = t.pathSegList, h = 0, u = 0, l = a.numberOfItems, c = 0; c < l; ++c) {
                    var d = a.getItem(c),
                        p = d.pathSegTypeAsLetter;
                    if (/[MLHVCSQTA]/.test(p)) "x" in d && (h = d.x), "y" in d && (u = d.y);
                    else switch ("x1" in d && (r = h + d.x1), "x2" in d && (o = h + d.x2), "y1" in d && (n = u + d.y1), "y2" in d && (s = u + d.y2), "x" in d && (h += d.x), "y" in d && (u += d.y), p) {
                        case "m":
                            a.replaceItem(t.createSVGPathSegMovetoAbs(h, u), c);
                            break;
                        case "l":
                            a.replaceItem(t.createSVGPathSegLinetoAbs(h, u), c);
                            break;
                        case "h":
                            a.replaceItem(t.createSVGPathSegLinetoHorizontalAbs(h), c);
                            break;
                        case "v":
                            a.replaceItem(t.createSVGPathSegLinetoVerticalAbs(u), c);
                            break;
                        case "c":
                            a.replaceItem(t.createSVGPathSegCurvetoCubicAbs(h, u, r, n, o, s), c);
                            break;
                        case "s":
                            a.replaceItem(t.createSVGPathSegCurvetoCubicSmoothAbs(h, u, o, s), c);
                            break;
                        case "q":
                            a.replaceItem(t.createSVGPathSegCurvetoQuadraticAbs(h, u, r, n), c);
                            break;
                        case "t":
                            a.replaceItem(t.createSVGPathSegCurvetoQuadraticSmoothAbs(h, u), c);
                            break;
                        case "a":
                            a.replaceItem(t.createSVGPathSegArcAbs(h, u, d.r1, d.r2, d.angle, d.largeArcFlag, d.sweepFlag), c);
                            break;
                        case "z":
                        case "Z":
                            h = e, u = i
                    }
                    "M" != p && "m" != p || (e = h, i = u)
                }
            }
        }, {
            "../core/Common": 14,
            "../geometry/Bounds": 26
        }],
        28: [function(t, e, i) {
            var r = {};
            e.exports = r, r.create = function(t, e) {
                return {
                    x: t || 0,
                    y: e || 0
                }
            }, r.clone = function(t) {
                return {
                    x: t.x,
                    y: t.y
                }
            }, r.magnitude = function(t) {
                return Math.sqrt(t.x * t.x + t.y * t.y)
            }, r.magnitudeSquared = function(t) {
                return t.x * t.x + t.y * t.y
            }, r.rotate = function(t, e, i) {
                var r = Math.cos(e),
                    n = Math.sin(e);
                i || (i = {});
                var o = t.x * r - t.y * n;
                return i.y = t.x * n + t.y * r, i.x = o, i
            }, r.rotateAbout = function(t, e, i, r) {
                var n = Math.cos(e),
                    o = Math.sin(e);
                r || (r = {});
                var s = i.x + ((t.x - i.x) * n - (t.y - i.y) * o);
                return r.y = i.y + ((t.x - i.x) * o + (t.y - i.y) * n), r.x = s, r
            }, r.normalise = function(t) {
                var e = r.magnitude(t);
                return 0 === e ? {
                    x: 0,
                    y: 0
                } : {
                    x: t.x / e,
                    y: t.y / e
                }
            }, r.dot = function(t, e) {
                return t.x * e.x + t.y * e.y
            }, r.cross = function(t, e) {
                return t.x * e.y - t.y * e.x
            }, r.cross3 = function(t, e, i) {
                return (e.x - t.x) * (i.y - t.y) - (e.y - t.y) * (i.x - t.x)
            }, r.add = function(t, e, i) {
                return i || (i = {}), i.x = t.x + e.x, i.y = t.y + e.y, i
            }, r.sub = function(t, e, i) {
                return i || (i = {}), i.x = t.x - e.x, i.y = t.y - e.y, i
            }, r.mult = function(t, e) {
                return {
                    x: t.x * e,
                    y: t.y * e
                }
            }, r.div = function(t, e) {
                return {
                    x: t.x / e,
                    y: t.y / e
                }
            }, r.perp = function(t, e) {
                return {
                    x: (e = !0 === e ? -1 : 1) * -t.y,
                    y: e * t.x
                }
            }, r.neg = function(t) {
                return {
                    x: -t.x,
                    y: -t.y
                }
            }, r.angle = function(t, e) {
                return Math.atan2(e.y - t.y, e.x - t.x)
            }, r._temp = [r.create(), r.create(), r.create(), r.create(), r.create(), r.create()]
        }, {}],
        29: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../geometry/Vector"),
                o = t("../core/Common");
            r.create = function(t, e) {
                for (var i = [], r = 0; r < t.length; r++) {
                    var n = t[r],
                        o = {
                            x: n.x,
                            y: n.y,
                            index: r,
                            body: e,
                            isInternal: !1
                        };
                    i.push(o)
                }
                return i
            }, r.fromPath = function(t, e) {
                var i = [];
                return t.replace(/L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/gi, function(t, e, r) {
                    i.push({
                        x: parseFloat(e),
                        y: parseFloat(r)
                    })
                }), r.create(i, e)
            }, r.centre = function(t) {
                for (var e, i, o, s = r.area(t, !0), a = {
                        x: 0,
                        y: 0
                    }, h = 0; h < t.length; h++) o = (h + 1) % t.length, e = n.cross(t[h], t[o]), i = n.mult(n.add(t[h], t[o]), e), a = n.add(a, i);
                return n.div(a, 6 * s)
            }, r.mean = function(t) {
                for (var e = {
                        x: 0,
                        y: 0
                    }, i = 0; i < t.length; i++) e.x += t[i].x, e.y += t[i].y;
                return n.div(e, t.length)
            }, r.area = function(t, e) {
                for (var i = 0, r = t.length - 1, n = 0; n < t.length; n++) i += (t[r].x - t[n].x) * (t[r].y + t[n].y), r = n;
                return e ? i / 2 : Math.abs(i) / 2
            }, r.inertia = function(t, e) {
                for (var i, r, o = 0, s = 0, a = t, h = 0; h < a.length; h++) r = (h + 1) % a.length, o += (i = Math.abs(n.cross(a[r], a[h]))) * (n.dot(a[r], a[r]) + n.dot(a[r], a[h]) + n.dot(a[h], a[h])), s += i;
                return e / 6 * (o / s)
            }, r.translate = function(t, e, i) {
                var r;
                if (i)
                    for (r = 0; r < t.length; r++) t[r].x += e.x * i, t[r].y += e.y * i;
                else
                    for (r = 0; r < t.length; r++) t[r].x += e.x, t[r].y += e.y;
                return t
            }, r.rotate = function(t, e, i) {
                if (0 !== e) {
                    for (var r = Math.cos(e), n = Math.sin(e), o = 0; o < t.length; o++) {
                        var s = t[o],
                            a = s.x - i.x,
                            h = s.y - i.y;
                        s.x = i.x + (a * r - h * n), s.y = i.y + (a * n + h * r)
                    }
                    return t
                }
            }, r.contains = function(t, e) {
                for (var i = 0; i < t.length; i++) {
                    var r = t[i],
                        n = t[(i + 1) % t.length];
                    if ((e.x - r.x) * (n.y - r.y) + (e.y - r.y) * (r.x - n.x) > 0) return !1
                }
                return !0
            }, r.scale = function(t, e, i, o) {
                if (1 === e && 1 === i) return t;
                o = o || r.centre(t);
                for (var s, a, h = 0; h < t.length; h++) s = t[h], a = n.sub(s, o), t[h].x = o.x + a.x * e, t[h].y = o.y + a.y * i;
                return t
            }, r.chamfer = function(t, e, i, r, s) {
                e = "number" == typeof e ? [e] : e || [8], i = void 0 !== i ? i : -1, r = r || 2, s = s || 14;
                for (var a = [], h = 0; h < t.length; h++) {
                    var u = t[h - 1 >= 0 ? h - 1 : t.length - 1],
                        l = t[h],
                        c = t[(h + 1) % t.length],
                        d = e[h < e.length ? h : e.length - 1];
                    if (0 !== d) {
                        var p = n.normalise({
                                x: l.y - u.y,
                                y: u.x - l.x
                            }),
                            f = n.normalise({
                                x: c.y - l.y,
                                y: l.x - c.x
                            }),
                            m = Math.sqrt(2 * Math.pow(d, 2)),
                            g = n.mult(o.clone(p), d),
                            v = n.normalise(n.mult(n.add(p, f), .5)),
                            y = n.sub(l, n.mult(v, m)),
                            _ = i; - 1 === i && (_ = 1.75 * Math.pow(d, .32)), (_ = o.clamp(_, r, s)) % 2 == 1 && (_ += 1);
                        for (var b = Math.acos(n.dot(p, f)) / _, x = 0; x < _; x++) a.push(n.add(n.rotate(g, b * x), y))
                    } else a.push(l)
                }
                return a
            }, r.clockwiseSort = function(t) {
                var e = r.mean(t);
                return t.sort(function(t, i) {
                    return n.angle(e, t) - n.angle(e, i)
                }), t
            }, r.isConvex = function(t) {
                var e, i, r, n, o = 0,
                    s = t.length;
                if (s < 3) return null;
                for (e = 0; e < s; e++)
                    if (r = (e + 2) % s, n = (t[i = (e + 1) % s].x - t[e].x) * (t[r].y - t[i].y), (n -= (t[i].y - t[e].y) * (t[r].x - t[i].x)) < 0 ? o |= 1 : n > 0 && (o |= 2), 3 === o) return !1;
                return 0 !== o || null
            }, r.hull = function(t) {
                var e, i, r = [],
                    o = [];
                for ((t = t.slice(0)).sort(function(t, e) {
                        var i = t.x - e.x;
                        return 0 !== i ? i : t.y - e.y
                    }), i = 0; i < t.length; i += 1) {
                    for (e = t[i]; o.length >= 2 && n.cross3(o[o.length - 2], o[o.length - 1], e) <= 0;) o.pop();
                    o.push(e)
                }
                for (i = t.length - 1; i >= 0; i -= 1) {
                    for (e = t[i]; r.length >= 2 && n.cross3(r[r.length - 2], r[r.length - 1], e) <= 0;) r.pop();
                    r.push(e)
                }
                return r.pop(), o.pop(), r.concat(o)
            }
        }, {
            "../core/Common": 14,
            "../geometry/Vector": 28
        }],
        30: [function(t, e, i) {
            var r = e.exports = t("../core/Matter");
            r.Body = t("../body/Body"), r.Composite = t("../body/Composite"), r.World = t("../body/World"), r.Contact = t("../collision/Contact"), r.Detector = t("../collision/Detector"), r.Grid = t("../collision/Grid"), r.Pairs = t("../collision/Pairs"), r.Pair = t("../collision/Pair"), r.Query = t("../collision/Query"), r.Resolver = t("../collision/Resolver"), r.SAT = t("../collision/SAT"), r.Constraint = t("../constraint/Constraint"), r.MouseConstraint = t("../constraint/MouseConstraint"), r.Common = t("../core/Common"), r.Engine = t("../core/Engine"), r.Events = t("../core/Events"), r.Mouse = t("../core/Mouse"), r.Runner = t("../core/Runner"), r.Sleeping = t("../core/Sleeping"), r.Plugin = t("../core/Plugin"), r.Bodies = t("../factory/Bodies"), r.Composites = t("../factory/Composites"), r.Axes = t("../geometry/Axes"), r.Bounds = t("../geometry/Bounds"), r.Svg = t("../geometry/Svg"), r.Vector = t("../geometry/Vector"), r.Vertices = t("../geometry/Vertices"), r.Render = t("../render/Render"), r.RenderPixi = t("../render/RenderPixi"), r.World.add = r.Composite.add, r.World.remove = r.Composite.remove, r.World.addComposite = r.Composite.addComposite, r.World.addBody = r.Composite.addBody, r.World.addConstraint = r.Composite.addConstraint, r.World.clear = r.Composite.clear, r.Engine.run = r.Runner.run
        }, {
            "../body/Body": 1,
            "../body/Composite": 2,
            "../body/World": 3,
            "../collision/Contact": 4,
            "../collision/Detector": 5,
            "../collision/Grid": 6,
            "../collision/Pair": 7,
            "../collision/Pairs": 8,
            "../collision/Query": 9,
            "../collision/Resolver": 10,
            "../collision/SAT": 11,
            "../constraint/Constraint": 12,
            "../constraint/MouseConstraint": 13,
            "../core/Common": 14,
            "../core/Engine": 15,
            "../core/Events": 16,
            "../core/Matter": 17,
            "../core/Metrics": 18,
            "../core/Mouse": 19,
            "../core/Plugin": 20,
            "../core/Runner": 21,
            "../core/Sleeping": 22,
            "../factory/Bodies": 23,
            "../factory/Composites": 24,
            "../geometry/Axes": 25,
            "../geometry/Bounds": 26,
            "../geometry/Svg": 27,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29,
            "../render/Render": 31,
            "../render/RenderPixi": 32
        }],
        31: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../core/Common"),
                o = t("../body/Composite"),
                s = t("../geometry/Bounds"),
                a = t("../core/Events"),
                h = t("../collision/Grid"),
                u = t("../geometry/Vector"),
                l = t("../core/Mouse");
            ! function() {
                var t, e;
                "undefined" != typeof window && (t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                    window.setTimeout(function() {
                        t(n.now())
                    }, 1e3 / 60)
                }, e = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), r.create = function(t) {
                    var e = {
                            controller: r,
                            engine: null,
                            element: null,
                            canvas: null,
                            mouse: null,
                            frameRequestId: null,
                            options: {
                                width: 800,
                                height: 600,
                                pixelRatio: 1,
                                background: "#18181d",
                                wireframeBackground: "#0f0f13",
                                hasBounds: !!t.bounds,
                                enabled: !0,
                                wireframes: !0,
                                showSleeping: !0,
                                showDebug: !1,
                                showBroadphase: !1,
                                showBounds: !1,
                                showVelocity: !1,
                                showCollisions: !1,
                                showSeparations: !1,
                                showAxes: !1,
                                showPositions: !1,
                                showAngleIndicator: !1,
                                showIds: !1,
                                showShadows: !1,
                                showVertexNumbers: !1,
                                showConvexHulls: !1,
                                showInternalEdges: !1,
                                showMousePosition: !1
                            }
                        },
                        o = n.extend(e, t);
                    return o.canvas && (o.canvas.width = o.options.width || o.canvas.width, o.canvas.height = o.options.height || o.canvas.height), o.mouse = t.mouse, o.engine = t.engine, o.canvas = o.canvas || i(o.options.width, o.options.height), o.context = o.canvas.getContext("2d"), o.textures = {}, o.bounds = o.bounds || {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: o.canvas.width,
                            y: o.canvas.height
                        }
                    }, 1 !== o.options.pixelRatio && r.setPixelRatio(o, o.options.pixelRatio), n.isElement(o.element) ? o.element.appendChild(o.canvas) : o.canvas.parentNode || n.log("Render.create: options.element was undefined, render.canvas was created but not appended", "warn"), o
                }, r.run = function(e) {
                    ! function i(n) {
                        e.frameRequestId = t(i), r.world(e)
                    }()
                }, r.stop = function(t) {
                    e(t.frameRequestId)
                }, r.setPixelRatio = function(t, e) {
                    var i = t.options,
                        r = t.canvas;
                    "auto" === e && (e = c(r)), i.pixelRatio = e, r.setAttribute("data-pixel-ratio", e), r.width = i.width * e, r.height = i.height * e, r.style.width = i.width + "px", r.style.height = i.height + "px", t.context.scale(e, e)
                }, r.lookAt = function(t, e, i, r) {
                    r = void 0 === r || r, e = n.isArray(e) ? e : [e], i = i || {
                        x: 0,
                        y: 0
                    };
                    for (var o = {
                            min: {
                                x: 1 / 0,
                                y: 1 / 0
                            },
                            max: {
                                x: -1 / 0,
                                y: -1 / 0
                            }
                        }, s = 0; s < e.length; s += 1) {
                        var a = e[s],
                            h = a.bounds ? a.bounds.min : a.min || a.position || a,
                            u = a.bounds ? a.bounds.max : a.max || a.position || a;
                        h && u && (h.x < o.min.x && (o.min.x = h.x), u.x > o.max.x && (o.max.x = u.x), h.y < o.min.y && (o.min.y = h.y), u.y > o.max.y && (o.max.y = u.y))
                    }
                    var c = o.max.x - o.min.x + 2 * i.x,
                        d = o.max.y - o.min.y + 2 * i.y,
                        p = t.canvas.height,
                        f = t.canvas.width / p,
                        m = c / d,
                        g = 1,
                        v = 1;
                    m > f ? v = m / f : g = f / m, t.options.hasBounds = !0, t.bounds.min.x = o.min.x, t.bounds.max.x = o.min.x + c * g, t.bounds.min.y = o.min.y, t.bounds.max.y = o.min.y + d * v, r && (t.bounds.min.x += .5 * c - c * g * .5, t.bounds.max.x += .5 * c - c * g * .5, t.bounds.min.y += .5 * d - d * v * .5, t.bounds.max.y += .5 * d - d * v * .5), t.bounds.min.x -= i.x, t.bounds.max.x -= i.x, t.bounds.min.y -= i.y, t.bounds.max.y -= i.y, t.mouse && (l.setScale(t.mouse, {
                        x: (t.bounds.max.x - t.bounds.min.x) / t.canvas.width,
                        y: (t.bounds.max.y - t.bounds.min.y) / t.canvas.height
                    }), l.setOffset(t.mouse, t.bounds.min))
                }, r.startViewTransform = function(t) {
                    var e = t.bounds.max.x - t.bounds.min.x,
                        i = t.bounds.max.y - t.bounds.min.y,
                        r = e / t.options.width,
                        n = i / t.options.height;
                    t.context.scale(1 / r, 1 / n), t.context.translate(-t.bounds.min.x, -t.bounds.min.y)
                }, r.endViewTransform = function(t) {
                    t.context.setTransform(t.options.pixelRatio, 0, 0, t.options.pixelRatio, 0, 0)
                }, r.world = function(t) {
                    var e, i = t.engine,
                        n = i.world,
                        c = t.canvas,
                        d = t.context,
                        f = t.options,
                        m = o.allBodies(n),
                        g = o.allConstraints(n),
                        v = f.wireframes ? f.wireframeBackground : f.background,
                        y = [],
                        _ = [],
                        b = {
                            timestamp: i.timing.timestamp
                        };
                    if (a.trigger(t, "beforeRender", b), t.currentBackground !== v && p(t, v), d.globalCompositeOperation = "source-in", d.fillStyle = "transparent", d.fillRect(0, 0, c.width, c.height), d.globalCompositeOperation = "source-over", f.hasBounds) {
                        for (e = 0; e < m.length; e++) {
                            var x = m[e];
                            s.overlaps(x.bounds, t.bounds) && y.push(x)
                        }
                        for (e = 0; e < g.length; e++) {
                            var w = g[e],
                                T = w.bodyA,
                                S = w.bodyB,
                                E = w.pointA,
                                P = w.pointB;
                            T && (E = u.add(T.position, w.pointA)), S && (P = u.add(S.position, w.pointB)), E && P && (s.contains(t.bounds, E) || s.contains(t.bounds, P)) && _.push(w)
                        }
                        r.startViewTransform(t), t.mouse && (l.setScale(t.mouse, {
                            x: (t.bounds.max.x - t.bounds.min.x) / t.canvas.width,
                            y: (t.bounds.max.y - t.bounds.min.y) / t.canvas.height
                        }), l.setOffset(t.mouse, t.bounds.min))
                    } else _ = g, y = m;
                    !f.wireframes || i.enableSleeping && f.showSleeping ? r.bodies(t, y, d) : (f.showConvexHulls && r.bodyConvexHulls(t, y, d), r.bodyWireframes(t, y, d)), f.showBounds && r.bodyBounds(t, y, d), (f.showAxes || f.showAngleIndicator) && r.bodyAxes(t, y, d), f.showPositions && r.bodyPositions(t, y, d), f.showVelocity && r.bodyVelocity(t, y, d), f.showIds && r.bodyIds(t, y, d), f.showSeparations && r.separations(t, i.pairs.list, d), f.showCollisions && r.collisions(t, i.pairs.list, d), f.showVertexNumbers && r.vertexNumbers(t, y, d), f.showMousePosition && r.mousePosition(t, t.mouse, d), r.constraints(_, d), f.showBroadphase && i.broadphase.controller === h && r.grid(t, i.broadphase, d), f.showDebug && r.debug(t, d), f.hasBounds && r.endViewTransform(t), a.trigger(t, "afterRender", b)
                }, r.debug = function(t, e) {
                    var i = e,
                        r = t.engine,
                        n = r.world,
                        s = r.metrics,
                        a = t.options;
                    if (o.allBodies(n), r.timing.timestamp - (t.debugTimestamp || 0) >= 500) {
                        var h = "";
                        s.timing && (h += "fps: " + Math.round(s.timing.fps) + "    "), t.debugString = h, t.debugTimestamp = r.timing.timestamp
                    }
                    if (t.debugString) {
                        i.font = "12px Arial", a.wireframes ? i.fillStyle = "rgba(255,255,255,0.5)" : i.fillStyle = "rgba(0,0,0,0.5)";
                        for (var u = t.debugString.split("\n"), l = 0; l < u.length; l++) i.fillText(u[l], 50, 50 + 18 * l)
                    }
                }, r.constraints = function(t, e) {
                    for (var i = e, r = 0; r < t.length; r++) {
                        var o = t[r];
                        if (o.render.visible && o.pointA && o.pointB) {
                            var s, a, h = o.bodyA,
                                l = o.bodyB;
                            if (s = h ? u.add(h.position, o.pointA) : o.pointA, "pin" === o.render.type) i.beginPath(), i.arc(s.x, s.y, 3, 0, 2 * Math.PI), i.closePath();
                            else {
                                if (a = l ? u.add(l.position, o.pointB) : o.pointB, i.beginPath(), i.moveTo(s.x, s.y), "spring" === o.render.type)
                                    for (var c, d = u.sub(a, s), p = u.perp(u.normalise(d)), f = Math.ceil(n.clamp(o.length / 5, 12, 20)), m = 1; m < f; m += 1) c = m % 2 == 0 ? 1 : -1, i.lineTo(s.x + d.x * (m / f) + p.x * c * 4, s.y + d.y * (m / f) + p.y * c * 4);
                                i.lineTo(a.x, a.y)
                            }
                            o.render.lineWidth && (i.lineWidth = o.render.lineWidth, i.strokeStyle = o.render.strokeStyle, i.stroke()), o.render.anchors && (i.fillStyle = o.render.strokeStyle, i.beginPath(), i.arc(s.x, s.y, 3, 0, 2 * Math.PI), i.arc(a.x, a.y, 3, 0, 2 * Math.PI), i.closePath(), i.fill())
                        }
                    }
                }, r.bodyShadows = function(t, e, i) {
                    for (var r = i, n = (t.engine, 0); n < e.length; n++) {
                        var o = e[n];
                        if (o.render.visible) {
                            if (o.circleRadius) r.beginPath(), r.arc(o.position.x, o.position.y, o.circleRadius, 0, 2 * Math.PI), r.closePath();
                            else {
                                r.beginPath(), r.moveTo(o.vertices[0].x, o.vertices[0].y);
                                for (var s = 1; s < o.vertices.length; s++) r.lineTo(o.vertices[s].x, o.vertices[s].y);
                                r.closePath()
                            }
                            var a = o.position.x - .5 * t.options.width,
                                h = o.position.y - .2 * t.options.height,
                                u = Math.abs(a) + Math.abs(h);
                            r.shadowColor = "rgba(0,0,0,0.15)", r.shadowOffsetX = .05 * a, r.shadowOffsetY = .05 * h, r.shadowBlur = 1 + 12 * Math.min(1, u / 1e3), r.fill(), r.shadowColor = null, r.shadowOffsetX = null, r.shadowOffsetY = null, r.shadowBlur = null
                        }
                    }
                }, r.bodies = function(t, e, i) {
                    var r, n, o, s, a = i,
                        h = (t.engine, t.options),
                        u = h.showInternalEdges || !h.wireframes;
                    for (o = 0; o < e.length; o++)
                        if ((r = e[o]).render.visible)
                            for (s = r.parts.length > 1 ? 1 : 0; s < r.parts.length; s++)
                                if ((n = r.parts[s]).render.visible) {
                                    if (h.showSleeping && r.isSleeping ? a.globalAlpha = .5 * n.render.opacity : 1 !== n.render.opacity && (a.globalAlpha = n.render.opacity), n.render.sprite && n.render.sprite.texture && !h.wireframes) {
                                        var l = n.render.sprite,
                                            c = d(t, l.texture);
                                        a.translate(n.position.x, n.position.y), a.rotate(n.angle), a.drawImage(c, c.width * -l.xOffset * l.xScale, c.height * -l.yOffset * l.yScale, c.width * l.xScale, c.height * l.yScale), a.rotate(-n.angle), a.translate(-n.position.x, -n.position.y)
                                    } else {
                                        if (n.circleRadius) a.beginPath(), a.arc(n.position.x, n.position.y, n.circleRadius, 0, 2 * Math.PI);
                                        else {
                                            a.beginPath(), a.moveTo(n.vertices[0].x, n.vertices[0].y);
                                            for (var p = 1; p < n.vertices.length; p++) !n.vertices[p - 1].isInternal || u ? a.lineTo(n.vertices[p].x, n.vertices[p].y) : a.moveTo(n.vertices[p].x, n.vertices[p].y), n.vertices[p].isInternal && !u && a.moveTo(n.vertices[(p + 1) % n.vertices.length].x, n.vertices[(p + 1) % n.vertices.length].y);
                                            a.lineTo(n.vertices[0].x, n.vertices[0].y), a.closePath()
                                        }
                                        h.wireframes ? (a.lineWidth = 1, a.strokeStyle = "#bbb", a.stroke()) : (a.fillStyle = n.render.fillStyle, n.render.lineWidth && (a.lineWidth = n.render.lineWidth, a.strokeStyle = n.render.strokeStyle, a.stroke()), a.fill())
                                    }
                                    a.globalAlpha = 1
                                }
                }, r.bodyWireframes = function(t, e, i) {
                    var r, n, o, s, a, h = i,
                        u = t.options.showInternalEdges;
                    for (h.beginPath(), o = 0; o < e.length; o++)
                        if ((r = e[o]).render.visible)
                            for (a = r.parts.length > 1 ? 1 : 0; a < r.parts.length; a++) {
                                for (n = r.parts[a], h.moveTo(n.vertices[0].x, n.vertices[0].y), s = 1; s < n.vertices.length; s++) !n.vertices[s - 1].isInternal || u ? h.lineTo(n.vertices[s].x, n.vertices[s].y) : h.moveTo(n.vertices[s].x, n.vertices[s].y), n.vertices[s].isInternal && !u && h.moveTo(n.vertices[(s + 1) % n.vertices.length].x, n.vertices[(s + 1) % n.vertices.length].y);
                                h.lineTo(n.vertices[0].x, n.vertices[0].y)
                            }
                    h.lineWidth = 1, h.strokeStyle = "#bbb", h.stroke()
                }, r.bodyConvexHulls = function(t, e, i) {
                    var r, n, o, s = i;
                    for (s.beginPath(), n = 0; n < e.length; n++)
                        if ((r = e[n]).render.visible && 1 !== r.parts.length) {
                            for (s.moveTo(r.vertices[0].x, r.vertices[0].y), o = 1; o < r.vertices.length; o++) s.lineTo(r.vertices[o].x, r.vertices[o].y);
                            s.lineTo(r.vertices[0].x, r.vertices[0].y)
                        }
                    s.lineWidth = 1, s.strokeStyle = "rgba(255,255,255,0.2)", s.stroke()
                }, r.vertexNumbers = function(t, e, i) {
                    var r, n, o, s = i;
                    for (r = 0; r < e.length; r++) {
                        var a = e[r].parts;
                        for (o = a.length > 1 ? 1 : 0; o < a.length; o++) {
                            var h = a[o];
                            for (n = 0; n < h.vertices.length; n++) s.fillStyle = "rgba(255,255,255,0.2)", s.fillText(r + "_" + n, h.position.x + .8 * (h.vertices[n].x - h.position.x), h.position.y + .8 * (h.vertices[n].y - h.position.y))
                        }
                    }
                }, r.mousePosition = function(t, e, i) {
                    var r = i;
                    r.fillStyle = "rgba(255,255,255,0.8)", r.fillText(e.position.x + "  " + e.position.y, e.position.x + 5, e.position.y - 5)
                }, r.bodyBounds = function(t, e, i) {
                    var r = i,
                        n = (t.engine, t.options);
                    r.beginPath();
                    for (var o = 0; o < e.length; o++)
                        if (e[o].render.visible)
                            for (var s = e[o].parts, a = s.length > 1 ? 1 : 0; a < s.length; a++) {
                                var h = s[a];
                                r.rect(h.bounds.min.x, h.bounds.min.y, h.bounds.max.x - h.bounds.min.x, h.bounds.max.y - h.bounds.min.y)
                            }
                    n.wireframes ? r.strokeStyle = "rgba(255,255,255,0.08)" : r.strokeStyle = "rgba(0,0,0,0.1)", r.lineWidth = 1, r.stroke()
                }, r.bodyAxes = function(t, e, i) {
                    var r, n, o, s, a = i,
                        h = (t.engine, t.options);
                    for (a.beginPath(), n = 0; n < e.length; n++) {
                        var u = e[n],
                            l = u.parts;
                        if (u.render.visible)
                            if (h.showAxes)
                                for (o = l.length > 1 ? 1 : 0; o < l.length; o++)
                                    for (r = l[o], s = 0; s < r.axes.length; s++) {
                                        var c = r.axes[s];
                                        a.moveTo(r.position.x, r.position.y), a.lineTo(r.position.x + 20 * c.x, r.position.y + 20 * c.y)
                                    } else
                                        for (o = l.length > 1 ? 1 : 0; o < l.length; o++)
                                            for (r = l[o], s = 0; s < r.axes.length; s++) a.moveTo(r.position.x, r.position.y), a.lineTo((r.vertices[0].x + r.vertices[r.vertices.length - 1].x) / 2, (r.vertices[0].y + r.vertices[r.vertices.length - 1].y) / 2)
                    }
                    h.wireframes ? (a.strokeStyle = "indianred", a.lineWidth = 1) : (a.strokeStyle = "rgba(255, 255, 255, 0.4)", a.globalCompositeOperation = "overlay", a.lineWidth = 2), a.stroke(), a.globalCompositeOperation = "source-over"
                }, r.bodyPositions = function(t, e, i) {
                    var r, n, o, s, a = i,
                        h = (t.engine, t.options);
                    for (a.beginPath(), o = 0; o < e.length; o++)
                        if ((r = e[o]).render.visible)
                            for (s = 0; s < r.parts.length; s++) n = r.parts[s], a.arc(n.position.x, n.position.y, 3, 0, 2 * Math.PI, !1), a.closePath();
                    for (h.wireframes ? a.fillStyle = "indianred" : a.fillStyle = "rgba(0,0,0,0.5)", a.fill(), a.beginPath(), o = 0; o < e.length; o++)(r = e[o]).render.visible && (a.arc(r.positionPrev.x, r.positionPrev.y, 2, 0, 2 * Math.PI, !1), a.closePath());
                    a.fillStyle = "rgba(255,165,0,0.8)", a.fill()
                }, r.bodyVelocity = function(t, e, i) {
                    var r = i;
                    r.beginPath();
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.render.visible && (r.moveTo(o.position.x, o.position.y), r.lineTo(o.position.x + 2 * (o.position.x - o.positionPrev.x), o.position.y + 2 * (o.position.y - o.positionPrev.y)))
                    }
                    r.lineWidth = 3, r.strokeStyle = "cornflowerblue", r.stroke()
                }, r.bodyIds = function(t, e, i) {
                    var r, n, o = i;
                    for (r = 0; r < e.length; r++)
                        if (e[r].render.visible) {
                            var s = e[r].parts;
                            for (n = s.length > 1 ? 1 : 0; n < s.length; n++) {
                                var a = s[n];
                                o.font = "12px Arial", o.fillStyle = "rgba(255,255,255,0.5)", o.fillText(a.id, a.position.x + 10, a.position.y - 10)
                            }
                        }
                }, r.collisions = function(t, e, i) {
                    var r, n, o, s, a = i,
                        h = t.options;
                    for (a.beginPath(), o = 0; o < e.length; o++)
                        if ((r = e[o]).isActive)
                            for (n = r.collision, s = 0; s < r.activeContacts.length; s++) {
                                var u = r.activeContacts[s].vertex;
                                a.rect(u.x - 1.5, u.y - 1.5, 3.5, 3.5)
                            }
                    for (h.wireframes ? a.fillStyle = "rgba(255,255,255,0.7)" : a.fillStyle = "orange", a.fill(), a.beginPath(), o = 0; o < e.length; o++)
                        if ((r = e[o]).isActive && (n = r.collision, r.activeContacts.length > 0)) {
                            var l = r.activeContacts[0].vertex.x,
                                c = r.activeContacts[0].vertex.y;
                            2 === r.activeContacts.length && (l = (r.activeContacts[0].vertex.x + r.activeContacts[1].vertex.x) / 2, c = (r.activeContacts[0].vertex.y + r.activeContacts[1].vertex.y) / 2), n.bodyB === n.supports[0].body || !0 === n.bodyA.isStatic ? a.moveTo(l - 8 * n.normal.x, c - 8 * n.normal.y) : a.moveTo(l + 8 * n.normal.x, c + 8 * n.normal.y), a.lineTo(l, c)
                        }
                    h.wireframes ? a.strokeStyle = "rgba(255,165,0,0.7)" : a.strokeStyle = "orange", a.lineWidth = 1, a.stroke()
                }, r.separations = function(t, e, i) {
                    var r, n, o, s, a, h = i,
                        u = t.options;
                    for (h.beginPath(), a = 0; a < e.length; a++)
                        if ((r = e[a]).isActive) {
                            o = (n = r.collision).bodyA;
                            var l = 1;
                            (s = n.bodyB).isStatic || o.isStatic || (l = .5), s.isStatic && (l = 0), h.moveTo(s.position.x, s.position.y), h.lineTo(s.position.x - n.penetration.x * l, s.position.y - n.penetration.y * l), l = 1, s.isStatic || o.isStatic || (l = .5), o.isStatic && (l = 0), h.moveTo(o.position.x, o.position.y), h.lineTo(o.position.x + n.penetration.x * l, o.position.y + n.penetration.y * l)
                        }
                    u.wireframes ? h.strokeStyle = "rgba(255,165,0,0.5)" : h.strokeStyle = "orange", h.stroke()
                }, r.grid = function(t, e, i) {
                    var r = i;
                    t.options.wireframes ? r.strokeStyle = "rgba(255,180,0,0.1)" : r.strokeStyle = "rgba(255,180,0,0.5)", r.beginPath();
                    for (var o = n.keys(e.buckets), s = 0; s < o.length; s++) {
                        var a = o[s];
                        if (!(e.buckets[a].length < 2)) {
                            var h = a.split(/C|R/);
                            r.rect(.5 + parseInt(h[1], 10) * e.bucketWidth, .5 + parseInt(h[2], 10) * e.bucketHeight, e.bucketWidth, e.bucketHeight)
                        }
                    }
                    r.lineWidth = 1, r.stroke()
                }, r.inspector = function(t, e) {
                    var i, r = (t.engine, t.selected),
                        n = t.render,
                        o = n.options;
                    if (o.hasBounds) {
                        var s = n.bounds.max.x - n.bounds.min.x,
                            a = n.bounds.max.y - n.bounds.min.y,
                            h = s / n.options.width,
                            u = a / n.options.height;
                        e.scale(1 / h, 1 / u), e.translate(-n.bounds.min.x, -n.bounds.min.y)
                    }
                    for (var l = 0; l < r.length; l++) {
                        var c = r[l].data;
                        switch (e.translate(.5, .5), e.lineWidth = 1, e.strokeStyle = "rgba(255,165,0,0.9)", e.setLineDash([1, 2]), c.type) {
                            case "body":
                                i = c.bounds, e.beginPath(), e.rect(Math.floor(i.min.x - 3), Math.floor(i.min.y - 3), Math.floor(i.max.x - i.min.x + 6), Math.floor(i.max.y - i.min.y + 6)), e.closePath(), e.stroke();
                                break;
                            case "constraint":
                                var d = c.pointA;
                                c.bodyA && (d = c.pointB), e.beginPath(), e.arc(d.x, d.y, 10, 0, 2 * Math.PI), e.closePath(), e.stroke()
                        }
                        e.setLineDash([]), e.translate(-.5, -.5)
                    }
                    null !== t.selectStart && (e.translate(.5, .5), e.lineWidth = 1, e.strokeStyle = "rgba(255,165,0,0.6)", e.fillStyle = "rgba(255,165,0,0.1)", i = t.selectBounds, e.beginPath(), e.rect(Math.floor(i.min.x), Math.floor(i.min.y), Math.floor(i.max.x - i.min.x), Math.floor(i.max.y - i.min.y)), e.closePath(), e.stroke(), e.fill(), e.translate(-.5, -.5)), o.hasBounds && e.setTransform(1, 0, 0, 1, 0, 0)
                };
                var i = function(t, e) {
                        var i = document.createElement("canvas");
                        return i.width = t, i.height = e, i.oncontextmenu = function() {
                            return !1
                        }, i.onselectstart = function() {
                            return !1
                        }, i
                    },
                    c = function(t) {
                        var e = t.getContext("2d");
                        return (window.devicePixelRatio || 1) / (e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1)
                    },
                    d = function(t, e) {
                        var i = t.textures[e];
                        return i || ((i = t.textures[e] = new Image).src = e, i)
                    },
                    p = function(t, e) {
                        var i = e;
                        /(jpg|gif|png)$/.test(e) && (i = "url(" + e + ")"), t.canvas.style.background = i, t.canvas.style.backgroundSize = "contain", t.currentBackground = e
                    }
            }()
        }, {
            "../body/Composite": 2,
            "../collision/Grid": 6,
            "../core/Common": 14,
            "../core/Events": 16,
            "../core/Mouse": 19,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28
        }],
        32: [function(t, e, i) {
            var r = {};
            e.exports = r;
            var n = t("../geometry/Bounds"),
                o = t("../body/Composite"),
                s = t("../core/Common"),
                a = t("../core/Events"),
                h = t("../geometry/Vector");
            ! function() {
                var t, e;
                "undefined" != typeof window && (t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                    window.setTimeout(function() {
                        t(s.now())
                    }, 1e3 / 60)
                }, e = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame), r.create = function(t) {
                    s.warn("RenderPixi.create: Matter.RenderPixi is deprecated (see docs)");
                    var e = {
                            controller: r,
                            engine: null,
                            element: null,
                            frameRequestId: null,
                            canvas: null,
                            renderer: null,
                            container: null,
                            spriteContainer: null,
                            pixiOptions: null,
                            options: {
                                width: 800,
                                height: 600,
                                background: "#fafafa",
                                wireframeBackground: "#222",
                                hasBounds: !1,
                                enabled: !0,
                                wireframes: !0,
                                showSleeping: !0,
                                showDebug: !1,
                                showBroadphase: !1,
                                showBounds: !1,
                                showVelocity: !1,
                                showCollisions: !1,
                                showAxes: !1,
                                showPositions: !1,
                                showAngleIndicator: !1,
                                showIds: !1,
                                showShadows: !1
                            }
                        },
                        i = s.extend(e, t),
                        n = !i.options.wireframes && "transparent" === i.options.background;
                    return i.pixiOptions = i.pixiOptions || {
                        view: i.canvas,
                        transparent: n,
                        antialias: !0,
                        backgroundColor: t.background
                    }, i.mouse = t.mouse, i.engine = t.engine, i.renderer = i.renderer || new PIXI.WebGLRenderer(i.options.width, i.options.height, i.pixiOptions), i.container = i.container || new PIXI.Container, i.spriteContainer = i.spriteContainer || new PIXI.Container, i.canvas = i.canvas || i.renderer.view, i.bounds = i.bounds || {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: i.options.width,
                            y: i.options.height
                        }
                    }, a.on(i.engine, "beforeUpdate", function() {
                        r.clear(i)
                    }), i.textures = {}, i.sprites = {}, i.primitives = {}, i.container.addChild(i.spriteContainer), s.isElement(i.element) ? i.element.appendChild(i.canvas) : s.warn('No "render.element" passed, "render.canvas" was not inserted into document.'), i.canvas.oncontextmenu = function() {
                        return !1
                    }, i.canvas.onselectstart = function() {
                        return !1
                    }, i
                }, r.run = function(e) {
                    ! function i(n) {
                        e.frameRequestId = t(i), r.world(e)
                    }()
                }, r.stop = function(t) {
                    e(t.frameRequestId)
                }, r.clear = function(t) {
                    for (var e = t.container, i = t.spriteContainer; e.children[0];) e.removeChild(e.children[0]);
                    for (; i.children[0];) i.removeChild(i.children[0]);
                    var r = t.sprites["bg-0"];
                    t.textures = {}, t.sprites = {}, t.primitives = {}, t.sprites["bg-0"] = r, r && e.addChildAt(r, 0), t.container.addChild(t.spriteContainer), t.currentBackground = null, e.scale.set(1, 1), e.position.set(0, 0)
                }, r.setBackground = function(t, e) {
                    if (t.currentBackground !== e) {
                        var i = e.indexOf && -1 !== e.indexOf("#"),
                            r = t.sprites["bg-0"];
                        if (i) {
                            var n = s.colorToNumber(e);
                            t.renderer.backgroundColor = n, r && t.container.removeChild(r)
                        } else if (!r) {
                            var o = l(t, e);
                            (r = t.sprites["bg-0"] = new PIXI.Sprite(o)).position.x = 0, r.position.y = 0, t.container.addChildAt(r, 0)
                        }
                        t.currentBackground = e
                    }
                }, r.world = function(t) {
                    var e, i = t.engine.world,
                        s = t.renderer,
                        a = t.container,
                        u = t.options,
                        l = o.allBodies(i),
                        c = o.allConstraints(i),
                        d = [];
                    u.wireframes ? r.setBackground(t, u.wireframeBackground) : r.setBackground(t, u.background);
                    var p = t.bounds.max.x - t.bounds.min.x,
                        f = t.bounds.max.y - t.bounds.min.y,
                        m = p / t.options.width,
                        g = f / t.options.height;
                    if (u.hasBounds) {
                        for (e = 0; e < l.length; e++) {
                            var v = l[e];
                            v.render.sprite.visible = n.overlaps(v.bounds, t.bounds)
                        }
                        for (e = 0; e < c.length; e++) {
                            var y = c[e],
                                _ = y.bodyA,
                                b = y.bodyB,
                                x = y.pointA,
                                w = y.pointB;
                            _ && (x = h.add(_.position, y.pointA)), b && (w = h.add(b.position, y.pointB)), x && w && (n.contains(t.bounds, x) || n.contains(t.bounds, w)) && d.push(y)
                        }
                        a.scale.set(1 / m, 1 / g), a.position.set(-t.bounds.min.x * (1 / m), -t.bounds.min.y * (1 / g))
                    } else d = c;
                    for (e = 0; e < l.length; e++) r.body(t, l[e]);
                    for (e = 0; e < d.length; e++) r.constraint(t, d[e]);
                    s.render(a)
                }, r.constraint = function(t, e) {
                    var i = (t.engine, e.bodyA),
                        r = e.bodyB,
                        n = e.pointA,
                        o = e.pointB,
                        a = t.container,
                        h = e.render,
                        u = "c-" + e.id,
                        l = t.primitives[u];
                    l || (l = t.primitives[u] = new PIXI.Graphics), h.visible && e.pointA && e.pointB ? (-1 === s.indexOf(a.children, l) && a.addChild(l), l.clear(), l.beginFill(0, 0), l.lineStyle(h.lineWidth, s.colorToNumber(h.strokeStyle), 1), i ? l.moveTo(i.position.x + n.x, i.position.y + n.y) : l.moveTo(n.x, n.y), r ? l.lineTo(r.position.x + o.x, r.position.y + o.y) : l.lineTo(o.x, o.y), l.endFill()) : l.clear()
                }, r.body = function(t, e) {
                    var r = (t.engine, e.render);
                    if (r.visible)
                        if (r.sprite && r.sprite.texture) {
                            var n = "b-" + e.id,
                                o = t.sprites[n],
                                a = t.spriteContainer;
                            o || (o = t.sprites[n] = i(t, e)), -1 === s.indexOf(a.children, o) && a.addChild(o), o.position.x = e.position.x, o.position.y = e.position.y, o.rotation = e.angle, o.scale.x = r.sprite.xScale || 1, o.scale.y = r.sprite.yScale || 1
                        } else {
                            var h = "b-" + e.id,
                                l = t.primitives[h],
                                c = t.container;
                            l || ((l = t.primitives[h] = u(t, e)).initialAngle = e.angle), -1 === s.indexOf(c.children, l) && c.addChild(l), l.position.x = e.position.x, l.position.y = e.position.y, l.rotation = e.angle - l.initialAngle
                        }
                };
                var i = function(t, e) {
                        var i = e.render.sprite.texture,
                            r = l(t, i),
                            n = new PIXI.Sprite(r);
                        return n.anchor.x = e.render.sprite.xOffset, n.anchor.y = e.render.sprite.yOffset, n
                    },
                    u = function(t, e) {
                        var i, r = e.render,
                            n = t.options,
                            o = new PIXI.Graphics,
                            a = s.colorToNumber(r.fillStyle),
                            h = s.colorToNumber(r.strokeStyle),
                            u = s.colorToNumber(r.strokeStyle),
                            l = s.colorToNumber("#bbb"),
                            c = s.colorToNumber("#CD5C5C");
                        o.clear();
                        for (var d = e.parts.length > 1 ? 1 : 0; d < e.parts.length; d++) {
                            i = e.parts[d], n.wireframes ? (o.beginFill(0, 0), o.lineStyle(1, l, 1)) : (o.beginFill(a, 1), o.lineStyle(r.lineWidth, h, 1)), o.moveTo(i.vertices[0].x - e.position.x, i.vertices[0].y - e.position.y);
                            for (var p = 1; p < i.vertices.length; p++) o.lineTo(i.vertices[p].x - e.position.x, i.vertices[p].y - e.position.y);
                            o.lineTo(i.vertices[0].x - e.position.x, i.vertices[0].y - e.position.y), o.endFill(), (n.showAngleIndicator || n.showAxes) && (o.beginFill(0, 0), n.wireframes ? o.lineStyle(1, c, 1) : o.lineStyle(1, u), o.moveTo(i.position.x - e.position.x, i.position.y - e.position.y), o.lineTo((i.vertices[0].x + i.vertices[i.vertices.length - 1].x) / 2 - e.position.x, (i.vertices[0].y + i.vertices[i.vertices.length - 1].y) / 2 - e.position.y), o.endFill())
                        }
                        return o
                    },
                    l = function(t, e) {
                        var i = t.textures[e];
                        return i || (i = t.textures[e] = PIXI.Texture.fromImage(e)), i
                    }
            }()
        }, {
            "../body/Composite": 2,
            "../core/Common": 14,
            "../core/Events": 16,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28
        }]
    }, {}, [30])(30)
});
var PIXI = function(t) {
    "use strict";
    var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function i(t, e) {
        return t(e = {
            exports: {}
        }, e.exports), e.exports
    }
    var r = i(function(t, i) {
            ! function(t) {
                var e = t.Promise,
                    r = e && "resolve" in e && "reject" in e && "all" in e && "race" in e && function() {
                        var t;
                        return new e(function(e) {
                            t = e
                        }), "function" == typeof t
                    }();
                i ? (i.Promise = r ? e : T, i.Polyfill = T) : r || (t.Promise = T);
                var n = "pending",
                    o = "sealed",
                    s = "fulfilled",
                    a = "rejected",
                    h = function() {};

                function u(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                }
                var l, c = "undefined" != typeof setImmediate ? setImmediate : setTimeout,
                    d = [];

                function p() {
                    for (var t = 0; t < d.length; t++) d[t][0](d[t][1]);
                    d = [], l = !1
                }

                function f(t, e) {
                    d.push([t, e]), l || (l = !0, c(p, 0))
                }

                function m(t) {
                    var e = t.owner,
                        i = e.state_,
                        r = e.data_,
                        n = t[i],
                        o = t.then;
                    if ("function" == typeof n) {
                        i = s;
                        try {
                            r = n(r)
                        } catch (t) {
                            _(o, t)
                        }
                    }
                    g(o, r) || (i === s && v(o, r), i === a && _(o, r))
                }

                function g(t, e) {
                    var i;
                    try {
                        if (t === e) throw new TypeError("A promises callback cannot return that same promise.");
                        if (e && ("function" == typeof e || "object" == typeof e)) {
                            var r = e.then;
                            if ("function" == typeof r) return r.call(e, function(r) {
                                i || (i = !0, e !== r ? v(t, r) : y(t, r))
                            }, function(e) {
                                i || (i = !0, _(t, e))
                            }), !0
                        }
                    } catch (e) {
                        return i || _(t, e), !0
                    }
                    return !1
                }

                function v(t, e) {
                    t !== e && g(t, e) || y(t, e)
                }

                function y(t, e) {
                    t.state_ === n && (t.state_ = o, t.data_ = e, f(x, t))
                }

                function _(t, e) {
                    t.state_ === n && (t.state_ = o, t.data_ = e, f(w, t))
                }

                function b(t) {
                    var e = t.then_;
                    t.then_ = void 0;
                    for (var i = 0; i < e.length; i++) m(e[i])
                }

                function x(t) {
                    t.state_ = s, b(t)
                }

                function w(t) {
                    t.state_ = a, b(t)
                }

                function T(t) {
                    if ("function" != typeof t) throw new TypeError("Promise constructor takes a function argument");
                    if (this instanceof T == 0) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    this.then_ = [],
                        function(t, e) {
                            function i(t) {
                                _(e, t)
                            }
                            try {
                                t(function(t) {
                                    v(e, t)
                                }, i)
                            } catch (t) {
                                i(t)
                            }
                        }(t, this)
                }
                T.prototype = {
                    constructor: T,
                    state_: n,
                    then_: null,
                    data_: void 0,
                    then: function(t, e) {
                        var i = {
                            owner: this,
                            then: new this.constructor(h),
                            fulfilled: t,
                            rejected: e
                        };
                        return this.state_ === s || this.state_ === a ? f(m, i) : this.then_.push(i), i.then
                    },
                    catch: function(t) {
                        return this.then(null, t)
                    }
                }, T.all = function(t) {
                    if (!u(t)) throw new TypeError("You must pass an array to Promise.all().");
                    return new this(function(e, i) {
                        var r = [],
                            n = 0;

                        function o(t) {
                            return n++,
                                function(i) {
                                    r[t] = i, --n || e(r)
                                }
                        }
                        for (var s, a = 0; a < t.length; a++)(s = t[a]) && "function" == typeof s.then ? s.then(o(a), i) : r[a] = s;
                        n || e(r)
                    })
                }, T.race = function(t) {
                    if (!u(t)) throw new TypeError("You must pass an array to Promise.race().");
                    return new this(function(e, i) {
                        for (var r, n = 0; n < t.length; n++)(r = t[n]) && "function" == typeof r.then ? r.then(e, i) : e(r)
                    })
                }, T.resolve = function(t) {
                    return t && "object" == typeof t && t.constructor === this ? t : new this(function(e) {
                        e(t)
                    })
                }, T.reject = function(t) {
                    return new this(function(e, i) {
                        i(t)
                    })
                }
            }("undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : e)
        }),
        n = (r.Promise, r.Polyfill),
        o = Object.getOwnPropertySymbols,
        s = Object.prototype.hasOwnProperty,
        a = Object.prototype.propertyIsEnumerable,
        h = function() {
            try {
                if (!Object.assign) return !1;
                var t = new String("abc");
                if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
                for (var e = {}, i = 0; i < 10; i++) e["_" + String.fromCharCode(i)] = i;
                if ("0123456789" !== Object.getOwnPropertyNames(e).map(function(t) {
                        return e[t]
                    }).join("")) return !1;
                var r = {};
                return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                    r[t] = t
                }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
            } catch (t) {
                return !1
            }
        }() ? Object.assign : function(t, e) {
            for (var i, r, n = arguments, h = function(t) {
                    if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
                    return Object(t)
                }(t), u = 1; u < arguments.length; u++) {
                for (var l in i = Object(n[u])) s.call(i, l) && (h[l] = i[l]);
                if (o) {
                    r = o(i);
                    for (var c = 0; c < r.length; c++) a.call(i, r[c]) && (h[r[c]] = i[r[c]])
                }
            }
            return h
        };
    window.Promise || (window.Promise = n), Object.assign || (Object.assign = h);
    var u = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    if (Date.now && Date.prototype.getTime || (Date.now = function() {
            return (new Date).getTime()
        }), !u.performance || !u.performance.now) {
        var l = Date.now();
        u.performance || (u.performance = {}), u.performance.now = function() {
            return Date.now() - l
        }
    }
    for (var c = Date.now(), d = ["ms", "moz", "webkit", "o"], p = 0; p < d.length && !u.requestAnimationFrame; ++p) {
        var f = d[p];
        u.requestAnimationFrame = u[f + "RequestAnimationFrame"], u.cancelAnimationFrame = u[f + "CancelAnimationFrame"] || u[f + "CancelRequestAnimationFrame"]
    }
    u.requestAnimationFrame || (u.requestAnimationFrame = function(t) {
        if ("function" != typeof t) throw new TypeError(t + "is not a function");
        var e = Date.now(),
            i = 16 + c - e;
        return i < 0 && (i = 0), c = e, setTimeout(function() {
            c = Date.now(), t(performance.now())
        }, i)
    }), u.cancelAnimationFrame || (u.cancelAnimationFrame = function(t) {
        return clearTimeout(t)
    }), Math.sign || (Math.sign = function(t) {
        return 0 === (t = Number(t)) || isNaN(t) ? t : t > 0 ? 1 : -1
    }), Number.isInteger || (Number.isInteger = function(t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t
    }), window.ArrayBuffer || (window.ArrayBuffer = Array), window.Float32Array || (window.Float32Array = Array), window.Uint32Array || (window.Uint32Array = Array), window.Uint16Array || (window.Uint16Array = Array), window.Uint8Array || (window.Uint8Array = Array), window.Int32Array || (window.Int32Array = Array);
    var m = i(function(t) {
        ! function(e) {
            var i = /iPhone/i,
                r = /iPod/i,
                n = /iPad/i,
                o = /\bAndroid(?:.+)Mobile\b/i,
                s = /Android/i,
                a = /\bAndroid(?:.+)SD4930UR\b/i,
                h = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,
                u = /Windows Phone/i,
                l = /\bWindows(?:.+)ARM\b/i,
                c = /BlackBerry/i,
                d = /BB10/i,
                p = /Opera Mini/i,
                f = /\b(CriOS|Chrome)(?:.+)Mobile/i,
                m = /Mobile(?:.+)Firefox\b/i;

            function g(t, e) {
                return t.test(e)
            }

            function v(t) {
                var e = t || ("undefined" != typeof navigator ? navigator.userAgent : ""),
                    v = e.split("[FBAN");
                void 0 !== v[1] && (e = v[0]), void 0 !== (v = e.split("Twitter"))[1] && (e = v[0]);
                var y = {
                    apple: {
                        phone: g(i, e) && !g(u, e),
                        ipod: g(r, e),
                        tablet: !g(i, e) && g(n, e) && !g(u, e),
                        device: (g(i, e) || g(r, e) || g(n, e)) && !g(u, e)
                    },
                    amazon: {
                        phone: g(a, e),
                        tablet: !g(a, e) && g(h, e),
                        device: g(a, e) || g(h, e)
                    },
                    android: {
                        phone: !g(u, e) && g(a, e) || !g(u, e) && g(o, e),
                        tablet: !g(u, e) && !g(a, e) && !g(o, e) && (g(h, e) || g(s, e)),
                        device: !g(u, e) && (g(a, e) || g(h, e) || g(o, e) || g(s, e)) || g(/\bokhttp\b/i, e)
                    },
                    windows: {
                        phone: g(u, e),
                        tablet: g(l, e),
                        device: g(u, e) || g(l, e)
                    },
                    other: {
                        blackberry: g(c, e),
                        blackberry10: g(d, e),
                        opera: g(p, e),
                        firefox: g(m, e),
                        chrome: g(f, e),
                        device: g(c, e) || g(d, e) || g(p, e) || g(m, e) || g(f, e)
                    }
                };
                return y.any = y.apple.device || y.android.device || y.windows.device || y.other.device, y.phone = y.apple.phone || y.android.phone || y.windows.phone, y.tablet = y.apple.tablet || y.android.tablet || y.windows.tablet, y
            }
            t.exports && "undefined" == typeof window ? t.exports = v : t.exports && "undefined" != typeof window ? (t.exports = v(), t.exports.isMobile = v) : e.isMobile = v()
        }(e)
    });
    m.isMobile;
    var g = {
            MIPMAP_TEXTURES: 1,
            ANISOTROPIC_LEVEL: 0,
            RESOLUTION: 1,
            FILTER_RESOLUTION: 1,
            SPRITE_MAX_TEXTURES: function(t) {
                var e = !0;
                if (m.tablet || m.phone) {
                    if (e = !1, m.apple.device) {
                        var i = navigator.userAgent.match(/OS (\d+)_(\d+)?/);
                        i && parseInt(i[1], 10) >= 11 && (e = !0)
                    }
                    if (m.android.device) {
                        var r = navigator.userAgent.match(/Android\s([0-9.]*)/);
                        r && parseInt(r[1], 10) >= 7 && (e = !0)
                    }
                }
                return e ? 32 : 4
            }(),
            SPRITE_BATCH_SIZE: 4096,
            RENDER_OPTIONS: {
                view: null,
                antialias: !1,
                forceFXAA: !1,
                autoDensity: !1,
                transparent: !1,
                backgroundColor: 0,
                clearBeforeRender: !0,
                preserveDrawingBuffer: !1,
                width: 800,
                height: 600,
                legacy: !1
            },
            GC_MODE: 0,
            GC_MAX_IDLE: 3600,
            GC_MAX_CHECK_COUNT: 600,
            WRAP_MODE: 33071,
            SCALE_MODE: 1,
            PRECISION_VERTEX: "highp",
            PRECISION_FRAGMENT: m.apple.device ? "highp" : "mediump",
            CAN_UPLOAD_SAME_BUFFER: !m.apple.device,
            CREATE_IMAGE_BITMAP: !1,
            ROUND_PIXELS: !1
        },
        v = i(function(t) {
            var e = Object.prototype.hasOwnProperty,
                i = "~";

            function r() {}

            function n(t, e, r, n, o) {
                if ("function" != typeof r) throw new TypeError("The listener must be a function");
                var s = new function(t, e, i) {
                        this.fn = t, this.context = e, this.once = i || !1
                    }(r, n || t, o),
                    a = i ? i + e : e;
                return t._events[a] ? t._events[a].fn ? t._events[a] = [t._events[a], s] : t._events[a].push(s) : (t._events[a] = s, t._eventsCount++), t
            }

            function o(t, e) {
                0 == --t._eventsCount ? t._events = new r : delete t._events[e]
            }

            function s() {
                this._events = new r, this._eventsCount = 0
            }
            Object.create && (r.prototype = Object.create(null), (new r).__proto__ || (i = !1)), s.prototype.eventNames = function() {
                var t, r, n = [];
                if (0 === this._eventsCount) return n;
                for (r in t = this._events) e.call(t, r) && n.push(i ? r.slice(1) : r);
                return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n
            }, s.prototype.listeners = function(t) {
                var e = i ? i + t : t,
                    r = this._events[e];
                if (!r) return [];
                if (r.fn) return [r.fn];
                for (var n = 0, o = r.length, s = new Array(o); n < o; n++) s[n] = r[n].fn;
                return s
            }, s.prototype.listenerCount = function(t) {
                var e = i ? i + t : t,
                    r = this._events[e];
                return r ? r.fn ? 1 : r.length : 0
            }, s.prototype.emit = function(t, e, r, n, o, s) {
                var a = arguments,
                    h = i ? i + t : t;
                if (!this._events[h]) return !1;
                var u, l, c = this._events[h],
                    d = arguments.length;
                if (c.fn) {
                    switch (c.once && this.removeListener(t, c.fn, void 0, !0), d) {
                        case 1:
                            return c.fn.call(c.context), !0;
                        case 2:
                            return c.fn.call(c.context, e), !0;
                        case 3:
                            return c.fn.call(c.context, e, r), !0;
                        case 4:
                            return c.fn.call(c.context, e, r, n), !0;
                        case 5:
                            return c.fn.call(c.context, e, r, n, o), !0;
                        case 6:
                            return c.fn.call(c.context, e, r, n, o, s), !0
                    }
                    for (l = 1, u = new Array(d - 1); l < d; l++) u[l - 1] = a[l];
                    c.fn.apply(c.context, u)
                } else {
                    var p, f = c.length;
                    for (l = 0; l < f; l++) switch (c[l].once && this.removeListener(t, c[l].fn, void 0, !0), d) {
                        case 1:
                            c[l].fn.call(c[l].context);
                            break;
                        case 2:
                            c[l].fn.call(c[l].context, e);
                            break;
                        case 3:
                            c[l].fn.call(c[l].context, e, r);
                            break;
                        case 4:
                            c[l].fn.call(c[l].context, e, r, n);
                            break;
                        default:
                            if (!u)
                                for (p = 1, u = new Array(d - 1); p < d; p++) u[p - 1] = a[p];
                            c[l].fn.apply(c[l].context, u)
                    }
                }
                return !0
            }, s.prototype.on = function(t, e, i) {
                return n(this, t, e, i, !1)
            }, s.prototype.once = function(t, e, i) {
                return n(this, t, e, i, !0)
            }, s.prototype.removeListener = function(t, e, r, n) {
                var s = i ? i + t : t;
                if (!this._events[s]) return this;
                if (!e) return o(this, s), this;
                var a = this._events[s];
                if (a.fn) a.fn !== e || n && !a.once || r && a.context !== r || o(this, s);
                else {
                    for (var h = 0, u = [], l = a.length; h < l; h++)(a[h].fn !== e || n && !a[h].once || r && a[h].context !== r) && u.push(a[h]);
                    u.length ? this._events[s] = 1 === u.length ? u[0] : u : o(this, s)
                }
                return this
            }, s.prototype.removeAllListeners = function(t) {
                var e;
                return t ? (e = i ? i + t : t, this._events[e] && o(this, e)) : (this._events = new r, this._eventsCount = 0), this
            }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = i, s.EventEmitter = s, t.exports = s
        }),
        y = b,
        _ = b;

    function b(t, e, i) {
        i = i || 2;
        var r, n, o, s, a, h, u, l = e && e.length,
            c = l ? e[0] * i : t.length,
            d = x(t, 0, c, i, !0),
            p = [];
        if (!d || d.next === d.prev) return p;
        if (l && (d = function(t, e, i, r) {
                var n, o, s, a = [];
                for (n = 0, o = e.length; n < o; n++)(s = x(t, e[n] * r, n < o - 1 ? e[n + 1] * r : t.length, r, !1)) === s.next && (s.steiner = !0), a.push(R(s));
                for (a.sort(C), n = 0; n < a.length; n++) A(a[n], i), i = w(i, i.next);
                return i
            }(t, e, d, i)), t.length > 80 * i) {
            r = o = t[0], n = s = t[1];
            for (var f = i; f < c; f += i)(a = t[f]) < r && (r = a), (h = t[f + 1]) < n && (n = h), a > o && (o = a), h > s && (s = h);
            u = 0 !== (u = Math.max(o - r, s - n)) ? 1 / u : 0
        }
        return T(d, p, i, r, n, u), p
    }

    function x(t, e, i, r, n) {
        var o, s;
        if (n === z(t, e, i, r) > 0)
            for (o = e; o < i; o += r) s = G(o, t[o], t[o + 1], s);
        else
            for (o = i - r; o >= e; o -= r) s = G(o, t[o], t[o + 1], s);
        return s && B(s, s.next) && (V(s), s = s.next), s
    }

    function w(t, e) {
        if (!t) return t;
        e || (e = t);
        var i, r = t;
        do {
            if (i = !1, r.steiner || !B(r, r.next) && 0 !== L(r.prev, r, r.next)) r = r.next;
            else {
                if (V(r), (r = e = r.prev) === r.next) break;
                i = !0
            }
        } while (i || r !== e);
        return e
    }

    function T(t, e, i, r, n, o, s) {
        if (t) {
            !s && o && function(t, e, i, r) {
                var n = t;
                do {
                    null === n.z && (n.z = O(n.x, n.y, e, i, r)), n.prevZ = n.prev, n.nextZ = n.next, n = n.next
                } while (n !== t);
                n.prevZ.nextZ = null, n.prevZ = null,
                    function(t) {
                        var e, i, r, n, o, s, a, h, u = 1;
                        do {
                            for (i = t, t = null, o = null, s = 0; i;) {
                                for (s++, r = i, a = 0, e = 0; e < u && (a++, r = r.nextZ); e++);
                                for (h = u; a > 0 || h > 0 && r;) 0 !== a && (0 === h || !r || i.z <= r.z) ? (n = i, i = i.nextZ, a--) : (n = r, r = r.nextZ, h--), o ? o.nextZ = n : t = n, n.prevZ = o, o = n;
                                i = r
                            }
                            o.nextZ = null, u *= 2
                        } while (s > 1)
                    }(n)
            }(t, r, n, o);
            for (var a, h, u = t; t.prev !== t.next;)
                if (a = t.prev, h = t.next, o ? E(t, r, n, o) : S(t)) e.push(a.i / i), e.push(t.i / i), e.push(h.i / i), V(t), t = h.next, u = h.next;
                else if ((t = h) === u) {
                s ? 1 === s ? T(t = P(w(t), e, i), e, i, r, n, o, 2) : 2 === s && I(t, e, i, r, n, o) : T(w(t), e, i, r, n, o, 1);
                break
            }
        }
    }

    function S(t) {
        var e = t.prev,
            i = t,
            r = t.next;
        if (L(e, i, r) >= 0) return !1;
        for (var n = t.next.next; n !== t.prev;) {
            if (D(e.x, e.y, i.x, i.y, r.x, r.y, n.x, n.y) && L(n.prev, n, n.next) >= 0) return !1;
            n = n.next
        }
        return !0
    }

    function E(t, e, i, r) {
        var n = t.prev,
            o = t,
            s = t.next;
        if (L(n, o, s) >= 0) return !1;
        for (var a = n.x < o.x ? n.x < s.x ? n.x : s.x : o.x < s.x ? o.x : s.x, h = n.y < o.y ? n.y < s.y ? n.y : s.y : o.y < s.y ? o.y : s.y, u = n.x > o.x ? n.x > s.x ? n.x : s.x : o.x > s.x ? o.x : s.x, l = n.y > o.y ? n.y > s.y ? n.y : s.y : o.y > s.y ? o.y : s.y, c = O(a, h, e, i, r), d = O(u, l, e, i, r), p = t.prevZ, f = t.nextZ; p && p.z >= c && f && f.z <= d;) {
            if (p !== t.prev && p !== t.next && D(n.x, n.y, o.x, o.y, s.x, s.y, p.x, p.y) && L(p.prev, p, p.next) >= 0) return !1;
            if (p = p.prevZ, f !== t.prev && f !== t.next && D(n.x, n.y, o.x, o.y, s.x, s.y, f.x, f.y) && L(f.prev, f, f.next) >= 0) return !1;
            f = f.nextZ
        }
        for (; p && p.z >= c;) {
            if (p !== t.prev && p !== t.next && D(n.x, n.y, o.x, o.y, s.x, s.y, p.x, p.y) && L(p.prev, p, p.next) >= 0) return !1;
            p = p.prevZ
        }
        for (; f && f.z <= d;) {
            if (f !== t.prev && f !== t.next && D(n.x, n.y, o.x, o.y, s.x, s.y, f.x, f.y) && L(f.prev, f, f.next) >= 0) return !1;
            f = f.nextZ
        }
        return !0
    }

    function P(t, e, i) {
        var r = t;
        do {
            var n = r.prev,
                o = r.next.next;
            !B(n, o) && k(n, r, r.next, o) && j(n, o) && j(o, n) && (e.push(n.i / i), e.push(r.i / i), e.push(o.i / i), V(r), V(r.next), r = t = o), r = r.next
        } while (r !== t);
        return w(r)
    }

    function I(t, e, i, r, n, o) {
        var s = t;
        do {
            for (var a = s.next.next; a !== s.prev;) {
                if (s.i !== a.i && F(s, a)) {
                    var h = X(s, a);
                    return s = w(s, s.next), h = w(h, h.next), T(s, e, i, r, n, o), void T(h, e, i, r, n, o)
                }
                a = a.next
            }
            s = s.next
        } while (s !== t)
    }

    function C(t, e) {
        return t.x - e.x
    }

    function A(t, e) {
        if (e = function(t, e) {
                var i, r = e,
                    n = t.x,
                    o = t.y,
                    s = -1 / 0;
                do {
                    if (o <= r.y && o >= r.next.y && r.next.y !== r.y) {
                        var a = r.x + (o - r.y) * (r.next.x - r.x) / (r.next.y - r.y);
                        if (a <= n && a > s) {
                            if (s = a, a === n) {
                                if (o === r.y) return r;
                                if (o === r.next.y) return r.next
                            }
                            i = r.x < r.next.x ? r : r.next
                        }
                    }
                    r = r.next
                } while (r !== e);
                if (!i) return null;
                if (n === s) return i;
                var h, u = i,
                    l = i.x,
                    c = i.y,
                    d = 1 / 0;
                r = i;
                do {
                    n >= r.x && r.x >= l && n !== r.x && D(o < c ? n : s, o, l, c, o < c ? s : n, o, r.x, r.y) && (h = Math.abs(o - r.y) / (n - r.x), j(r, t) && (h < d || h === d && (r.x > i.x || r.x === i.x && M(i, r))) && (i = r, d = h)), r = r.next
                } while (r !== u);
                return i
            }(t, e)) {
            var i = X(e, t);
            w(i, i.next)
        }
    }

    function M(t, e) {
        return L(t.prev, t, e.prev) < 0 && L(e.next, t, t.next) < 0
    }

    function O(t, e, i, r, n) {
        return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - i) * n) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - r) * n) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
    }

    function R(t) {
        var e = t,
            i = t;
        do {
            (e.x < i.x || e.x === i.x && e.y < i.y) && (i = e), e = e.next
        } while (e !== t);
        return i
    }

    function D(t, e, i, r, n, o, s, a) {
        return (n - s) * (e - a) - (t - s) * (o - a) >= 0 && (t - s) * (r - a) - (i - s) * (e - a) >= 0 && (i - s) * (o - a) - (n - s) * (r - a) >= 0
    }

    function F(t, e) {
        return t.next.i !== e.i && t.prev.i !== e.i && ! function(t, e) {
            var i = t;
            do {
                if (i.i !== t.i && i.next.i !== t.i && i.i !== e.i && i.next.i !== e.i && k(i, i.next, t, e)) return !0;
                i = i.next
            } while (i !== t);
            return !1
        }(t, e) && (j(t, e) && j(e, t) && function(t, e) {
            var i = t,
                r = !1,
                n = (t.x + e.x) / 2,
                o = (t.y + e.y) / 2;
            do {
                i.y > o != i.next.y > o && i.next.y !== i.y && n < (i.next.x - i.x) * (o - i.y) / (i.next.y - i.y) + i.x && (r = !r), i = i.next
            } while (i !== t);
            return r
        }(t, e) && (L(t.prev, t, e.prev) || L(t, e.prev, e)) || B(t, e) && L(t.prev, t, t.next) > 0 && L(e.prev, e, e.next) > 0)
    }

    function L(t, e, i) {
        return (e.y - t.y) * (i.x - e.x) - (e.x - t.x) * (i.y - e.y)
    }

    function B(t, e) {
        return t.x === e.x && t.y === e.y
    }

    function k(t, e, i, r) {
        var n = U(L(t, e, i)),
            o = U(L(t, e, r)),
            s = U(L(i, r, t)),
            a = U(L(i, r, e));
        return n !== o && s !== a || !(0 !== n || !N(t, i, e)) || !(0 !== o || !N(t, r, e)) || !(0 !== s || !N(i, t, r)) || !(0 !== a || !N(i, e, r))
    }

    function N(t, e, i) {
        return e.x <= Math.max(t.x, i.x) && e.x >= Math.min(t.x, i.x) && e.y <= Math.max(t.y, i.y) && e.y >= Math.min(t.y, i.y)
    }

    function U(t) {
        return t > 0 ? 1 : t < 0 ? -1 : 0
    }

    function j(t, e) {
        return L(t.prev, t, t.next) < 0 ? L(t, e, t.next) >= 0 && L(t, t.prev, e) >= 0 : L(t, e, t.prev) < 0 || L(t, t.next, e) < 0
    }

    function X(t, e) {
        var i = new H(t.i, t.x, t.y),
            r = new H(e.i, e.x, e.y),
            n = t.next,
            o = e.prev;
        return t.next = e, e.prev = t, i.next = n, n.prev = i, r.next = i, i.prev = r, o.next = r, r.prev = o, r
    }

    function G(t, e, i, r) {
        var n = new H(t, e, i);
        return r ? (n.next = r.next, n.prev = r, r.next.prev = n, r.next = n) : (n.prev = n, n.next = n), n
    }

    function V(t) {
        t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ)
    }

    function H(t, e, i) {
        this.i = t, this.x = e, this.y = i, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
    }

    function z(t, e, i, r) {
        for (var n = 0, o = e, s = i - r; o < i; o += r) n += (t[s] - t[o]) * (t[o + 1] + t[s + 1]), s = o;
        return n
    }
    b.deviation = function(t, e, i, r) {
        var n = e && e.length,
            o = n ? e[0] * i : t.length,
            s = Math.abs(z(t, 0, o, i));
        if (n)
            for (var a = 0, h = e.length; a < h; a++) {
                var u = e[a] * i,
                    l = a < h - 1 ? e[a + 1] * i : t.length;
                s -= Math.abs(z(t, u, l, i))
            }
        var c = 0;
        for (a = 0; a < r.length; a += 3) {
            var d = r[a] * i,
                p = r[a + 1] * i,
                f = r[a + 2] * i;
            c += Math.abs((t[d] - t[f]) * (t[p + 1] - t[d + 1]) - (t[d] - t[p]) * (t[f + 1] - t[d + 1]))
        }
        return 0 === s && 0 === c ? 0 : Math.abs((c - s) / s)
    }, b.flatten = function(t) {
        for (var e = t[0][0].length, i = {
                vertices: [],
                holes: [],
                dimensions: e
            }, r = 0, n = 0; n < t.length; n++) {
            for (var o = 0; o < t[n].length; o++)
                for (var s = 0; s < e; s++) i.vertices.push(t[n][o][s]);
            n > 0 && (r += t[n - 1].length, i.holes.push(r))
        }
        return i
    }, y.default = _;
    var W = i(function(t, i) {
            ! function(r) {
                var n = i && !i.nodeType && i,
                    o = t && !t.nodeType && t,
                    s = "object" == typeof e && e;
                s.global !== s && s.window !== s && s.self !== s || (r = s);
                var a, h, u = 2147483647,
                    l = 36,
                    c = 1,
                    d = 26,
                    p = 38,
                    f = 700,
                    m = 72,
                    g = 128,
                    v = "-",
                    y = /^xn--/,
                    _ = /[^\x20-\x7E]/,
                    b = /[\x2E\u3002\uFF0E\uFF61]/g,
                    x = {
                        overflow: "Overflow: input needs wider integers to process",
                        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                        "invalid-input": "Invalid input"
                    },
                    w = l - c,
                    T = Math.floor,
                    S = String.fromCharCode;

                function E(t) {
                    throw RangeError(x[t])
                }

                function P(t, e) {
                    for (var i = t.length, r = []; i--;) r[i] = e(t[i]);
                    return r
                }

                function I(t, e) {
                    var i = t.split("@"),
                        r = "";
                    return i.length > 1 && (r = i[0] + "@", t = i[1]), r + P((t = t.replace(b, ".")).split("."), e).join(".")
                }

                function C(t) {
                    for (var e, i, r = [], n = 0, o = t.length; n < o;)(e = t.charCodeAt(n++)) >= 55296 && e <= 56319 && n < o ? 56320 == (64512 & (i = t.charCodeAt(n++))) ? r.push(((1023 & e) << 10) + (1023 & i) + 65536) : (r.push(e), n--) : r.push(e);
                    return r
                }

                function A(t) {
                    return P(t, function(t) {
                        var e = "";
                        return t > 65535 && (e += S((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e + S(t)
                    }).join("")
                }

                function M(t, e) {
                    return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
                }

                function O(t, e, i) {
                    var r = 0;
                    for (t = i ? T(t / f) : t >> 1, t += T(t / e); t > w * d >> 1; r += l) t = T(t / w);
                    return T(r + (w + 1) * t / (t + p))
                }

                function R(t) {
                    var e, i, r, n, o, s, a, h, p, f, y, _ = [],
                        b = t.length,
                        x = 0,
                        w = g,
                        S = m;
                    for ((i = t.lastIndexOf(v)) < 0 && (i = 0), r = 0; r < i; ++r) t.charCodeAt(r) >= 128 && E("not-basic"), _.push(t.charCodeAt(r));
                    for (n = i > 0 ? i + 1 : 0; n < b;) {
                        for (o = x, s = 1, a = l; n >= b && E("invalid-input"), ((h = (y = t.charCodeAt(n++)) - 48 < 10 ? y - 22 : y - 65 < 26 ? y - 65 : y - 97 < 26 ? y - 97 : l) >= l || h > T((u - x) / s)) && E("overflow"), x += h * s, !(h < (p = a <= S ? c : a >= S + d ? d : a - S)); a += l) s > T(u / (f = l - p)) && E("overflow"), s *= f;
                        S = O(x - o, e = _.length + 1, 0 == o), T(x / e) > u - w && E("overflow"), w += T(x / e), x %= e, _.splice(x++, 0, w)
                    }
                    return A(_)
                }

                function D(t) {
                    var e, i, r, n, o, s, a, h, p, f, y, _, b, x, w, P = [];
                    for (_ = (t = C(t)).length, e = g, i = 0, o = m, s = 0; s < _; ++s)(y = t[s]) < 128 && P.push(S(y));
                    for (r = n = P.length, n && P.push(v); r < _;) {
                        for (a = u, s = 0; s < _; ++s)(y = t[s]) >= e && y < a && (a = y);
                        for (a - e > T((u - i) / (b = r + 1)) && E("overflow"), i += (a - e) * b, e = a, s = 0; s < _; ++s)
                            if ((y = t[s]) < e && ++i > u && E("overflow"), y == e) {
                                for (h = i, p = l; !(h < (f = p <= o ? c : p >= o + d ? d : p - o)); p += l) w = h - f, x = l - f, P.push(S(M(f + w % x, 0))), h = T(w / x);
                                P.push(S(M(h, 0))), o = O(i, b, r == n), i = 0, ++r
                            }++i, ++e
                    }
                    return P.join("")
                }
                if (a = {
                        version: "1.3.2",
                        ucs2: {
                            decode: C,
                            encode: A
                        },
                        decode: R,
                        encode: D,
                        toASCII: function(t) {
                            return I(t, function(t) {
                                return _.test(t) ? "xn--" + D(t) : t
                            })
                        },
                        toUnicode: function(t) {
                            return I(t, function(t) {
                                return y.test(t) ? R(t.slice(4).toLowerCase()) : t
                            })
                        }
                    }, n && o)
                    if (t.exports == n) o.exports = a;
                    else
                        for (h in a) a.hasOwnProperty(h) && (n[h] = a[h]);
                else r.punycode = a
            }(e)
        }),
        Y = {
            isString: function(t) {
                return "string" == typeof t
            },
            isObject: function(t) {
                return "object" == typeof t && null !== t
            },
            isNull: function(t) {
                return null === t
            },
            isNullOrUndefined: function(t) {
                return null == t
            }
        };

    function q(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    Y.isString, Y.isObject, Y.isNull, Y.isNullOrUndefined;
    var K = function(t, e, i, r) {
            e = e || "&", i = i || "=";
            var n = {};
            if ("string" != typeof t || 0 === t.length) return n;
            var o = /\+/g;
            t = t.split(e);
            var s = 1e3;
            r && "number" == typeof r.maxKeys && (s = r.maxKeys);
            var a = t.length;
            s > 0 && a > s && (a = s);
            for (var h = 0; h < a; ++h) {
                var u, l, c, d, p = t[h].replace(o, "%20"),
                    f = p.indexOf(i);
                f >= 0 ? (u = p.substr(0, f), l = p.substr(f + 1)) : (u = p, l = ""), c = decodeURIComponent(u), d = decodeURIComponent(l), q(n, c) ? Array.isArray(n[c]) ? n[c].push(d) : n[c] = [n[c], d] : n[c] = d
            }
            return n
        },
        Z = function(t) {
            switch (typeof t) {
                case "string":
                    return t;
                case "boolean":
                    return t ? "true" : "false";
                case "number":
                    return isFinite(t) ? t : "";
                default:
                    return ""
            }
        },
        J = function(t, e, i, r) {
            return e = e || "&", i = i || "=", null === t && (t = void 0), "object" == typeof t ? Object.keys(t).map(function(r) {
                var n = encodeURIComponent(Z(r)) + i;
                return Array.isArray(t[r]) ? t[r].map(function(t) {
                    return n + encodeURIComponent(Z(t))
                }).join(e) : n + encodeURIComponent(Z(t[r]))
            }).join(e) : r ? encodeURIComponent(Z(r)) + i + encodeURIComponent(Z(t)) : ""
        },
        Q = i(function(t, e) {
            e.decode = e.parse = K, e.encode = e.stringify = J
        }),
        $ = (Q.decode, Q.parse, Q.encode, Q.stringify, ft),
        tt = et;

    function et() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
    }
    var it = /^([a-z0-9.+-]+:)/i,
        rt = /:[0-9]*$/,
        nt = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        ot = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
        st = ["'"].concat(ot),
        at = ["%", "/", "?", ";", "#"].concat(st),
        ht = ["/", "?", "#"],
        ut = /^[+a-z0-9A-Z_-]{0,63}$/,
        lt = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        ct = {
            javascript: !0,
            "javascript:": !0
        },
        dt = {
            javascript: !0,
            "javascript:": !0
        },
        pt = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
        };

    function ft(t, e, i) {
        if (t && Y.isObject(t) && t instanceof et) return t;
        var r = new et;
        return r.parse(t, e, i), r
    }
    et.prototype.parse = function(t, e, i) {
        if (!Y.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
        var r = t.indexOf("?"),
            n = -1 !== r && r < t.indexOf("#") ? "?" : "#",
            o = t.split(n);
        o[0] = o[0].replace(/\\/g, "/");
        var s = t = o.join(n);
        if (s = s.trim(), !i && 1 === t.split("#").length) {
            var a = nt.exec(s);
            if (a) return this.path = s, this.href = s, this.pathname = a[1], a[2] ? (this.search = a[2], this.query = e ? Q.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {}), this
        }
        var h = it.exec(s);
        if (h) {
            var u = (h = h[0]).toLowerCase();
            this.protocol = u, s = s.substr(h.length)
        }
        if (i || h || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var l = "//" === s.substr(0, 2);
            !l || h && dt[h] || (s = s.substr(2), this.slashes = !0)
        }
        if (!dt[h] && (l || h && !pt[h])) {
            for (var c, d, p = -1, f = 0; f < ht.length; f++) - 1 !== (m = s.indexOf(ht[f])) && (-1 === p || m < p) && (p = m);
            for (-1 !== (d = -1 === p ? s.lastIndexOf("@") : s.lastIndexOf("@", p)) && (c = s.slice(0, d), s = s.slice(d + 1), this.auth = decodeURIComponent(c)), p = -1, f = 0; f < at.length; f++) {
                var m; - 1 !== (m = s.indexOf(at[f])) && (-1 === p || m < p) && (p = m)
            } - 1 === p && (p = s.length), this.host = s.slice(0, p), s = s.slice(p), this.parseHost(), this.hostname = this.hostname || "";
            var g = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!g)
                for (var v = this.hostname.split(/\./), y = (f = 0, v.length); f < y; f++) {
                    var _ = v[f];
                    if (_ && !_.match(ut)) {
                        for (var b = "", x = 0, w = _.length; x < w; x++) _.charCodeAt(x) > 127 ? b += "x" : b += _[x];
                        if (!b.match(ut)) {
                            var T = v.slice(0, f),
                                S = v.slice(f + 1),
                                E = _.match(lt);
                            E && (T.push(E[1]), S.unshift(E[2])), S.length && (s = "/" + S.join(".") + s), this.hostname = T.join(".");
                            break
                        }
                    }
                }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), g || (this.hostname = W.toASCII(this.hostname));
            var P = this.port ? ":" + this.port : "",
                I = this.hostname || "";
            this.host = I + P, this.href += this.host, g && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== s[0] && (s = "/" + s))
        }
        if (!ct[u])
            for (f = 0, y = st.length; f < y; f++) {
                var C = st[f];
                if (-1 !== s.indexOf(C)) {
                    var A = encodeURIComponent(C);
                    A === C && (A = escape(C)), s = s.split(C).join(A)
                }
            }
        var M = s.indexOf("#"); - 1 !== M && (this.hash = s.substr(M), s = s.slice(0, M));
        var O = s.indexOf("?");
        if (-1 !== O ? (this.search = s.substr(O), this.query = s.substr(O + 1), e && (this.query = Q.parse(this.query)), s = s.slice(0, O)) : e && (this.search = "", this.query = {}), s && (this.pathname = s), pt[u] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
            P = this.pathname || "";
            var R = this.search || "";
            this.path = P + R
        }
        return this.href = this.format(), this
    }, et.prototype.format = function() {
        var t = this.auth || "";
        t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
        var e = this.protocol || "",
            i = this.pathname || "",
            r = this.hash || "",
            n = !1,
            o = "";
        this.host ? n = t + this.host : this.hostname && (n = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)), this.query && Y.isObject(this.query) && Object.keys(this.query).length && (o = Q.stringify(this.query));
        var s = this.search || o && "?" + o || "";
        return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || pt[e]) && !1 !== n ? (n = "//" + (n || ""), i && "/" !== i.charAt(0) && (i = "/" + i)) : n || (n = ""), r && "#" !== r.charAt(0) && (r = "#" + r), s && "?" !== s.charAt(0) && (s = "?" + s), e + n + (i = i.replace(/[?#]/g, function(t) {
            return encodeURIComponent(t)
        })) + (s = s.replace("#", "%23")) + r
    }, et.prototype.resolve = function(t) {
        return this.resolveObject(ft(t, !1, !0)).format()
    }, et.prototype.resolveObject = function(t) {
        if (Y.isString(t)) {
            var e = new et;
            e.parse(t, !1, !0), t = e
        }
        for (var i = new et, r = Object.keys(this), n = 0; n < r.length; n++) {
            var o = r[n];
            i[o] = this[o]
        }
        if (i.hash = t.hash, "" === t.href) return i.href = i.format(), i;
        if (t.slashes && !t.protocol) {
            for (var s = Object.keys(t), a = 0; a < s.length; a++) {
                var h = s[a];
                "protocol" !== h && (i[h] = t[h])
            }
            return pt[i.protocol] && i.hostname && !i.pathname && (i.path = i.pathname = "/"), i.href = i.format(), i
        }
        if (t.protocol && t.protocol !== i.protocol) {
            if (!pt[t.protocol]) {
                for (var u = Object.keys(t), l = 0; l < u.length; l++) {
                    var c = u[l];
                    i[c] = t[c]
                }
                return i.href = i.format(), i
            }
            if (i.protocol = t.protocol, t.host || dt[t.protocol]) i.pathname = t.pathname;
            else {
                for (var d = (t.pathname || "").split("/"); d.length && !(t.host = d.shift()););
                t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), i.pathname = d.join("/")
            }
            if (i.search = t.search, i.query = t.query, i.host = t.host || "", i.auth = t.auth, i.hostname = t.hostname || t.host, i.port = t.port, i.pathname || i.search) {
                var p = i.pathname || "",
                    f = i.search || "";
                i.path = p + f
            }
            return i.slashes = i.slashes || t.slashes, i.href = i.format(), i
        }
        var m = i.pathname && "/" === i.pathname.charAt(0),
            g = t.host || t.pathname && "/" === t.pathname.charAt(0),
            v = g || m || i.host && t.pathname,
            y = v,
            _ = i.pathname && i.pathname.split("/") || [],
            b = (d = t.pathname && t.pathname.split("/") || [], i.protocol && !pt[i.protocol]);
        if (b && (i.hostname = "", i.port = null, i.host && ("" === _[0] ? _[0] = i.host : _.unshift(i.host)), i.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === d[0] ? d[0] = t.host : d.unshift(t.host)), t.host = null), v = v && ("" === d[0] || "" === _[0])), g) i.host = t.host || "" === t.host ? t.host : i.host, i.hostname = t.hostname || "" === t.hostname ? t.hostname : i.hostname, i.search = t.search, i.query = t.query, _ = d;
        else if (d.length) _ || (_ = []), _.pop(), _ = _.concat(d), i.search = t.search, i.query = t.query;
        else if (!Y.isNullOrUndefined(t.search)) return b && (i.hostname = i.host = _.shift(), (E = !!(i.host && i.host.indexOf("@") > 0) && i.host.split("@")) && (i.auth = E.shift(), i.host = i.hostname = E.shift())), i.search = t.search, i.query = t.query, Y.isNull(i.pathname) && Y.isNull(i.search) || (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")), i.href = i.format(), i;
        if (!_.length) return i.pathname = null, i.search ? i.path = "/" + i.search : i.path = null, i.href = i.format(), i;
        for (var x = _.slice(-1)[0], w = (i.host || t.host || _.length > 1) && ("." === x || ".." === x) || "" === x, T = 0, S = _.length; S >= 0; S--) "." === (x = _[S]) ? _.splice(S, 1) : ".." === x ? (_.splice(S, 1), T++) : T && (_.splice(S, 1), T--);
        if (!v && !y)
            for (; T--; T) _.unshift("..");
        !v || "" === _[0] || _[0] && "/" === _[0].charAt(0) || _.unshift(""), w && "/" !== _.join("/").substr(-1) && _.push("");
        var E, P = "" === _[0] || _[0] && "/" === _[0].charAt(0);
        return b && (i.hostname = i.host = P ? "" : _.length ? _.shift() : "", (E = !!(i.host && i.host.indexOf("@") > 0) && i.host.split("@")) && (i.auth = E.shift(), i.host = i.hostname = E.shift())), (v = v || i.host && _.length) && !P && _.unshift(""), _.length ? i.pathname = _.join("/") : (i.pathname = null, i.path = null), Y.isNull(i.pathname) && Y.isNull(i.search) || (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")), i.auth = t.auth || i.auth, i.slashes = i.slashes || t.slashes, i.href = i.format(), i
    }, et.prototype.parseHost = function() {
        var t = this.host,
            e = rt.exec(t);
        e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
    };
    var mt = {
            parse: $,
            resolve: function(t, e) {
                return ft(t, !1, !0).resolve(e)
            },
            resolveObject: function(t, e) {
                return t ? ft(t, !1, !0).resolveObject(e) : e
            },
            format: function(t) {
                return Y.isString(t) && (t = ft(t)), t instanceof et ? t.format() : et.prototype.format.call(t)
            },
            Url: tt
        },
        gt = {
            WEBGL_LEGACY: 0,
            WEBGL: 1,
            WEBGL2: 2
        },
        vt = {
            UNKNOWN: 0,
            WEBGL: 1,
            CANVAS: 2
        },
        yt = {
            NORMAL: 0,
            ADD: 1,
            MULTIPLY: 2,
            SCREEN: 3,
            OVERLAY: 4,
            DARKEN: 5,
            LIGHTEN: 6,
            COLOR_DODGE: 7,
            COLOR_BURN: 8,
            HARD_LIGHT: 9,
            SOFT_LIGHT: 10,
            DIFFERENCE: 11,
            EXCLUSION: 12,
            HUE: 13,
            SATURATION: 14,
            COLOR: 15,
            LUMINOSITY: 16,
            NORMAL_NPM: 17,
            ADD_NPM: 18,
            SCREEN_NPM: 19,
            NONE: 20,
            SRC_OVER: 0,
            SRC_IN: 21,
            SRC_OUT: 22,
            SRC_ATOP: 23,
            DST_OVER: 24,
            DST_IN: 25,
            DST_OUT: 26,
            DST_ATOP: 27,
            ERASE: 26,
            SUBTRACT: 28
        },
        _t = {
            POINTS: 0,
            LINES: 1,
            LINE_LOOP: 2,
            LINE_STRIP: 3,
            TRIANGLES: 4,
            TRIANGLE_STRIP: 5,
            TRIANGLE_FAN: 6
        },
        bt = {
            RGBA: 6408,
            RGB: 6407,
            ALPHA: 6406,
            LUMINANCE: 6409,
            LUMINANCE_ALPHA: 6410,
            DEPTH_COMPONENT: 6402,
            DEPTH_STENCIL: 34041
        },
        xt = {
            TEXTURE_2D: 3553,
            TEXTURE_CUBE_MAP: 34067,
            TEXTURE_2D_ARRAY: 35866,
            TEXTURE_CUBE_MAP_POSITIVE_X: 34069,
            TEXTURE_CUBE_MAP_NEGATIVE_X: 34070,
            TEXTURE_CUBE_MAP_POSITIVE_Y: 34071,
            TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072,
            TEXTURE_CUBE_MAP_POSITIVE_Z: 34073,
            TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074
        },
        wt = {
            UNSIGNED_BYTE: 5121,
            UNSIGNED_SHORT: 5123,
            UNSIGNED_SHORT_5_6_5: 33635,
            UNSIGNED_SHORT_4_4_4_4: 32819,
            UNSIGNED_SHORT_5_5_5_1: 32820,
            FLOAT: 5126,
            HALF_FLOAT: 36193
        },
        Tt = {
            LINEAR: 1,
            NEAREST: 0
        },
        St = {
            CLAMP: 33071,
            REPEAT: 10497,
            MIRRORED_REPEAT: 33648
        },
        Et = {
            OFF: 0,
            POW2: 1,
            ON: 2
        },
        Pt = {
            AUTO: 0,
            MANUAL: 1
        },
        It = {
            LOW: "lowp",
            MEDIUM: "mediump",
            HIGH: "highp"
        };
    g.RETINA_PREFIX = /@([0-9\.]+)x/, g.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !0;
    var Ct, At = !1,
        Mt = "5.1.5";

    function Ot(t) {
        if (!At) {
            if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                var e = ["\n %c %c %c PixiJS " + Mt + " - ✰ " + t + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
                window.console.log.apply(console, e)
            } else window.console && window.console.log("PixiJS " + Mt + " - " + t + " - http://www.pixijs.com/");
            At = !0
        }
    }

    function Rt() {
        return void 0 === Ct && (Ct = function() {
            var t = {
                stencil: !0,
                failIfMajorPerformanceCaveat: g.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
            };
            try {
                if (!window.WebGLRenderingContext) return !1;
                var e = document.createElement("canvas"),
                    i = e.getContext("webgl", t) || e.getContext("experimental-webgl", t),
                    r = !(!i || !i.getContextAttributes().stencil);
                if (i) {
                    var n = i.getExtension("WEBGL_lose_context");
                    n && n.loseContext()
                }
                return i = null, r
            } catch (t) {
                return !1
            }
        }()), Ct
    }

    function Dt(t, e) {
        return (e = e || [])[0] = (t >> 16 & 255) / 255, e[1] = (t >> 8 & 255) / 255, e[2] = (255 & t) / 255, e
    }

    function Ft(t) {
        return t = t.toString(16), "#" + ("000000".substr(0, 6 - t.length) + t)
    }

    function Lt(t) {
        return "string" == typeof t && "#" === t[0] && (t = t.substr(1)), parseInt(t, 16)
    }

    function Bt(t) {
        return (255 * t[0] << 16) + (255 * t[1] << 8) + (255 * t[2] | 0)
    }
    var kt = function() {
        for (var t = [], e = [], i = 0; i < 32; i++) t[i] = i, e[i] = i;
        t[yt.NORMAL_NPM] = yt.NORMAL, t[yt.ADD_NPM] = yt.ADD, t[yt.SCREEN_NPM] = yt.SCREEN, e[yt.NORMAL] = yt.NORMAL_NPM, e[yt.ADD] = yt.ADD_NPM, e[yt.SCREEN] = yt.SCREEN_NPM;
        var r = [];
        return r.push(e), r.push(t), r
    }();

    function Nt(t, e) {
        return kt[e ? 1 : 0][t]
    }

    function Ut(t, e, i, r) {
        return i = i || new Float32Array(4), r || void 0 === r ? (i[0] = t[0] * e, i[1] = t[1] * e, i[2] = t[2] * e) : (i[0] = t[0], i[1] = t[1], i[2] = t[2]), i[3] = e, i
    }

    function jt(t, e) {
        if (1 === e) return (255 * e << 24) + t;
        if (0 === e) return 0;
        var i = t >> 16 & 255,
            r = t >> 8 & 255,
            n = 255 & t;
        return (255 * e << 24) + ((i = i * e + .5 | 0) << 16) + ((r = r * e + .5 | 0) << 8) + (n * e + .5 | 0)
    }

    function Xt(t, e, i, r) {
        return (i = i || new Float32Array(4))[0] = (t >> 16 & 255) / 255, i[1] = (t >> 8 & 255) / 255, i[2] = (255 & t) / 255, (r || void 0 === r) && (i[0] *= e, i[1] *= e, i[2] *= e), i[3] = e, i
    }

    function Gt(t, e) {
        void 0 === e && (e = null);
        var i = 6 * t;
        if ((e = e || new Uint16Array(i)).length !== i) throw new Error("Out buffer length is incorrect, got " + e.length + " and expected " + i);
        for (var r = 0, n = 0; r < i; r += 6, n += 4) e[r + 0] = n + 0, e[r + 1] = n + 1, e[r + 2] = n + 2, e[r + 3] = n + 0, e[r + 4] = n + 2, e[r + 5] = n + 3;
        return e
    }

    function Vt(t, e, i) {
        var r, n = t.length;
        if (!(e >= n || 0 === i)) {
            var o = n - (i = e + i > n ? n - e : i);
            for (r = e; r < o; ++r) t[r] = t[r + i];
            t.length = o
        }
    }
    var Ht = 0;

    function zt() {
        return ++Ht
    }

    function Wt(t) {
        return 0 === t ? 0 : t < 0 ? -1 : 1
    }

    function Yt(t) {
        return t += 0 === t, --t, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, 1 + (t |= t >>> 16)
    }

    function qt(t) {
        return !(t & t - 1 || !t)
    }

    function Kt(t) {
        var e = (t > 65535) << 4,
            i = ((t >>>= e) > 255) << 3;
        return e |= i, e |= i = ((t >>>= i) > 15) << 2, (e |= i = ((t >>>= i) > 3) << 1) | (t >>>= i) >> 1
    }
    var Zt = {},
        Jt = Object.create(null),
        Qt = Object.create(null);

    function $t(t) {
        var e, i, r, n = t.width,
            o = t.height,
            s = t.getContext("2d"),
            a = s.getImageData(0, 0, n, o).data,
            h = a.length,
            u = {
                top: null,
                left: null,
                right: null,
                bottom: null
            },
            l = null;
        for (e = 0; e < h; e += 4) 0 !== a[e + 3] && (i = e / 4 % n, r = ~~(e / 4 / n), null === u.top && (u.top = r), null === u.left ? u.left = i : i < u.left && (u.left = i), null === u.right ? u.right = i + 1 : u.right < i && (u.right = i + 1), null === u.bottom ? u.bottom = r : u.bottom < r && (u.bottom = r));
        return null !== u.top && (n = u.right - u.left, o = u.bottom - u.top + 1, l = s.getImageData(u.left, u.top, n, o)), {
            height: o,
            width: n,
            data: l
        }
    }
    var te = function(t, e, i) {
            this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = i || g.RESOLUTION, this.resize(t, e)
        },
        ee = {
            width: {
                configurable: !0
            },
            height: {
                configurable: !0
            }
        };
    te.prototype.clear = function() {
        this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }, te.prototype.resize = function(t, e) {
        this.canvas.width = t * this.resolution, this.canvas.height = e * this.resolution
    }, te.prototype.destroy = function() {
        this.context = null, this.canvas = null
    }, ee.width.get = function() {
        return this.canvas.width
    }, ee.width.set = function(t) {
        this.canvas.width = t
    }, ee.height.get = function() {
        return this.canvas.height
    }, ee.height.set = function(t) {
        this.canvas.height = t
    }, Object.defineProperties(te.prototype, ee);
    var ie, re = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;

    function ne(t, e) {
        if (void 0 === e && (e = window.location), 0 === t.indexOf("data:")) return "";
        e = e || window.location, ie || (ie = document.createElement("a")), ie.href = t;
        var i = !(t = mt.parse(ie.href)).port && "" === e.port || t.port === e.port;
        return t.hostname === e.hostname && i && t.protocol === e.protocol ? "" : "anonymous"
    }

    function oe(t, e) {
        var i = g.RETINA_PREFIX.exec(t);
        return i ? parseFloat(i[1]) : void 0 !== e ? e : 1
    }
    var se = {};

    function ae(t, e, i) {
        if (void 0 === i && (i = 3), !se[e]) {
            var r = (new Error).stack;
            void 0 === r ? console.warn("PixiJS Deprecation Warning: ", e + "\nDeprecated since v" + t) : (r = r.split("\n").splice(i).join("\n"), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", e + "\nDeprecated since v" + t), console.warn(r), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", e + "\nDeprecated since v" + t), console.warn(r))), se[e] = !0
        }
    }
    var he = {
            BaseTextureCache: Qt,
            CanvasRenderTarget: te,
            DATA_URI: re,
            ProgramCache: Zt,
            TextureCache: Jt,
            clearTextureCache: function() {
                var t;
                for (t in Jt) delete Jt[t];
                for (t in Qt) delete Qt[t]
            },
            correctBlendMode: Nt,
            createIndicesForQuads: Gt,
            decomposeDataUri: function(t) {
                var e = re.exec(t);
                if (e) return {
                    mediaType: e[1] ? e[1].toLowerCase() : void 0,
                    subType: e[2] ? e[2].toLowerCase() : void 0,
                    charset: e[3] ? e[3].toLowerCase() : void 0,
                    encoding: e[4] ? e[4].toLowerCase() : void 0,
                    data: e[5]
                }
            },
            deprecation: ae,
            destroyTextureCache: function() {
                var t;
                for (t in Jt) Jt[t].destroy();
                for (t in Qt) Qt[t].destroy()
            },
            determineCrossOrigin: ne,
            getResolutionOfUrl: oe,
            hex2rgb: Dt,
            hex2string: Ft,
            isPow2: qt,
            isWebGLSupported: Rt,
            log2: Kt,
            nextPow2: Yt,
            premultiplyBlendMode: kt,
            premultiplyRgba: Ut,
            premultiplyTint: jt,
            premultiplyTintToRgba: Xt,
            removeItems: Vt,
            rgb2hex: Bt,
            sayHello: Ot,
            sign: Wt,
            skipHello: function() {
                At = !0
            },
            string2hex: Lt,
            trimCanvas: $t,
            uid: zt,
            isMobile: m,
            EventEmitter: v,
            earcut: y,
            url: mt
        },
        ue = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
        };
    ue.prototype.clone = function() {
        return new ue(this.x, this.y)
    }, ue.prototype.copyFrom = function(t) {
        return this.set(t.x, t.y), this
    }, ue.prototype.copyTo = function(t) {
        return t.set(this.x, this.y), t
    }, ue.prototype.equals = function(t) {
        return t.x === this.x && t.y === this.y
    }, ue.prototype.set = function(t, e) {
        this.x = t || 0, this.y = e || (0 !== e ? this.x : 0)
    };
    var le = function(t, e, i, r) {
            void 0 === i && (i = 0), void 0 === r && (r = 0), this._x = i, this._y = r, this.cb = t, this.scope = e
        },
        ce = {
            x: {
                configurable: !0
            },
            y: {
                configurable: !0
            }
        };
    le.prototype.clone = function(t, e) {
        void 0 === t && (t = null), void 0 === e && (e = null);
        var i = t || this.cb,
            r = e || this.scope;
        return new le(i, r, this._x, this._y)
    }, le.prototype.set = function(t, e) {
        var i = t || 0,
            r = e || (0 !== e ? i : 0);
        this._x === i && this._y === r || (this._x = i, this._y = r, this.cb.call(this.scope))
    }, le.prototype.copyFrom = function(t) {
        return this._x === t.x && this._y === t.y || (this._x = t.x, this._y = t.y, this.cb.call(this.scope)), this
    }, le.prototype.copyTo = function(t) {
        return t.set(this._x, this._y), t
    }, le.prototype.equals = function(t) {
        return t.x === this._x && t.y === this._y
    }, ce.x.get = function() {
        return this._x
    }, ce.x.set = function(t) {
        this._x !== t && (this._x = t, this.cb.call(this.scope))
    }, ce.y.get = function() {
        return this._y
    }, ce.y.set = function(t) {
        this._y !== t && (this._y = t, this.cb.call(this.scope))
    }, Object.defineProperties(le.prototype, ce);
    var de = 2 * Math.PI,
        pe = 180 / Math.PI,
        fe = Math.PI / 180,
        me = {
            POLY: 0,
            RECT: 1,
            CIRC: 2,
            ELIP: 3,
            RREC: 4
        },
        ge = function(t, e, i, r, n, o) {
            void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === r && (r = 1), void 0 === n && (n = 0), void 0 === o && (o = 0), this.a = t, this.b = e, this.c = i, this.d = r, this.tx = n, this.ty = o, this.array = null
        },
        ve = {
            IDENTITY: {
                configurable: !0
            },
            TEMP_MATRIX: {
                configurable: !0
            }
        };
    ge.prototype.fromArray = function(t) {
        this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5]
    }, ge.prototype.set = function(t, e, i, r, n, o) {
        return this.a = t, this.b = e, this.c = i, this.d = r, this.tx = n, this.ty = o, this
    }, ge.prototype.toArray = function(t, e) {
        this.array || (this.array = new Float32Array(9));
        var i = e || this.array;
        return t ? (i[0] = this.a, i[1] = this.b, i[2] = 0, i[3] = this.c, i[4] = this.d, i[5] = 0, i[6] = this.tx, i[7] = this.ty, i[8] = 1) : (i[0] = this.a, i[1] = this.c, i[2] = this.tx, i[3] = this.b, i[4] = this.d, i[5] = this.ty, i[6] = 0, i[7] = 0, i[8] = 1), i
    }, ge.prototype.apply = function(t, e) {
        e = e || new ue;
        var i = t.x,
            r = t.y;
        return e.x = this.a * i + this.c * r + this.tx, e.y = this.b * i + this.d * r + this.ty, e
    }, ge.prototype.applyInverse = function(t, e) {
        e = e || new ue;
        var i = 1 / (this.a * this.d + this.c * -this.b),
            r = t.x,
            n = t.y;
        return e.x = this.d * i * r + -this.c * i * n + (this.ty * this.c - this.tx * this.d) * i, e.y = this.a * i * n + -this.b * i * r + (-this.ty * this.a + this.tx * this.b) * i, e
    }, ge.prototype.translate = function(t, e) {
        return this.tx += t, this.ty += e, this
    }, ge.prototype.scale = function(t, e) {
        return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this
    }, ge.prototype.rotate = function(t) {
        var e = Math.cos(t),
            i = Math.sin(t),
            r = this.a,
            n = this.c,
            o = this.tx;
        return this.a = r * e - this.b * i, this.b = r * i + this.b * e, this.c = n * e - this.d * i, this.d = n * i + this.d * e, this.tx = o * e - this.ty * i, this.ty = o * i + this.ty * e, this
    }, ge.prototype.append = function(t) {
        var e = this.a,
            i = this.b,
            r = this.c,
            n = this.d;
        return this.a = t.a * e + t.b * r, this.b = t.a * i + t.b * n, this.c = t.c * e + t.d * r, this.d = t.c * i + t.d * n, this.tx = t.tx * e + t.ty * r + this.tx, this.ty = t.tx * i + t.ty * n + this.ty, this
    }, ge.prototype.setTransform = function(t, e, i, r, n, o, s, a, h) {
        return this.a = Math.cos(s + h) * n, this.b = Math.sin(s + h) * n, this.c = -Math.sin(s - a) * o, this.d = Math.cos(s - a) * o, this.tx = t - (i * this.a + r * this.c), this.ty = e - (i * this.b + r * this.d), this
    }, ge.prototype.prepend = function(t) {
        var e = this.tx;
        if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
            var i = this.a,
                r = this.c;
            this.a = i * t.a + this.b * t.c, this.b = i * t.b + this.b * t.d, this.c = r * t.a + this.d * t.c, this.d = r * t.b + this.d * t.d
        }
        return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this
    }, ge.prototype.decompose = function(t) {
        var e = this.a,
            i = this.b,
            r = this.c,
            n = this.d,
            o = -Math.atan2(-r, n),
            s = Math.atan2(i, e),
            a = Math.abs(o + s);
        return a < 1e-5 || Math.abs(de - a) < 1e-5 ? (t.rotation = s, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = o, t.skew.y = s), t.scale.x = Math.sqrt(e * e + i * i), t.scale.y = Math.sqrt(r * r + n * n), t.position.x = this.tx, t.position.y = this.ty, t
    }, ge.prototype.invert = function() {
        var t = this.a,
            e = this.b,
            i = this.c,
            r = this.d,
            n = this.tx,
            o = t * r - e * i;
        return this.a = r / o, this.b = -e / o, this.c = -i / o, this.d = t / o, this.tx = (i * this.ty - r * n) / o, this.ty = -(t * this.ty - e * n) / o, this
    }, ge.prototype.identity = function() {
        return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this
    }, ge.prototype.clone = function() {
        var t = new ge;
        return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t
    }, ge.prototype.copyTo = function(t) {
        return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t
    }, ge.prototype.copyFrom = function(t) {
        return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this
    }, ve.IDENTITY.get = function() {
        return new ge
    }, ve.TEMP_MATRIX.get = function() {
        return new ge
    }, Object.defineProperties(ge, ve);
    var ye = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
        _e = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
        be = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
        xe = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
        we = [],
        Te = [],
        Se = Math.sign;
    ! function() {
        for (var t = 0; t < 16; t++) {
            var e = [];
            we.push(e);
            for (var i = 0; i < 16; i++)
                for (var r = Se(ye[t] * ye[i] + be[t] * _e[i]), n = Se(_e[t] * ye[i] + xe[t] * _e[i]), o = Se(ye[t] * be[i] + be[t] * xe[i]), s = Se(_e[t] * be[i] + xe[t] * xe[i]), a = 0; a < 16; a++)
                    if (ye[a] === r && _e[a] === n && be[a] === o && xe[a] === s) {
                        e.push(a);
                        break
                    }
        }
        for (var h = 0; h < 16; h++) {
            var u = new ge;
            u.set(ye[h], _e[h], be[h], xe[h], 0, 0), Te.push(u)
        }
    }();
    var Ee = {
            E: 0,
            SE: 1,
            S: 2,
            SW: 3,
            W: 4,
            NW: 5,
            N: 6,
            NE: 7,
            MIRROR_VERTICAL: 8,
            MAIN_DIAGONAL: 10,
            MIRROR_HORIZONTAL: 12,
            REVERSE_DIAGONAL: 14,
            uX: function(t) {
                return ye[t]
            },
            uY: function(t) {
                return _e[t]
            },
            vX: function(t) {
                return be[t]
            },
            vY: function(t) {
                return xe[t]
            },
            inv: function(t) {
                return 8 & t ? 15 & t : 7 & -t
            },
            add: function(t, e) {
                return we[t][e]
            },
            sub: function(t, e) {
                return we[t][Ee.inv(e)]
            },
            rotate180: function(t) {
                return 4 ^ t
            },
            isVertical: function(t) {
                return 2 == (3 & t)
            },
            byDirection: function(t, e) {
                return 2 * Math.abs(t) <= Math.abs(e) ? e >= 0 ? Ee.S : Ee.N : 2 * Math.abs(e) <= Math.abs(t) ? t > 0 ? Ee.E : Ee.W : e > 0 ? t > 0 ? Ee.SE : Ee.SW : t > 0 ? Ee.NE : Ee.NW
            },
            matrixAppendRotationInv: function(t, e, i, r) {
                void 0 === i && (i = 0), void 0 === r && (r = 0);
                var n = Te[Ee.inv(e)];
                n.tx = i, n.ty = r, t.append(n)
            }
        },
        Pe = function() {
            this.worldTransform = new ge, this.localTransform = new ge, this.position = new le(this.onChange, this, 0, 0), this.scale = new le(this.onChange, this, 1, 1), this.pivot = new le(this.onChange, this, 0, 0), this.skew = new le(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0
        },
        Ie = {
            rotation: {
                configurable: !0
            }
        };
    Pe.prototype.onChange = function() {
        this._localID++
    }, Pe.prototype.updateSkew = function() {
        this._cx = Math.cos(this._rotation + this.skew._y), this._sx = Math.sin(this._rotation + this.skew._y), this._cy = -Math.sin(this._rotation - this.skew._x), this._sy = Math.cos(this._rotation - this.skew._x), this._localID++
    }, Pe.prototype.updateLocalTransform = function() {
        var t = this.localTransform;
        this._localID !== this._currentLocalID && (t.a = this._cx * this.scale._x, t.b = this._sx * this.scale._x, t.c = this._cy * this.scale._y, t.d = this._sy * this.scale._y, t.tx = this.position._x - (this.pivot._x * t.a + this.pivot._y * t.c), t.ty = this.position._y - (this.pivot._x * t.b + this.pivot._y * t.d), this._currentLocalID = this._localID, this._parentID = -1)
    }, Pe.prototype.updateTransform = function(t) {
        var e = this.localTransform;
        if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale._x, e.b = this._sx * this.scale._x, e.c = this._cy * this.scale._y, e.d = this._sy * this.scale._y, e.tx = this.position._x - (this.pivot._x * e.a + this.pivot._y * e.c), e.ty = this.position._y - (this.pivot._x * e.b + this.pivot._y * e.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== t._worldID) {
            var i = t.worldTransform,
                r = this.worldTransform;
            r.a = e.a * i.a + e.b * i.c, r.b = e.a * i.b + e.b * i.d, r.c = e.c * i.a + e.d * i.c, r.d = e.c * i.b + e.d * i.d, r.tx = e.tx * i.a + e.ty * i.c + i.tx, r.ty = e.tx * i.b + e.ty * i.d + i.ty, this._parentID = t._worldID, this._worldID++
        }
    }, Pe.prototype.setFromMatrix = function(t) {
        t.decompose(this), this._localID++
    }, Ie.rotation.get = function() {
        return this._rotation
    }, Ie.rotation.set = function(t) {
        this._rotation !== t && (this._rotation = t, this.updateSkew())
    }, Object.defineProperties(Pe.prototype, Ie), Pe.IDENTITY = new Pe;
    var Ce = function(t, e, i, r) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === r && (r = 0), this.x = Number(t), this.y = Number(e), this.width = Number(i), this.height = Number(r), this.type = me.RECT
        },
        Ae = {
            left: {
                configurable: !0
            },
            right: {
                configurable: !0
            },
            top: {
                configurable: !0
            },
            bottom: {
                configurable: !0
            }
        },
        Me = {
            EMPTY: {
                configurable: !0
            }
        };
    Ae.left.get = function() {
        return this.x
    }, Ae.right.get = function() {
        return this.x + this.width
    }, Ae.top.get = function() {
        return this.y
    }, Ae.bottom.get = function() {
        return this.y + this.height
    }, Me.EMPTY.get = function() {
        return new Ce(0, 0, 0, 0)
    }, Ce.prototype.clone = function() {
        return new Ce(this.x, this.y, this.width, this.height)
    }, Ce.prototype.copyFrom = function(t) {
        return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this
    }, Ce.prototype.copyTo = function(t) {
        return t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t
    }, Ce.prototype.contains = function(t, e) {
        return !(this.width <= 0 || this.height <= 0) && t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height
    }, Ce.prototype.pad = function(t, e) {
        t = t || 0, e = e || (0 !== e ? t : 0), this.x -= t, this.y -= e, this.width += 2 * t, this.height += 2 * e
    }, Ce.prototype.fit = function(t) {
        var e = Math.max(this.x, t.x),
            i = Math.min(this.x + this.width, t.x + t.width),
            r = Math.max(this.y, t.y),
            n = Math.min(this.y + this.height, t.y + t.height);
        this.x = e, this.width = Math.max(i - e, 0), this.y = r, this.height = Math.max(n - r, 0)
    }, Ce.prototype.ceil = function(t, e) {
        void 0 === t && (t = 1), void 0 === e && (e = .001);
        var i = Math.ceil((this.x + this.width - e) * t) / t,
            r = Math.ceil((this.y + this.height - e) * t) / t;
        this.x = Math.floor((this.x + e) * t) / t, this.y = Math.floor((this.y + e) * t) / t, this.width = i - this.x, this.height = r - this.y
    }, Ce.prototype.enlarge = function(t) {
        var e = Math.min(this.x, t.x),
            i = Math.max(this.x + this.width, t.x + t.width),
            r = Math.min(this.y, t.y),
            n = Math.max(this.y + this.height, t.y + t.height);
        this.x = e, this.width = i - e, this.y = r, this.height = n - r
    }, Object.defineProperties(Ce.prototype, Ae), Object.defineProperties(Ce, Me);
    var Oe = function(t, e, i) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), this.x = t, this.y = e, this.radius = i, this.type = me.CIRC
    };
    Oe.prototype.clone = function() {
        return new Oe(this.x, this.y, this.radius)
    }, Oe.prototype.contains = function(t, e) {
        if (this.radius <= 0) return !1;
        var i = this.radius * this.radius,
            r = this.x - t,
            n = this.y - e;
        return (r *= r) + (n *= n) <= i
    }, Oe.prototype.getBounds = function() {
        return new Ce(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
    };
    var Re = function(t, e, i, r) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === r && (r = 0), this.x = t, this.y = e, this.width = i, this.height = r, this.type = me.ELIP
    };
    Re.prototype.clone = function() {
        return new Re(this.x, this.y, this.width, this.height)
    }, Re.prototype.contains = function(t, e) {
        if (this.width <= 0 || this.height <= 0) return !1;
        var i = (t - this.x) / this.width,
            r = (e - this.y) / this.height;
        return (i *= i) + (r *= r) <= 1
    }, Re.prototype.getBounds = function() {
        return new Ce(this.x - this.width, this.y - this.height, this.width, this.height)
    };
    var De = function() {
        for (var t = arguments, e = [], i = arguments.length; i--;) e[i] = t[i];
        if (Array.isArray(e[0]) && (e = e[0]), e[0] instanceof ue) {
            for (var r = [], n = 0, o = e.length; n < o; n++) r.push(e[n].x, e[n].y);
            e = r
        }
        this.points = e, this.type = me.POLY, this.closeStroke = !0
    };
    De.prototype.clone = function() {
        var t = new De(this.points.slice());
        return t.closeStroke = this.closeStroke, t
    }, De.prototype.contains = function(t, e) {
        for (var i = !1, r = this.points.length / 2, n = 0, o = r - 1; n < r; o = n++) {
            var s = this.points[2 * n],
                a = this.points[2 * n + 1],
                h = this.points[2 * o],
                u = this.points[2 * o + 1];
            a > e != u > e && t < (e - a) / (u - a) * (h - s) + s && (i = !i)
        }
        return i
    };
    var Fe = function(t, e, i, r, n) {
        void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === r && (r = 0), void 0 === n && (n = 20), this.x = t, this.y = e, this.width = i, this.height = r, this.radius = n, this.type = me.RREC
    };
    Fe.prototype.clone = function() {
        return new Fe(this.x, this.y, this.width, this.height, this.radius)
    }, Fe.prototype.contains = function(t, e) {
        if (this.width <= 0 || this.height <= 0) return !1;
        if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
            if (e >= this.y + this.radius && e <= this.y + this.height - this.radius || t >= this.x + this.radius && t <= this.x + this.width - this.radius) return !0;
            var i = t - (this.x + this.radius),
                r = e - (this.y + this.radius),
                n = this.radius * this.radius;
            if (i * i + r * r <= n) return !0;
            if ((i = t - (this.x + this.width - this.radius)) * i + r * r <= n) return !0;
            if (i * i + (r = e - (this.y + this.height - this.radius)) * r <= n) return !0;
            if ((i = t - (this.x + this.radius)) * i + r * r <= n) return !0
        }
        return !1
    }, g.SORTABLE_CHILDREN = !1;
    var Le = function() {
        this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null
    };
    Le.prototype.isEmpty = function() {
        return this.minX > this.maxX || this.minY > this.maxY
    }, Le.prototype.clear = function() {
        this.updateID++, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0
    }, Le.prototype.getRectangle = function(t) {
        return this.minX > this.maxX || this.minY > this.maxY ? Ce.EMPTY : ((t = t || new Ce(0, 0, 1, 1)).x = this.minX, t.y = this.minY, t.width = this.maxX - this.minX, t.height = this.maxY - this.minY, t)
    }, Le.prototype.addPoint = function(t) {
        this.minX = Math.min(this.minX, t.x), this.maxX = Math.max(this.maxX, t.x), this.minY = Math.min(this.minY, t.y), this.maxY = Math.max(this.maxY, t.y)
    }, Le.prototype.addQuad = function(t) {
        var e = this.minX,
            i = this.minY,
            r = this.maxX,
            n = this.maxY,
            o = t[0],
            s = t[1];
        e = o < e ? o : e, i = s < i ? s : i, r = o > r ? o : r, n = s > n ? s : n, e = (o = t[2]) < e ? o : e, i = (s = t[3]) < i ? s : i, r = o > r ? o : r, n = s > n ? s : n, e = (o = t[4]) < e ? o : e, i = (s = t[5]) < i ? s : i, r = o > r ? o : r, n = s > n ? s : n, e = (o = t[6]) < e ? o : e, i = (s = t[7]) < i ? s : i, r = o > r ? o : r, n = s > n ? s : n, this.minX = e, this.minY = i, this.maxX = r, this.maxY = n
    }, Le.prototype.addFrame = function(t, e, i, r, n) {
        var o = t.worldTransform,
            s = o.a,
            a = o.b,
            h = o.c,
            u = o.d,
            l = o.tx,
            c = o.ty,
            d = this.minX,
            p = this.minY,
            f = this.maxX,
            m = this.maxY,
            g = s * e + h * i + l,
            v = a * e + u * i + c;
        d = g < d ? g : d, p = v < p ? v : p, f = g > f ? g : f, m = v > m ? v : m, d = (g = s * r + h * i + l) < d ? g : d, p = (v = a * r + u * i + c) < p ? v : p, f = g > f ? g : f, m = v > m ? v : m, d = (g = s * e + h * n + l) < d ? g : d, p = (v = a * e + u * n + c) < p ? v : p, f = g > f ? g : f, m = v > m ? v : m, d = (g = s * r + h * n + l) < d ? g : d, p = (v = a * r + u * n + c) < p ? v : p, f = g > f ? g : f, m = v > m ? v : m, this.minX = d, this.minY = p, this.maxX = f, this.maxY = m
    }, Le.prototype.addVertexData = function(t, e, i) {
        for (var r = this.minX, n = this.minY, o = this.maxX, s = this.maxY, a = e; a < i; a += 2) {
            var h = t[a],
                u = t[a + 1];
            r = h < r ? h : r, n = u < n ? u : n, o = h > o ? h : o, s = u > s ? u : s
        }
        this.minX = r, this.minY = n, this.maxX = o, this.maxY = s
    }, Le.prototype.addVertices = function(t, e, i, r) {
        for (var n = t.worldTransform, o = n.a, s = n.b, a = n.c, h = n.d, u = n.tx, l = n.ty, c = this.minX, d = this.minY, p = this.maxX, f = this.maxY, m = i; m < r; m += 2) {
            var g = e[m],
                v = e[m + 1],
                y = o * g + a * v + u,
                _ = h * v + s * g + l;
            c = y < c ? y : c, d = _ < d ? _ : d, p = y > p ? y : p, f = _ > f ? _ : f
        }
        this.minX = c, this.minY = d, this.maxX = p, this.maxY = f
    }, Le.prototype.addBounds = function(t) {
        var e = this.minX,
            i = this.minY,
            r = this.maxX,
            n = this.maxY;
        this.minX = t.minX < e ? t.minX : e, this.minY = t.minY < i ? t.minY : i, this.maxX = t.maxX > r ? t.maxX : r, this.maxY = t.maxY > n ? t.maxY : n
    }, Le.prototype.addBoundsMask = function(t, e) {
        var i = t.minX > e.minX ? t.minX : e.minX,
            r = t.minY > e.minY ? t.minY : e.minY,
            n = t.maxX < e.maxX ? t.maxX : e.maxX,
            o = t.maxY < e.maxY ? t.maxY : e.maxY;
        if (i <= n && r <= o) {
            var s = this.minX,
                a = this.minY,
                h = this.maxX,
                u = this.maxY;
            this.minX = i < s ? i : s, this.minY = r < a ? r : a, this.maxX = n > h ? n : h, this.maxY = o > u ? o : u
        }
    }, Le.prototype.addBoundsArea = function(t, e) {
        var i = t.minX > e.x ? t.minX : e.x,
            r = t.minY > e.y ? t.minY : e.y,
            n = t.maxX < e.x + e.width ? t.maxX : e.x + e.width,
            o = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
        if (i <= n && r <= o) {
            var s = this.minX,
                a = this.minY,
                h = this.maxX,
                u = this.maxY;
            this.minX = i < s ? i : s, this.minY = r < a ? r : a, this.maxX = n > h ? n : h, this.maxY = o > u ? o : u
        }
    };
    var Be = function(t) {
        function e() {
            t.call(this), this.tempDisplayObjectParent = null, this.transform = new Pe, this.alpha = 1, this.visible = !0, this.renderable = !0, this.parent = null, this.worldAlpha = 1, this._lastSortedIndex = 0, this._zIndex = 0, this.filterArea = null, this.filters = null, this._enabledFilters = null, this._bounds = new Le, this._boundsID = 0, this._lastBoundsID = -1, this._boundsRect = null, this._localBoundsRect = null, this._mask = null, this._destroyed = !1, this.isSprite = !1
        }
        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var i = {
            _tempDisplayObjectParent: {
                configurable: !0
            },
            x: {
                configurable: !0
            },
            y: {
                configurable: !0
            },
            worldTransform: {
                configurable: !0
            },
            localTransform: {
                configurable: !0
            },
            position: {
                configurable: !0
            },
            scale: {
                configurable: !0
            },
            pivot: {
                configurable: !0
            },
            skew: {
                configurable: !0
            },
            rotation: {
                configurable: !0
            },
            angle: {
                configurable: !0
            },
            zIndex: {
                configurable: !0
            },
            worldVisible: {
                configurable: !0
            },
            mask: {
                configurable: !0
            }
        };
        return e.mixin = function(t) {
            for (var i = Object.keys(t), r = 0; r < i.length; ++r) {
                var n = i[r];
                Object.defineProperty(e.prototype, n, Object.getOwnPropertyDescriptor(t, n))
            }
        }, i._tempDisplayObjectParent.get = function() {
            return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new e), this.tempDisplayObjectParent
        }, e.prototype.updateTransform = function() {
            this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha, this._bounds.updateID++
        }, e.prototype._recursivePostUpdateTransform = function() {
            this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform)
        }, e.prototype.getBounds = function(t, e) {
            return t || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._boundsID !== this._lastBoundsID && (this.calculateBounds(), this._lastBoundsID = this._boundsID), e || (this._boundsRect || (this._boundsRect = new Ce), e = this._boundsRect), this._bounds.getRectangle(e)
        }, e.prototype.getLocalBounds = function(t) {
            var e = this.transform,
                i = this.parent;
            this.parent = null, this.transform = this._tempDisplayObjectParent.transform, t || (this._localBoundsRect || (this._localBoundsRect = new Ce), t = this._localBoundsRect);
            var r = this.getBounds(!1, t);
            return this.parent = i, this.transform = e, r
        }, e.prototype.toGlobal = function(t, e, i) {
            return void 0 === i && (i = !1), i || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(t, e)
        }, e.prototype.toLocal = function(t, e, i, r) {
            return e && (t = e.toGlobal(t, i, r)), r || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(t, i)
        }, e.prototype.render = function(t) {}, e.prototype.setParent = function(t) {
            if (!t || !t.addChild) throw new Error("setParent: Argument must be a Container");
            return t.addChild(this), t
        }, e.prototype.setTransform = function(t, e, i, r, n, o, s, a, h) {
            return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 1), void 0 === r && (r = 1), void 0 === n && (n = 0), void 0 === o && (o = 0), void 0 === s && (s = 0), void 0 === a && (a = 0), void 0 === h && (h = 0), this.position.x = t, this.position.y = e, this.scale.x = i || 1, this.scale.y = r || 1, this.rotation = n, this.skew.x = o, this.skew.y = s, this.pivot.x = a, this.pivot.y = h, this
        }, e.prototype.destroy = function() {
            this.removeAllListeners(), this.parent && this.parent.removeChild(this), this.transform = null, this.parent = null, this._bounds = null, this._currentBounds = null, this._mask = null, this.filterArea = null, this.interactive = !1, this.interactiveChildren = !1, this._destroyed = !0
        }, i.x.get = function() {
            return this.position.x
        }, i.x.set = function(t) {
            this.transform.position.x = t
        }, i.y.get = function() {
            return this.position.y
        }, i.y.set = function(t) {
            this.transform.position.y = t
        }, i.worldTransform.get = function() {
            return this.transform.worldTransform
        }, i.localTransform.get = function() {
            return this.transform.localTransform
        }, i.position.get = function() {
            return this.transform.position
        }, i.position.set = function(t) {
            this.transform.position.copyFrom(t)
        }, i.scale.get = function() {
            return this.transform.scale
        }, i.scale.set = function(t) {
            this.transform.scale.copyFrom(t)
        }, i.pivot.get = function() {
            return this.transform.pivot
        }, i.pivot.set = function(t) {
            this.transform.pivot.copyFrom(t)
        }, i.skew.get = function() {
            return this.transform.skew
        }, i.skew.set = function(t) {
            this.transform.skew.copyFrom(t)
        }, i.rotation.get = function() {
            return this.transform.rotation
        }, i.rotation.set = function(t) {
            this.transform.rotation = t
        }, i.angle.get = function() {
            return this.transform.rotation * pe
        }, i.angle.set = function(t) {
            this.transform.rotation = t * fe
        }, i.zIndex.get = function() {
            return this._zIndex
        }, i.zIndex.set = function(t) {
            this._zIndex = t, this.parent && (this.parent.sortDirty = !0)
        }, i.worldVisible.get = function() {
            var t = this;
            do {
                if (!t.visible) return !1;
                t = t.parent
            } while (t);
            return !0
        }, i.mask.get = function() {
            return this._mask
        }, i.mask.set = function(t) {
            this._mask && (this._mask.renderable = !0, this._mask.isMask = !1), this._mask = t, this._mask && (this._mask.renderable = !1, this._mask.isMask = !0)
        }, Object.defineProperties(e.prototype, i), e
    }(v);

    function ke(t, e) {
        return t.zIndex === e.zIndex ? t._lastSortedIndex - e._lastSortedIndex : t.zIndex - e.zIndex
    }
    Be.prototype.displayObjectUpdateTransform = Be.prototype.updateTransform;
    var Ne = function(t) {
        function e() {
            t.call(this), this.children = [], this.sortableChildren = g.SORTABLE_CHILDREN, this.sortDirty = !1
        }
        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var i = {
            width: {
                configurable: !0
            },
            height: {
                configurable: !0
            }
        };
        return e.prototype.onChildrenChange = function() {}, e.prototype.addChild = function(t) {
            var e = arguments,
                i = arguments.length;
            if (i > 1)
                for (var r = 0; r < i; r++) this.addChild(e[r]);
            else t.parent && t.parent.removeChild(t), t.parent = this, this.sortDirty = !0, t.transform._parentID = -1, this.children.push(t), this._boundsID++, this.onChildrenChange(this.children.length - 1), this.emit("childAdded", t, this, this.children.length - 1), t.emit("added", this);
            return t
        }, e.prototype.addChildAt = function(t, e) {
            if (e < 0 || e > this.children.length) throw new Error(t + "addChildAt: The index " + e + " supplied is out of bounds " + this.children.length);
            return t.parent && t.parent.removeChild(t), t.parent = this, this.sortDirty = !0, t.transform._parentID = -1, this.children.splice(e, 0, t), this._boundsID++, this.onChildrenChange(e), t.emit("added", this), this.emit("childAdded", t, this, e), t
        }, e.prototype.swapChildren = function(t, e) {
            if (t !== e) {
                var i = this.getChildIndex(t),
                    r = this.getChildIndex(e);
                this.children[i] = e, this.children[r] = t, this.onChildrenChange(i < r ? i : r)
            }
        }, e.prototype.getChildIndex = function(t) {
            var e = this.children.indexOf(t);
            if (-1 === e) throw new Error("The supplied DisplayObject must be a child of the caller");
            return e
        }, e.prototype.setChildIndex = function(t, e) {
            if (e < 0 || e >= this.children.length) throw new Error("The index " + e + " supplied is out of bounds " + this.children.length);
            var i = this.getChildIndex(t);
            Vt(this.children, i, 1), this.children.splice(e, 0, t), this.onChildrenChange(e)
        }, e.prototype.getChildAt = function(t) {
            if (t < 0 || t >= this.children.length) throw new Error("getChildAt: Index (" + t + ") does not exist.");
            return this.children[t]
        }, e.prototype.removeChild = function(t) {
            var e = arguments,
                i = arguments.length;
            if (i > 1)
                for (var r = 0; r < i; r++) this.removeChild(e[r]);
            else {
                var n = this.children.indexOf(t);
                if (-1 === n) return null;
                t.parent = null, t.transform._parentID = -1, Vt(this.children, n, 1), this._boundsID++, this.onChildrenChange(n), t.emit("removed", this), this.emit("childRemoved", t, this, n)
            }
            return t
        }, e.prototype.removeChildAt = function(t) {
            var e = this.getChildAt(t);
            return e.parent = null, e.transform._parentID = -1, Vt(this.children, t, 1), this._boundsID++, this.onChildrenChange(t), e.emit("removed", this), this.emit("childRemoved", e, this, t), e
        }, e.prototype.removeChildren = function(t, e) {
            void 0 === t && (t = 0);
            var i, r = t,
                n = "number" == typeof e ? e : this.children.length,
                o = n - r;
            if (o > 0 && o <= n) {
                i = this.children.splice(r, o);
                for (var s = 0; s < i.length; ++s) i[s].parent = null, i[s].transform && (i[s].transform._parentID = -1);
                this._boundsID++, this.onChildrenChange(t);
                for (var a = 0; a < i.length; ++a) i[a].emit("removed", this), this.emit("childRemoved", i[a], this, a);
                return i
            }
            if (0 === o && 0 === this.children.length) return [];
            throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
        }, e.prototype.sortChildren = function() {
            for (var t = !1, e = 0, i = this.children.length; e < i; ++e) {
                var r = this.children[e];
                r._lastSortedIndex = e, t || 0 === r.zIndex || (t = !0)
            }
            t && this.children.length > 1 && this.children.sort(ke), this.sortDirty = !1
        }, e.prototype.updateTransform = function() {
            this.sortableChildren && this.sortDirty && this.sortChildren(), this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
            for (var t = 0, e = this.children.length; t < e; ++t) {
                var i = this.children[t];
                i.visible && i.updateTransform()
            }
        }, e.prototype.calculateBounds = function() {
            this._bounds.clear(), this._calculateBounds();
            for (var t = 0; t < this.children.length; t++) {
                var e = this.children[t];
                e.visible && e.renderable && (e.calculateBounds(), e._mask ? (e._mask.calculateBounds(), this._bounds.addBoundsMask(e._bounds, e._mask._bounds)) : e.filterArea ? this._bounds.addBoundsArea(e._bounds, e.filterArea) : this._bounds.addBounds(e._bounds))
            }
            this._lastBoundsID = this._boundsID
        }, e.prototype._calculateBounds = function() {}, e.prototype.render = function(t) {
            if (this.visible && !(this.worldAlpha <= 0) && this.renderable)
                if (this._mask || this.filters && this.filters.length) this.renderAdvanced(t);
                else {
                    this._render(t);
                    for (var e = 0, i = this.children.length; e < i; ++e) this.children[e].render(t)
                }
        }, e.prototype.renderAdvanced = function(t) {
            t.batch.flush();
            var e = this.filters,
                i = this._mask;
            if (e) {
                this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
                for (var r = 0; r < e.length; r++) e[r].enabled && this._enabledFilters.push(e[r]);
                this._enabledFilters.length && t.filter.push(this, this._enabledFilters)
            }
            i && t.mask.push(this, this._mask), this._render(t);
            for (var n = 0, o = this.children.length; n < o; n++) this.children[n].render(t);
            t.batch.flush(), i && t.mask.pop(this, this._mask), e && this._enabledFilters && this._enabledFilters.length && t.filter.pop()
        }, e.prototype._render = function(t) {}, e.prototype.destroy = function(e) {
            t.prototype.destroy.call(this), this.sortDirty = !1;
            var i = "boolean" == typeof e ? e : e && e.children,
                r = this.removeChildren(0, this.children.length);
            if (i)
                for (var n = 0; n < r.length; ++n) r[n].destroy(e)
        }, i.width.get = function() {
            return this.scale.x * this.getLocalBounds().width
        }, i.width.set = function(t) {
            var e = this.getLocalBounds().width;
            this.scale.x = 0 !== e ? t / e : 1, this._width = t
        }, i.height.get = function() {
            return this.scale.y * this.getLocalBounds().height
        }, i.height.set = function(t) {
            var e = this.getLocalBounds().height;
            this.scale.y = 0 !== e ? t / e : 1, this._height = t
        }, Object.defineProperties(e.prototype, i), e
    }(Be);
    Ne.prototype.containerUpdateTransform = Ne.prototype.updateTransform;
    var Ue = {
        accessible: !1,
        accessibleTitle: null,
        accessibleHint: null,
        tabIndex: 0,
        _accessibleActive: !1,
        _accessibleDiv: !1
    };
    Be.mixin(Ue);
    var je = function(t) {
        this._hookDiv = null, (m.tablet || m.phone) && this.createTouchHook();
        var e = document.createElement("div");
        e.style.width = "100px", e.style.height = "100px", e.style.position = "absolute", e.style.top = "0px", e.style.left = "0px", e.style.zIndex = 2, this.div = e, this.pool = [], this.renderId = 0, this.debug = !1, this.renderer = t, this.children = [], this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this.isActive = !1, this.isMobileAccessibility = !1, window.addEventListener("keydown", this._onKeyDown, !1)
    };
    je.prototype.createTouchHook = function() {
        var t = this,
            e = document.createElement("button");
        e.style.width = "1px", e.style.height = "1px", e.style.position = "absolute", e.style.top = "-1000px", e.style.left = "-1000px", e.style.zIndex = 2, e.style.backgroundColor = "#FF0000", e.title = "HOOK DIV", e.addEventListener("focus", function() {
            t.isMobileAccessibility = !0, t.activate(), t.destroyTouchHook()
        }), document.body.appendChild(e), this._hookDiv = e
    }, je.prototype.destroyTouchHook = function() {
        this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null)
    }, je.prototype.activate = function() {
        this.isActive || (this.isActive = !0, window.document.addEventListener("mousemove", this._onMouseMove, !0), window.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), this.renderer.view.parentNode && this.renderer.view.parentNode.appendChild(this.div))
    }, je.prototype.deactivate = function() {
        this.isActive && !this.isMobileAccessibility && (this.isActive = !1, window.document.removeEventListener("mousemove", this._onMouseMove, !0), window.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), this.div.parentNode && this.div.parentNode.removeChild(this.div))
    }, je.prototype.updateAccessibleObjects = function(t) {
        if (t.visible) {
            t.accessible && t.interactive && (t._accessibleActive || this.addChild(t), t.renderId = this.renderId);
            for (var e = t.children, i = 0; i < e.length; i++) this.updateAccessibleObjects(e[i])
        }
    }, je.prototype.update = function() {
        if (this.renderer.renderingToScreen) {
            this.updateAccessibleObjects(this.renderer._lastObjectRendered);
            var t = this.renderer.view.getBoundingClientRect(),
                e = t.width / this.renderer.width,
                i = t.height / this.renderer.height,
                r = this.div;
            r.style.left = t.left + "px", r.style.top = t.top + "px", r.style.width = this.renderer.width + "px", r.style.height = this.renderer.height + "px";
            for (var n = 0; n < this.children.length; n++) {
                var o = this.children[n];
                if (o.renderId !== this.renderId) o._accessibleActive = !1, Vt(this.children, n, 1), this.div.removeChild(o._accessibleDiv), this.pool.push(o._accessibleDiv), o._accessibleDiv = null, n--, 0 === this.children.length && this.deactivate();
                else {
                    r = o._accessibleDiv;
                    var s = o.hitArea,
                        a = o.worldTransform;
                    o.hitArea ? (r.style.left = (a.tx + s.x * a.a) * e + "px", r.style.top = (a.ty + s.y * a.d) * i + "px", r.style.width = s.width * a.a * e + "px", r.style.height = s.height * a.d * i + "px") : (s = o.getBounds(), this.capHitArea(s), r.style.left = s.x * e + "px", r.style.top = s.y * i + "px", r.style.width = s.width * e + "px", r.style.height = s.height * i + "px", r.title !== o.accessibleTitle && null !== o.accessibleTitle && (r.title = o.accessibleTitle), r.getAttribute("aria-label") !== o.accessibleHint && null !== o.accessibleHint && r.setAttribute("aria-label", o.accessibleHint))
                }
            }
            this.renderId++
        }
    }, je.prototype.capHitArea = function(t) {
        t.x < 0 && (t.width += t.x, t.x = 0), t.y < 0 && (t.height += t.y, t.y = 0), t.x + t.width > this.renderer.width && (t.width = this.renderer.width - t.x), t.y + t.height > this.renderer.height && (t.height = this.renderer.height - t.y)
    }, je.prototype.addChild = function(t) {
        var e = this.pool.pop();
        e || ((e = document.createElement("button")).style.width = "100px", e.style.height = "100px", e.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent", e.style.position = "absolute", e.style.zIndex = 2, e.style.borderStyle = "none", navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? e.setAttribute("aria-live", "off") : e.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? e.setAttribute("aria-relevant", "additions") : e.setAttribute("aria-relevant", "text"), e.addEventListener("click", this._onClick.bind(this)), e.addEventListener("focus", this._onFocus.bind(this)), e.addEventListener("focusout", this._onFocusOut.bind(this))), t.accessibleTitle && null !== t.accessibleTitle ? e.title = t.accessibleTitle : t.accessibleHint && null !== t.accessibleHint || (e.title = "displayObject " + t.tabIndex), t.accessibleHint && null !== t.accessibleHint && e.setAttribute("aria-label", t.accessibleHint), t._accessibleActive = !0, t._accessibleDiv = e, e.displayObject = t, this.children.push(t), this.div.appendChild(t._accessibleDiv), t._accessibleDiv.tabIndex = t.tabIndex
    }, je.prototype._onClick = function(t) {
        var e = this.renderer.plugins.interaction;
        e.dispatchEvent(t.target.displayObject, "click", e.eventData), e.dispatchEvent(t.target.displayObject, "pointertap", e.eventData), e.dispatchEvent(t.target.displayObject, "tap", e.eventData)
    }, je.prototype._onFocus = function(t) {
        t.target.getAttribute("aria-live", "off") || t.target.setAttribute("aria-live", "assertive");
        var e = this.renderer.plugins.interaction;
        e.dispatchEvent(t.target.displayObject, "mouseover", e.eventData)
    }, je.prototype._onFocusOut = function(t) {
        t.target.getAttribute("aria-live", "off") || t.target.setAttribute("aria-live", "polite");
        var e = this.renderer.plugins.interaction;
        e.dispatchEvent(t.target.displayObject, "mouseout", e.eventData)
    }, je.prototype._onKeyDown = function(t) {
        9 === t.keyCode && this.activate()
    }, je.prototype._onMouseMove = function(t) {
        0 === t.movementX && 0 === t.movementY || this.deactivate()
    }, je.prototype.destroy = function() {
        this.destroyTouchHook(), this.div = null;
        for (var t = 0; t < this.children.length; t++) this.children[t].div = null;
        window.document.removeEventListener("mousemove", this._onMouseMove, !0), window.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null
    };
    var Xe = {
            AccessibilityManager: je,
            accessibleTarget: Ue
        },
        Ge = function(t) {
            this.items = [], this._name = t, this._aliasCount = 0
        },
        Ve = {
            empty: {
                configurable: !0
            },
            name: {
                configurable: !0
            }
        };
    Ge.prototype.emit = function(t, e, i, r, n, o, s, a) {
        if (arguments.length > 8) throw new Error("max arguments reached");
        var h = this.name,
            u = this.items;
        this._aliasCount++;
        for (var l = 0, c = u.length; l < c; l++) u[l][h](t, e, i, r, n, o, s, a);
        return u === this.items && this._aliasCount--, this
    }, Ge.prototype.ensureNonAliasedItems = function() {
        this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0))
    }, Ge.prototype.add = function(t) {
        return t[this._name] && (this.ensureNonAliasedItems(), this.remove(t), this.items.push(t)), this
    }, Ge.prototype.remove = function(t) {
        var e = this.items.indexOf(t);
        return -1 !== e && (this.ensureNonAliasedItems(), this.items.splice(e, 1)), this
    }, Ge.prototype.contains = function(t) {
        return -1 !== this.items.indexOf(t)
    }, Ge.prototype.removeAll = function() {
        return this.ensureNonAliasedItems(), this.items.length = 0, this
    }, Ge.prototype.destroy = function() {
        this.removeAll(), this.items = null, this._name = null
    }, Ve.empty.get = function() {
        return 0 === this.items.length
    }, Ve.name.get = function() {
        return this._name
    }, Object.defineProperties(Ge.prototype, Ve), Ge.prototype.dispatch = Ge.prototype.emit, Ge.prototype.run = Ge.prototype.emit, g.TARGET_FPMS = .06;
    var He = {
            INTERACTION: 50,
            HIGH: 25,
            NORMAL: 0,
            LOW: -25,
            UTILITY: -50
        },
        ze = function(t, e, i, r) {
            void 0 === e && (e = null), void 0 === i && (i = 0), void 0 === r && (r = !1), this.fn = t, this.context = e, this.priority = i, this.once = r, this.next = null, this.previous = null, this._destroyed = !1
        };
    ze.prototype.match = function(t, e) {
        return e = e || null, this.fn === t && this.context === e
    }, ze.prototype.emit = function(t) {
        this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
        var e = this.next;
        return this.once && this.destroy(!0), this._destroyed && (this.next = null), e
    }, ze.prototype.connect = function(t) {
        this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this
    }, ze.prototype.destroy = function(t) {
        void 0 === t && (t = !1), this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
        var e = this.next;
        return this.next = t ? null : e, this.previous = null, e
    };
    var We = function() {
            var t = this;
            this._head = new ze(null, null, 1 / 0), this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this.autoStart = !1, this.deltaTime = 1, this.deltaMS = 1 / g.TARGET_FPMS, this.elapsedMS = 1 / g.TARGET_FPMS, this.lastTime = -1, this.speed = 1, this.started = !1, this._protected = !1, this._lastFrame = -1, this._tick = function(e) {
                t._requestId = null, t.started && (t.update(e), t.started && null === t._requestId && t._head.next && (t._requestId = requestAnimationFrame(t._tick)))
            }
        },
        Ye = {
            FPS: {
                configurable: !0
            },
            minFPS: {
                configurable: !0
            },
            maxFPS: {
                configurable: !0
            }
        },
        qe = {
            shared: {
                configurable: !0
            },
            system: {
                configurable: !0
            }
        };
    We.prototype._requestIfNeeded = function() {
        null === this._requestId && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick))
    }, We.prototype._cancelIfNeeded = function() {
        null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null)
    }, We.prototype._startIfPossible = function() {
        this.started ? this._requestIfNeeded() : this.autoStart && this.start()
    }, We.prototype.add = function(t, e, i) {
        return void 0 === i && (i = He.NORMAL), this._addListener(new ze(t, e, i))
    }, We.prototype.addOnce = function(t, e, i) {
        return void 0 === i && (i = He.NORMAL), this._addListener(new ze(t, e, i, !0))
    }, We.prototype._addListener = function(t) {
        var e = this._head.next,
            i = this._head;
        if (e) {
            for (; e;) {
                if (t.priority > e.priority) {
                    t.connect(i);
                    break
                }
                i = e, e = e.next
            }
            t.previous || t.connect(i)
        } else t.connect(i);
        return this._startIfPossible(), this
    }, We.prototype.remove = function(t, e) {
        for (var i = this._head.next; i;) i = i.match(t, e) ? i.destroy() : i.next;
        return this._head.next || this._cancelIfNeeded(), this
    }, We.prototype.start = function() {
        this.started || (this.started = !0, this._requestIfNeeded())
    }, We.prototype.stop = function() {
        this.started && (this.started = !1, this._cancelIfNeeded())
    }, We.prototype.destroy = function() {
        if (!this._protected) {
            this.stop();
            for (var t = this._head.next; t;) t = t.destroy(!0);
            this._head.destroy(), this._head = null
        }
    }, We.prototype.update = function(t) {
        var e;
        if (void 0 === t && (t = performance.now()), t > this.lastTime) {
            if ((e = this.elapsedMS = t - this.lastTime) > this._maxElapsedMS && (e = this._maxElapsedMS), e *= this.speed, this._minElapsedMS) {
                var i = t - this._lastFrame | 0;
                if (i < this._minElapsedMS) return;
                this._lastFrame = t - i % this._minElapsedMS
            }
            this.deltaMS = e, this.deltaTime = this.deltaMS * g.TARGET_FPMS;
            for (var r = this._head, n = r.next; n;) n = n.emit(this.deltaTime);
            r.next || this._cancelIfNeeded()
        } else this.deltaTime = this.deltaMS = this.elapsedMS = 0;
        this.lastTime = t
    }, Ye.FPS.get = function() {
        return 1e3 / this.elapsedMS
    }, Ye.minFPS.get = function() {
        return 1e3 / this._maxElapsedMS
    }, Ye.minFPS.set = function(t) {
        var e = Math.min(this.maxFPS, t),
            i = Math.min(Math.max(0, e) / 1e3, g.TARGET_FPMS);
        this._maxElapsedMS = 1 / i
    }, Ye.maxFPS.get = function() {
        return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0
    }, Ye.maxFPS.set = function(t) {
        if (0 === t) this._minElapsedMS = 0;
        else {
            var e = Math.max(this.minFPS, t);
            this._minElapsedMS = 1 / (e / 1e3)
        }
    }, qe.shared.get = function() {
        if (!We._shared) {
            var t = We._shared = new We;
            t.autoStart = !0, t._protected = !0
        }
        return We._shared
    }, qe.system.get = function() {
        if (!We._system) {
            var t = We._system = new We;
            t.autoStart = !0, t._protected = !0
        }
        return We._system
    }, Object.defineProperties(We.prototype, Ye), Object.defineProperties(We, qe);
    var Ke = function() {};
    Ke.init = function(t) {
        var e = this;
        t = Object.assign({
            autoStart: !0,
            sharedTicker: !1
        }, t), Object.defineProperty(this, "ticker", {
            set: function(t) {
                this._ticker && this._ticker.remove(this.render, this), this._ticker = t, t && t.add(this.render, this, He.LOW)
            },
            get: function() {
                return this._ticker
            }
        }), this.stop = function() {
            e._ticker.stop()
        }, this.start = function() {
            e._ticker.start()
        }, this._ticker = null, this.ticker = t.sharedTicker ? We.shared : new We, t.autoStart && this.start()
    }, Ke.destroy = function() {
        if (this._ticker) {
            var t = this._ticker;
            this.ticker = null, t.destroy()
        }
    };
    var Ze = function(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this._width = t, this._height = e, this.destroyed = !1, this.internal = !1, this.onResize = new Ge("setRealSize", 2), this.onUpdate = new Ge("update"), this.onError = new Ge("onError", 1)
        },
        Je = {
            valid: {
                configurable: !0
            },
            width: {
                configurable: !0
            },
            height: {
                configurable: !0
            }
        };
    Ze.prototype.bind = function(t) {
        this.onResize.add(t), this.onUpdate.add(t), this.onError.add(t), (this._width || this._height) && this.onResize.run(this._width, this._height)
    }, Ze.prototype.unbind = function(t) {
        this.onResize.remove(t), this.onUpdate.remove(t), this.onError.remove(t)
    }, Ze.prototype.resize = function(t, e) {
        t === this._width && e === this._height || (this._width = t, this._height = e, this.onResize.run(t, e))
    }, Je.valid.get = function() {
        return !!this._width && !!this._height
    }, Ze.prototype.update = function() {
        this.destroyed || this.onUpdate.run()
    }, Ze.prototype.load = function() {
        return Promise.resolve()
    }, Je.width.get = function() {
        return this._width
    }, Je.height.get = function() {
        return this._height
    }, Ze.prototype.upload = function(t, e, i) {
        return !1
    }, Ze.prototype.style = function(t, e, i) {
        return !1
    }, Ze.prototype.dispose = function() {}, Ze.prototype.destroy = function() {
        this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null)
    }, Object.defineProperties(Ze.prototype, Je);
    var Qe = function(t) {
            function e(e) {
                var i = e.naturalWidth || e.videoWidth || e.width,
                    r = e.naturalHeight || e.videoHeight || e.height;
                t.call(this, i, r), this.source = e, this.noSubImage = !1
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.crossOrigin = function(t, e, i) {
                void 0 === i && 0 !== e.indexOf("data:") ? t.crossOrigin = ne(e) : !1 !== i && (t.crossOrigin = "string" == typeof i ? i : "anonymous")
            }, e.prototype.upload = function(t, e, i, r) {
                var n = t.gl,
                    o = e.realWidth,
                    s = e.realHeight;
                return r = r || this.source, n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha), this.noSubImage || e.target !== n.TEXTURE_2D || i.width !== o || i.height !== s ? (i.width = o, i.height = s, n.texImage2D(e.target, 0, e.format, e.format, e.type, r)) : n.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, e.format, e.type, r), !0
            }, e.prototype.update = function() {
                if (!this.destroyed) {
                    var e = this.source.naturalWidth || this.source.videoWidth || this.source.width,
                        i = this.source.naturalHeight || this.source.videoHeight || this.source.height;
                    this.resize(e, i), t.prototype.update.call(this)
                }
            }, e.prototype.dispose = function() {
                this.source = null
            }, e
        }(Ze),
        $e = function(t) {
            function e(e, i) {
                if (i = i || {}, !(e instanceof HTMLImageElement)) {
                    var r = new Image;
                    t.crossOrigin(r, e, i.crossorigin), r.src = e, e = r
                }
                t.call(this, e), !e.complete && this._width && this._height && (this._width = 0, this._height = 0), this.url = e.src, this._process = null, this.preserveBitmap = !1, this.createBitmap = (void 0 !== i.createBitmap ? i.createBitmap : g.CREATE_IMAGE_BITMAP) && !!window.createImageBitmap, this.premultiplyAlpha = !1 !== i.premultiplyAlpha, this.bitmap = null, this._load = null, !1 !== i.autoLoad && this.load()
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.load = function(t) {
                var e = this;
                return void 0 !== t && (this.createBitmap = t), this._load ? this._load : (this._load = new Promise(function(t) {
                    e.url = e.source.src;
                    var i = e.source,
                        r = function() {
                            e.destroyed || (i.onload = null, i.onerror = null, e.resize(i.width, i.height), e._load = null, e.createBitmap ? t(e.process()) : t(e))
                        };
                    i.complete && i.src ? r() : (i.onload = r, i.onerror = function(t) {
                        return e.onError.run(t)
                    })
                }), this._load)
            }, e.prototype.process = function() {
                var t = this;
                return null !== this._process ? this._process : null === this.bitmap && window.createImageBitmap ? (this._process = window.createImageBitmap(this.source, 0, 0, this.source.width, this.source.height, {
                    premultiplyAlpha: this.premultiplyAlpha ? "premultiply" : "none"
                }).then(function(e) {
                    return t.destroyed ? Promise.reject() : (t.bitmap = e, t.update(), t._process = null, Promise.resolve(t))
                }), this._process) : Promise.resolve(this)
            }, e.prototype.upload = function(e, i, r) {
                if (i.premultiplyAlpha = this.premultiplyAlpha, !this.createBitmap) return t.prototype.upload.call(this, e, i, r);
                if (!this.bitmap && (this.process(), !this.bitmap)) return !1;
                if (t.prototype.upload.call(this, e, i, r, this.bitmap), !this.preserveBitmap) {
                    var n = !0;
                    for (var o in i._glTextures) {
                        var s = i._glTextures[o];
                        if (s !== r && s.dirtyId !== i.dirtyId) {
                            n = !1;
                            break
                        }
                    }
                    n && (this.bitmap.close && this.bitmap.close(), this.bitmap = null)
                }
                return !0
            }, e.prototype.dispose = function() {
                this.source.onload = null, this.source.onerror = null, t.prototype.dispose.call(this), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null
            }, e
        }(Qe),
        ti = [];

    function ei(t, e) {
        if (!t) return null;
        var i = "";
        if ("string" == typeof t) {
            var r = /\.(\w{3,4})(?:$|\?|#)/i.exec(t);
            r && (i = r[1].toLowerCase())
        }
        for (var n = ti.length - 1; n >= 0; --n) {
            var o = ti[n];
            if (o.test && o.test(t, i)) return new o(t, e)
        }
        return new $e(t, e)
    }
    var ii = function(t) {
            function e(e, i) {
                var r = i || {},
                    n = r.width,
                    o = r.height;
                if (!n || !o) throw new Error("BufferResource width or height invalid");
                t.call(this, n, o), this.data = e
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.upload = function(t, e, i) {
                var r = t.gl;
                return r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha), i.width === e.width && i.height === e.height ? r.texSubImage2D(e.target, 0, 0, 0, e.width, e.height, e.format, e.type, this.data) : (i.width = e.width, i.height = e.height, r.texImage2D(e.target, 0, i.internalFormat, e.width, e.height, 0, e.format, i.type, this.data)), !0
            }, e.prototype.dispose = function() {
                this.data = null
            }, e.test = function(t) {
                return t instanceof Float32Array || t instanceof Uint8Array || t instanceof Uint32Array
            }, e
        }(Ze),
        ri = {
            scaleMode: Tt.NEAREST,
            format: bt.RGBA,
            premultiplyAlpha: !1
        },
        ni = function(t) {
            function e(e, i) {
                void 0 === e && (e = null), void 0 === i && (i = null), t.call(this);
                var r = (i = i || {}).premultiplyAlpha,
                    n = i.mipmap,
                    o = i.anisotropicLevel,
                    s = i.scaleMode,
                    a = i.width,
                    h = i.height,
                    u = i.wrapMode,
                    l = i.format,
                    c = i.type,
                    d = i.target,
                    p = i.resolution,
                    f = i.resourceOptions;
                !e || e instanceof Ze || ((e = ei(e, f)).internal = !0), this.width = a || 0, this.height = h || 0, this.resolution = p || g.RESOLUTION, this.mipmap = void 0 !== n ? n : g.MIPMAP_TEXTURES, this.anisotropicLevel = void 0 !== o ? o : g.ANISOTROPIC_LEVEL, this.wrapMode = u || g.WRAP_MODE, this.scaleMode = void 0 !== s ? s : g.SCALE_MODE, this.format = l || bt.RGBA, this.type = c || wt.UNSIGNED_BYTE, this.target = d || xt.TEXTURE_2D, this.premultiplyAlpha = !1 !== r, this.uid = zt(), this.touched = 0, this.isPowerOfTwo = !1, this._refreshPOT(), this._glTextures = {}, this.dirtyId = 0, this.dirtyStyleId = 0, this.cacheId = null, this.valid = a > 0 && h > 0, this.textureCacheIds = [], this.destroyed = !1, this.resource = null, this._batchEnabled = 0, this.setResource(e)
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                realWidth: {
                    configurable: !0
                },
                realHeight: {
                    configurable: !0
                }
            };
            return i.realWidth.get = function() {
                return Math.ceil(this.width * this.resolution - 1e-4)
            }, i.realHeight.get = function() {
                return Math.ceil(this.height * this.resolution - 1e-4)
            }, e.prototype.setStyle = function(t, e) {
                var i;
                return void 0 !== t && t !== this.scaleMode && (this.scaleMode = t, i = !0), void 0 !== e && e !== this.mipmap && (this.mipmap = e, i = !0), i && this.dirtyStyleId++, this
            }, e.prototype.setSize = function(t, e, i) {
                return this.resolution = i || this.resolution, this.width = t, this.height = e, this._refreshPOT(), this.update(), this
            }, e.prototype.setRealSize = function(t, e, i) {
                return this.resolution = i || this.resolution, this.width = t / this.resolution, this.height = e / this.resolution, this._refreshPOT(), this.update(), this
            }, e.prototype._refreshPOT = function() {
                this.isPowerOfTwo = qt(this.realWidth) && qt(this.realHeight)
            }, e.prototype.setResolution = function(t) {
                var e = this.resolution;
                return e === t ? this : (this.resolution = t, this.valid && (this.width = this.width * e / t, this.height = this.height * e / t, this.emit("update", this)), this._refreshPOT(), this)
            }, e.prototype.setResource = function(t) {
                if (this.resource === t) return this;
                if (this.resource) throw new Error("Resource can be set only once");
                return t.bind(this), this.resource = t, this
            }, e.prototype.update = function() {
                this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this))
            }, e.prototype.onError = function(t) {
                this.emit("error", this, t)
            }, e.prototype.destroy = function() {
                this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete Qt[this.cacheId], delete Jt[this.cacheId], this.cacheId = null), this.dispose(), e.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0
            }, e.prototype.dispose = function() {
                this.emit("dispose", this)
            }, e.from = function(t, i) {
                var r = null;
                "string" == typeof t ? r = t : (t._pixiId || (t._pixiId = "pixiid_" + zt()), r = t._pixiId);
                var n = Qt[r];
                return n || ((n = new e(t, i)).cacheId = r, e.addToCache(n, r)), n
            }, e.fromBuffer = function(t, i, r, n) {
                t = t || new Float32Array(i * r * 4);
                var o = new ii(t, {
                        width: i,
                        height: r
                    }),
                    s = t instanceof Float32Array ? wt.FLOAT : wt.UNSIGNED_BYTE;
                return new e(o, Object.assign(ri, n || {
                    width: i,
                    height: r,
                    type: s
                }))
            }, e.addToCache = function(t, e) {
                e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e), Qt[e] && console.warn("BaseTexture added to the cache with an id [" + e + "] that already had an entry"), Qt[e] = t)
            }, e.removeFromCache = function(t) {
                if ("string" == typeof t) {
                    var e = Qt[t];
                    if (e) {
                        var i = e.textureCacheIds.indexOf(t);
                        return i > -1 && e.textureCacheIds.splice(i, 1), delete Qt[t], e
                    }
                } else if (t && t.textureCacheIds) {
                    for (var r = 0; r < t.textureCacheIds.length; ++r) delete Qt[t.textureCacheIds[r]];
                    return t.textureCacheIds.length = 0, t
                }
                return null
            }, Object.defineProperties(e.prototype, i), e
        }(v);
    ni._globalBatch = 0;
    var oi = function(t) {
            function e(e, i) {
                var r;
                i = i || {};
                var n = e;
                Array.isArray(e) && (r = e, n = e.length), t.call(this, i.width, i.height), this.items = [], this.itemDirtyIds = [];
                for (var o = 0; o < n; o++) {
                    var s = new ni;
                    this.items.push(s), this.itemDirtyIds.push(-1)
                }
                if (this.length = n, this._load = null, r)
                    for (var a = 0; a < n; a++) this.addResourceAt(ei(r[a], i), a)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.dispose = function() {
                for (var t = 0, e = this.length; t < e; t++) this.items[t].destroy();
                this.items = null, this.itemDirtyIds = null, this._load = null
            }, e.prototype.addResourceAt = function(t, e) {
                if (!this.items[e]) throw new Error("Index " + e + " is out of bounds");
                return t.valid && !this.valid && this.resize(t.width, t.height), this.items[e].setResource(t), this
            }, e.prototype.bind = function(e) {
                t.prototype.bind.call(this, e), e.target = xt.TEXTURE_2D_ARRAY;
                for (var i = 0; i < this.length; i++) this.items[i].on("update", e.update, e)
            }, e.prototype.unbind = function(e) {
                t.prototype.unbind.call(this, e);
                for (var i = 0; i < this.length; i++) this.items[i].off("update", e.update, e)
            }, e.prototype.load = function() {
                var t = this;
                if (this._load) return this._load;
                var e = this.items.map(function(t) {
                        return t.resource
                    }),
                    i = e.map(function(t) {
                        return t.load()
                    });
                return this._load = Promise.all(i).then(function() {
                    var i = e[0],
                        r = i.width,
                        n = i.height;
                    return t.resize(r, n), Promise.resolve(t)
                }), this._load
            }, e.prototype.upload = function(t, e, i) {
                var r = this.length,
                    n = this.itemDirtyIds,
                    o = this.items,
                    s = t.gl;
                i.dirtyId < 0 && s.texImage3D(s.TEXTURE_2D_ARRAY, 0, e.format, this._width, this._height, r, 0, e.format, e.type, null);
                for (var a = 0; a < r; a++) {
                    var h = o[a];
                    n[a] < h.dirtyId && (n[a] = h.dirtyId, h.valid && s.texSubImage3D(s.TEXTURE_2D_ARRAY, 0, 0, 0, a, h.resource.width, h.resource.height, 1, e.format, e.type, h.resource.source))
                }
                return !0
            }, e
        }(Ze),
        si = function(t) {
            function e() {
                t.apply(this, arguments)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.test = function(t) {
                var e = window.OffscreenCanvas;
                return !!(e && t instanceof e) || t instanceof HTMLCanvasElement
            }, e
        }(Qe),
        ai = function(t) {
            function e(i, r) {
                if (r = r || {}, t.call(this, i, r), this.length !== e.SIDES) throw new Error("Invalid length. Got " + this.length + ", expected 6");
                for (var n = 0; n < e.SIDES; n++) this.items[n].target = xt.TEXTURE_CUBE_MAP_POSITIVE_X + n;
                !1 !== r.autoLoad && this.load()
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.bind = function(e) {
                t.prototype.bind.call(this, e), e.target = xt.TEXTURE_CUBE_MAP
            }, e.prototype.upload = function(t, i, r) {
                for (var n = this.itemDirtyIds, o = 0; o < e.SIDES; o++) {
                    var s = this.items[o];
                    n[o] < s.dirtyId && (n[o] = s.dirtyId, s.valid && s.resource.upload(t, s, r))
                }
                return !0
            }, e
        }(oi);
    ai.SIDES = 6;
    var hi = function(t) {
        function e(e, i) {
            i = i || {}, t.call(this, document.createElement("canvas")), this._width = 0, this._height = 0, this.svg = e, this.scale = i.scale || 1, this._overrideWidth = i.width, this._overrideHeight = i.height, this._resolve = null, this._crossorigin = i.crossorigin, this._load = null, !1 !== i.autoLoad && this.load()
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.load = function() {
            var t = this;
            return this._load ? this._load : (this._load = new Promise(function(e) {
                if (t._resolve = function() {
                        t.resize(t.source.width, t.source.height), e(t)
                    }, /^\<svg/.test(t.svg.trim())) {
                    if (!btoa) throw new Error("Your browser doesn't support base64 conversions.");
                    t.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(t.svg)))
                }
                t._loadSvg()
            }), this._load)
        }, e.prototype._loadSvg = function() {
            var e = this,
                i = new Image;
            t.crossOrigin(i, this.svg, this._crossorigin), i.src = this.svg, i.onerror = function(t) {
                i.onerror = null, e.onError.run(t)
            }, i.onload = function() {
                var t = i.width,
                    r = i.height;
                if (!t || !r) throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
                var n = t * e.scale,
                    o = r * e.scale;
                (e._overrideWidth || e._overrideHeight) && (n = e._overrideWidth || e._overrideHeight / r * t, o = e._overrideHeight || e._overrideWidth / t * r), n = Math.round(n), o = Math.round(o);
                var s = e.source;
                s.width = n, s.height = o, s._pixiId = "canvas_" + zt(), s.getContext("2d").drawImage(i, 0, 0, t, r, 0, 0, n, o), e._resolve(), e._resolve = null
            }
        }, e.getSize = function(t) {
            var i = e.SVG_SIZE.exec(t),
                r = {};
            return i && (r[i[1]] = Math.round(parseFloat(i[3])), r[i[5]] = Math.round(parseFloat(i[7]))), r
        }, e.prototype.dispose = function() {
            t.prototype.dispose.call(this), this._resolve = null, this._crossorigin = null
        }, e.test = function(t, e) {
            return "svg" === e || "string" == typeof t && 0 === t.indexOf("data:image/svg+xml;base64") || "string" == typeof t && 0 === t.indexOf("<svg")
        }, e
    }(Qe);
    hi.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;
    var ui = function(t) {
        function e(e, i) {
            if (i = i || {}, !(e instanceof HTMLVideoElement)) {
                var r = document.createElement("video");
                r.setAttribute("preload", "auto"), r.setAttribute("webkit-playsinline", ""), r.setAttribute("playsinline", ""), "string" == typeof e && (e = [e]), t.crossOrigin(r, e[0].src || e[0], i.crossorigin);
                for (var n = 0; n < e.length; ++n) {
                    var o = document.createElement("source"),
                        s = e[n],
                        a = s.src,
                        h = s.mime,
                        u = (a = a || e[n]).split("?").shift().toLowerCase(),
                        l = u.substr(u.lastIndexOf(".") + 1);
                    h = h || "video/" + l, o.src = a, o.type = h, r.appendChild(o)
                }
                e = r
            }
            t.call(this, e), this.noSubImage = !0, this._autoUpdate = !0, this._isAutoUpdating = !1, this._updateFPS = i.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = !1 !== i.autoPlay, this._load = null, this._resolve = null, this._onCanPlay = this._onCanPlay.bind(this), this._onError = this._onError.bind(this), !1 !== i.autoLoad && this.load()
        }
        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var i = {
            autoUpdate: {
                configurable: !0
            },
            updateFPS: {
                configurable: !0
            }
        };
        return e.prototype.update = function(e) {
            if (void 0 === e && (e = 0), !this.destroyed) {
                var i = We.shared.elapsedMS * this.source.playbackRate;
                this._msToNextUpdate = Math.floor(this._msToNextUpdate - i), (!this._updateFPS || this._msToNextUpdate <= 0) && (t.prototype.update.call(this, e), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0)
            }
        }, e.prototype.load = function() {
            var t = this;
            if (this._load) return this._load;
            var e = this.source;
            return (e.readyState === e.HAVE_ENOUGH_DATA || e.readyState === e.HAVE_FUTURE_DATA) && e.width && e.height && (e.complete = !0), e.addEventListener("play", this._onPlayStart.bind(this)), e.addEventListener("pause", this._onPlayStop.bind(this)), this._isSourceReady() ? this._onCanPlay() : (e.addEventListener("canplay", this._onCanPlay), e.addEventListener("canplaythrough", this._onCanPlay), e.addEventListener("error", this._onError, !0)), this._load = new Promise(function(i) {
                t.valid ? i(t) : (t._resolve = i, e.load())
            }), this._load
        }, e.prototype._onError = function() {
            this.source.removeEventListener("error", this._onError, !0), this.onError.run(event)
        }, e.prototype._isSourcePlaying = function() {
            var t = this.source;
            return t.currentTime > 0 && !1 === t.paused && !1 === t.ended && t.readyState > 2
        }, e.prototype._isSourceReady = function() {
            return 3 === this.source.readyState || 4 === this.source.readyState
        }, e.prototype._onPlayStart = function() {
            this.valid || this._onCanPlay(), !this._isAutoUpdating && this.autoUpdate && (We.shared.add(this.update, this), this._isAutoUpdating = !0)
        }, e.prototype._onPlayStop = function() {
            this._isAutoUpdating && (We.shared.remove(this.update, this), this._isAutoUpdating = !1)
        }, e.prototype._onCanPlay = function() {
            var t = this.source;
            t.removeEventListener("canplay", this._onCanPlay), t.removeEventListener("canplaythrough", this._onCanPlay);
            var e = this.valid;
            this.resize(t.videoWidth, t.videoHeight), !e && this._resolve && (this._resolve(this), this._resolve = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && t.play()
        }, e.prototype.dispose = function() {
            this._isAutoUpdating && We.shared.remove(this.update, this), this.source && (this.source.removeEventListener("error", this._onError, !0), this.source.pause(), this.source.src = "", this.source.load()), t.prototype.dispose.call(this)
        }, i.autoUpdate.get = function() {
            return this._autoUpdate
        }, i.autoUpdate.set = function(t) {
            t !== this._autoUpdate && (this._autoUpdate = t, !this._autoUpdate && this._isAutoUpdating ? (We.shared.remove(this.update, this), this._isAutoUpdating = !1) : this._autoUpdate && !this._isAutoUpdating && (We.shared.add(this.update, this), this._isAutoUpdating = !0))
        }, i.updateFPS.get = function() {
            return this._updateFPS
        }, i.updateFPS.set = function(t) {
            t !== this._updateFPS && (this._updateFPS = t)
        }, e.test = function(t, i) {
            return t instanceof HTMLVideoElement || e.TYPES.indexOf(i) > -1
        }, Object.defineProperties(e.prototype, i), e
    }(Qe);
    ui.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"];
    var li = function(t) {
        function e() {
            t.apply(this, arguments)
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.test = function(t) {
            return !!window.createImageBitmap && t instanceof ImageBitmap
        }, e
    }(Qe);
    ti.push($e, li, si, ui, hi, ii, ai, oi);
    var ci = {
            INSTALLED: ti,
            autoDetectResource: ei,
            ArrayResource: oi,
            BufferResource: ii,
            CanvasResource: si,
            CubeResource: ai,
            ImageResource: $e,
            ImageBitmapResource: li,
            SVGResource: hi,
            VideoResource: ui,
            Resource: Ze,
            BaseImageResource: Qe
        },
        di = function(t) {
            this.renderer = t
        };
    di.prototype.destroy = function() {
        this.renderer = null
    };
    var pi = function(t) {
            function e() {
                t.apply(this, arguments)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.upload = function(t, e, i) {
                var r = t.gl;
                return r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha), i.width === e.width && i.height === e.height ? r.texSubImage2D(e.target, 0, 0, 0, e.width, e.height, e.format, e.type, this.data) : (i.width = e.width, i.height = e.height, r.texImage2D(e.target, 0, r.DEPTH_COMPONENT16, e.width, e.height, 0, e.format, e.type, this.data)), !0
            }, e
        }(ii),
        fi = function(t, e) {
            this.width = Math.ceil(t || 100), this.height = Math.ceil(e || 100), this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Ge("disposeFramebuffer", 2)
        },
        mi = {
            colorTexture: {
                configurable: !0
            }
        };
    mi.colorTexture.get = function() {
        return this.colorTextures[0]
    }, fi.prototype.addColorTexture = function(t, e) {
        return void 0 === t && (t = 0), this.colorTextures[t] = e || new ni(null, {
            scaleMode: 0,
            resolution: 1,
            mipmap: !1,
            width: this.width,
            height: this.height
        }), this.dirtyId++, this.dirtyFormat++, this
    }, fi.prototype.addDepthTexture = function(t) {
        return this.depthTexture = t || new ni(new pi(null, {
            width: this.width,
            height: this.height
        }), {
            scaleMode: 0,
            resolution: 1,
            width: this.width,
            height: this.height,
            mipmap: !1,
            format: bt.DEPTH_COMPONENT,
            type: wt.UNSIGNED_SHORT
        }), this.dirtyId++, this.dirtyFormat++, this
    }, fi.prototype.enableDepth = function() {
        return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this
    }, fi.prototype.enableStencil = function() {
        return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this
    }, fi.prototype.resize = function(t, e) {
        if (t = Math.ceil(t), e = Math.ceil(e), t !== this.width || e !== this.height) {
            this.width = t, this.height = e, this.dirtyId++, this.dirtySize++;
            for (var i = 0; i < this.colorTextures.length; i++) {
                var r = this.colorTextures[i],
                    n = r.resolution;
                r.setSize(t / n, e / n)
            }
            if (this.depthTexture) {
                var o = this.depthTexture.resolution;
                this.depthTexture.setSize(t / o, e / o)
            }
        }
    }, fi.prototype.dispose = function() {
        this.disposeRunner.run(this, !1)
    }, Object.defineProperties(fi.prototype, mi);
    var gi = function(t) {
            function e(e) {
                "number" == typeof e && (e = {
                    width: arguments[0],
                    height: arguments[1],
                    scaleMode: arguments[2],
                    resolution: arguments[3]
                }), t.call(this, null, e);
                var i = e || {},
                    r = i.width,
                    n = i.height;
                this.mipmap = !1, this.width = Math.ceil(r) || 100, this.height = Math.ceil(n) || 100, this.valid = !0, this._canvasRenderTarget = null, this.clearColor = [0, 0, 0, 0], this.framebuffer = new fi(this.width * this.resolution, this.height * this.resolution).addColorTexture(0, this), this.stencilMaskStack = [], this.filterStack = [{}]
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.resize = function(t, e) {
                t = Math.ceil(t), e = Math.ceil(e), this.framebuffer.resize(t * this.resolution, e * this.resolution)
            }, e.prototype.dispose = function() {
                this.framebuffer.dispose(), t.prototype.dispose.call(this)
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this, !0), this.framebuffer = null
            }, e
        }(ni),
        vi = function() {
            this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8)
        };
    vi.prototype.set = function(t, e, i) {
        var r = e.width,
            n = e.height;
        if (i) {
            var o = t.width / 2 / r,
                s = t.height / 2 / n,
                a = t.x / r + o,
                h = t.y / n + s;
            i = Ee.add(i, Ee.NW), this.x0 = a + o * Ee.uX(i), this.y0 = h + s * Ee.uY(i), i = Ee.add(i, 2), this.x1 = a + o * Ee.uX(i), this.y1 = h + s * Ee.uY(i), i = Ee.add(i, 2), this.x2 = a + o * Ee.uX(i), this.y2 = h + s * Ee.uY(i), i = Ee.add(i, 2), this.x3 = a + o * Ee.uX(i), this.y3 = h + s * Ee.uY(i)
        } else this.x0 = t.x / r, this.y0 = t.y / n, this.x1 = (t.x + t.width) / r, this.y1 = t.y / n, this.x2 = (t.x + t.width) / r, this.y2 = (t.y + t.height) / n, this.x3 = t.x / r, this.y3 = (t.y + t.height) / n;
        this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3
    };
    var yi = new vi,
        _i = function(t) {
            function e(i, r, n, o, s, a) {
                if (t.call(this), this.noFrame = !1, r || (this.noFrame = !0, r = new Ce(0, 0, 1, 1)), i instanceof e && (i = i.baseTexture), this.baseTexture = i, this._frame = r, this.trim = o, this.valid = !1, this.requiresUpdate = !1, this._uvs = yi, this.uvMatrix = null, this.orig = n || r, this._rotate = Number(s || 0), !0 === s) this._rotate = 2;
                else if (this._rotate % 2 != 0) throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
                this.defaultAnchor = a ? new ue(a.x, a.y) : new ue(0, 0), this._updateID = 0, this.textureCacheIds = [], i.valid ? this.noFrame ? i.valid && this.onBaseTextureUpdated(i) : this.frame = r : i.once("loaded", this.onBaseTextureUpdated, this), this.noFrame && i.on("update", this.onBaseTextureUpdated, this)
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                resolution: {
                    configurable: !0
                },
                frame: {
                    configurable: !0
                },
                rotate: {
                    configurable: !0
                },
                width: {
                    configurable: !0
                },
                height: {
                    configurable: !0
                }
            };
            return e.prototype.update = function() {
                this.baseTexture.resource && this.baseTexture.resource.update()
            }, e.prototype.onBaseTextureUpdated = function(t) {
                if (this.noFrame) {
                    if (!this.baseTexture.valid) return;
                    this._frame.width = t.width, this._frame.height = t.height, this.valid = !0, this.updateUvs()
                } else this.frame = this._frame;
                this.emit("update", this)
            }, e.prototype.destroy = function(t) {
                if (this.baseTexture) {
                    if (t) {
                        var i = this.baseTexture.resource;
                        i && Jt[i.url] && e.removeFromCache(i.url), this.baseTexture.destroy()
                    }
                    this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null
                }
                this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, e.removeFromCache(this), this.textureCacheIds = null
            }, e.prototype.clone = function() {
                return new e(this.baseTexture, this.frame, this.orig, this.trim, this.rotate, this.defaultAnchor)
            }, e.prototype.updateUvs = function() {
                this._uvs === yi && (this._uvs = new vi), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++
            }, e.from = function(t, i) {
                void 0 === i && (i = {});
                var r = null;
                "string" == typeof t ? r = t : (t._pixiId || (t._pixiId = "pixiid_" + zt()), r = t._pixiId);
                var n = Jt[r];
                return n || (i.resolution || (i.resolution = oe(t)), (n = new e(new ni(t, i))).baseTexture.cacheId = r, ni.addToCache(n.baseTexture, r), e.addToCache(n, r)), n
            }, e.fromBuffer = function(t, i, r, n) {
                return new e(ni.fromBuffer(t, i, r, n))
            }, e.fromLoader = function(t, i, r) {
                var n = new $e(t);
                n.url = i;
                var o = new e(new ni(n, {
                    scaleMode: g.SCALE_MODE,
                    resolution: oe(i)
                }));
                return r || (r = i), ni.addToCache(o.baseTexture, r), e.addToCache(o, r), r !== i && (ni.addToCache(o.baseTexture, i), e.addToCache(o, i)), o
            }, e.addToCache = function(t, e) {
                e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e), Jt[e] && console.warn("Texture added to the cache with an id [" + e + "] that already had an entry"), Jt[e] = t)
            }, e.removeFromCache = function(t) {
                if ("string" == typeof t) {
                    var e = Jt[t];
                    if (e) {
                        var i = e.textureCacheIds.indexOf(t);
                        return i > -1 && e.textureCacheIds.splice(i, 1), delete Jt[t], e
                    }
                } else if (t && t.textureCacheIds) {
                    for (var r = 0; r < t.textureCacheIds.length; ++r) Jt[t.textureCacheIds[r]] === t && delete Jt[t.textureCacheIds[r]];
                    return t.textureCacheIds.length = 0, t
                }
                return null
            }, i.resolution.get = function() {
                return this.baseTexture.resolution
            }, i.frame.get = function() {
                return this._frame
            }, i.frame.set = function(t) {
                this._frame = t, this.noFrame = !1;
                var e = t.x,
                    i = t.y,
                    r = t.width,
                    n = t.height,
                    o = e + r > this.baseTexture.width,
                    s = i + n > this.baseTexture.height;
                if (o || s) {
                    var a = o && s ? "and" : "or",
                        h = "X: " + e + " + " + r + " = " + (e + r) + " > " + this.baseTexture.width,
                        u = "Y: " + i + " + " + n + " = " + (i + n) + " > " + this.baseTexture.height;
                    throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: " + h + " " + a + " " + u)
                }
                this.valid = r && n && this.baseTexture.valid, this.trim || this.rotate || (this.orig = t), this.valid && this.updateUvs()
            }, i.rotate.get = function() {
                return this._rotate
            }, i.rotate.set = function(t) {
                this._rotate = t, this.valid && this.updateUvs()
            }, i.width.get = function() {
                return this.orig.width
            }, i.height.get = function() {
                return this.orig.height
            }, Object.defineProperties(e.prototype, i), e
        }(v);

    function bi(t) {
        t.destroy = function() {}, t.on = function() {}, t.once = function() {}, t.emit = function() {}
    }
    _i.EMPTY = new _i(new ni), bi(_i.EMPTY), bi(_i.EMPTY.baseTexture), _i.WHITE = function() {
        var t = document.createElement("canvas");
        t.width = 16, t.height = 16;
        var e = t.getContext("2d");
        return e.fillStyle = "white", e.fillRect(0, 0, 16, 16), new _i(new ni(new si(t)))
    }(), bi(_i.WHITE), bi(_i.WHITE.baseTexture);
    var xi = function(t) {
            function e(e, i) {
                var r = null;
                if (!(e instanceof gi)) {
                    var n = arguments[1],
                        o = arguments[2],
                        s = arguments[3],
                        a = arguments[4];
                    console.warn("Please use RenderTexture.create(" + n + ", " + o + ") instead of the ctor directly."), r = arguments[0], i = null, e = new gi({
                        width: n,
                        height: o,
                        scaleMode: s,
                        resolution: a
                    })
                }
                t.call(this, e, i), this.legacyRenderer = r, this.valid = !0, this.filterFrame = null, this.filterPoolKey = null, this.updateUvs()
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.resize = function(t, e, i) {
                void 0 === i && (i = !0), t = Math.ceil(t), e = Math.ceil(e), this.valid = t > 0 && e > 0, this._frame.width = this.orig.width = t, this._frame.height = this.orig.height = e, i && this.baseTexture.resize(t, e), this.updateUvs()
            }, e.prototype.setResolution = function(t) {
                var e = this.baseTexture;
                e.resolution !== t && (e.setResolution(t), this.resize(e.width, e.height, !1))
            }, e.create = function(t) {
                return "number" == typeof t && (t = {
                    width: t,
                    height: arguments[1],
                    scaleMode: arguments[2],
                    resolution: arguments[3]
                }), new e(new gi(t))
            }, e
        }(_i),
        wi = function(t) {
            this.texturePool = {}, this.textureOptions = t || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0
        };
    wi.prototype.createTexture = function(t, e) {
        var i = new gi(Object.assign({
            width: t,
            height: e,
            resolution: 1
        }, this.textureOptions));
        return new xi(i)
    }, wi.prototype.getOptimalTexture = function(t, e, i) {
        void 0 === i && (i = 1);
        var r = wi.SCREEN_KEY;
        t *= i, e *= i, this.enableFullScreen && t === this._pixelsWidth && e === this._pixelsHeight || (r = (65535 & (t = Yt(t))) << 16 | 65535 & (e = Yt(e))), this.texturePool[r] || (this.texturePool[r] = []);
        var n = this.texturePool[r].pop();
        return n || (n = this.createTexture(t, e)), n.filterPoolKey = r, n.setResolution(i), n
    }, wi.prototype.getFilterTexture = function(t, e) {
        var i = this.getOptimalTexture(t.width, t.height, e || t.resolution);
        return i.filterFrame = t.filterFrame, i
    }, wi.prototype.returnTexture = function(t) {
        var e = t.filterPoolKey;
        t.filterFrame = null, this.texturePool[e].push(t)
    }, wi.prototype.returnFilterTexture = function(t) {
        this.returnTexture(t)
    }, wi.prototype.clear = function(t) {
        if (t = !1 !== t)
            for (var e in this.texturePool) {
                var i = this.texturePool[e];
                if (i)
                    for (var r = 0; r < i.length; r++) i[r].destroy(!0)
            }
        this.texturePool = {}
    }, wi.prototype.setScreenSize = function(t) {
        if (t.width !== this._pixelsWidth || t.height !== this._pixelsHeight) {
            var e = wi.SCREEN_KEY,
                i = this.texturePool[e];
            if (this.enableFullScreen = t.width > 0 && t.height > 0, i)
                for (var r = 0; r < i.length; r++) i[r].destroy(!0);
            this.texturePool[e] = [], this._pixelsWidth = t.width, this._pixelsHeight = t.height
        }
    }, wi.SCREEN_KEY = "screen";
    var Ti = function(t, e, i, r, n, o, s) {
        void 0 === i && (i = !1), void 0 === r && (r = 5126), this.buffer = t, this.size = e, this.normalized = i, this.type = r, this.stride = n, this.start = o, this.instance = s
    };
    Ti.prototype.destroy = function() {
        this.buffer = null
    }, Ti.from = function(t, e, i, r, n) {
        return new Ti(t, e, i, r, n)
    };
    var Si = 0,
        Ei = function(t, e, i) {
            void 0 === e && (e = !0), void 0 === i && (i = !1), this.data = t || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = i, this.static = e, this.id = Si++, this.disposeRunner = new Ge("disposeBuffer", 2)
        };

    function Pi(t) {
        if (4 === t.BYTES_PER_ELEMENT) return t instanceof Float32Array ? "Float32Array" : t instanceof Uint32Array ? "Uint32Array" : "Int32Array";
        if (2 === t.BYTES_PER_ELEMENT) {
            if (t instanceof Uint16Array) return "Uint16Array"
        } else if (1 === t.BYTES_PER_ELEMENT && t instanceof Uint8Array) return "Uint8Array";
        return null
    }
    Ei.prototype.update = function(t) {
        this.data = t || this.data, this._updateID++
    }, Ei.prototype.dispose = function() {
        this.disposeRunner.run(this, !1)
    }, Ei.prototype.destroy = function() {
        this.dispose(), this.data = null
    }, Ei.from = function(t) {
        return t instanceof Array && (t = new Float32Array(t)), new Ei(t)
    };
    var Ii = {
            Float32Array: Float32Array,
            Uint32Array: Uint32Array,
            Int32Array: Int32Array,
            Uint8Array: Uint8Array
        },
        Ci = {
            5126: 4,
            5123: 2,
            5121: 1
        },
        Ai = 0,
        Mi = {
            Float32Array: Float32Array,
            Uint32Array: Uint32Array,
            Int32Array: Int32Array,
            Uint8Array: Uint8Array,
            Uint16Array: Uint16Array
        },
        Oi = function(t, e) {
            void 0 === t && (t = []), void 0 === e && (e = {}), this.buffers = t, this.indexBuffer = null, this.attributes = e, this.glVertexArrayObjects = {}, this.id = Ai++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new Ge("disposeGeometry", 2), this.refCount = 0
        };
    Oi.prototype.addAttribute = function(t, e, i, r, n, o, s, a) {
        if (void 0 === r && (r = !1), void 0 === a && (a = !1), !e) throw new Error("You must pass a buffer when creating an attribute");
        e.data || (e instanceof Array && (e = new Float32Array(e)), e = new Ei(e));
        var h = t.split("|");
        if (h.length > 1) {
            for (var u = 0; u < h.length; u++) this.addAttribute(h[u], e, i, r, n);
            return this
        }
        var l = this.buffers.indexOf(e);
        return -1 === l && (this.buffers.push(e), l = this.buffers.length - 1), this.attributes[t] = new Ti(l, i, r, n, o, s, a), this.instanced = this.instanced || a, this
    }, Oi.prototype.getAttribute = function(t) {
        return this.attributes[t]
    }, Oi.prototype.getBuffer = function(t) {
        return this.buffers[this.getAttribute(t).buffer]
    }, Oi.prototype.addIndex = function(t) {
        return t.data || (t instanceof Array && (t = new Uint16Array(t)), t = new Ei(t)), t.index = !0, this.indexBuffer = t, -1 === this.buffers.indexOf(t) && this.buffers.push(t), this
    }, Oi.prototype.getIndex = function() {
        return this.indexBuffer
    }, Oi.prototype.interleave = function() {
        if (1 === this.buffers.length || 2 === this.buffers.length && this.indexBuffer) return this;
        var t, e = [],
            i = [],
            r = new Ei;
        for (t in this.attributes) {
            var n = this.attributes[t],
                o = this.buffers[n.buffer];
            e.push(o.data), i.push(n.size * Ci[n.type] / 4), n.buffer = 0
        }
        for (r.data = function(t, e) {
                for (var i = 0, r = 0, n = {}, o = 0; o < t.length; o++) r += e[o], i += t[o].length;
                for (var s = new ArrayBuffer(4 * i), a = null, h = 0, u = 0; u < t.length; u++) {
                    var l = e[u],
                        c = t[u],
                        d = Pi(c);
                    n[d] || (n[d] = new Ii[d](s)), a = n[d];
                    for (var p = 0; p < c.length; p++) a[(p / l | 0) * r + h + p % l] = c[p];
                    h += l
                }
                return new Float32Array(s)
            }(e, i), t = 0; t < this.buffers.length; t++) this.buffers[t] !== this.indexBuffer && this.buffers[t].destroy();
        return this.buffers = [r], this.indexBuffer && this.buffers.push(this.indexBuffer), this
    }, Oi.prototype.getSize = function() {
        for (var t in this.attributes) {
            var e = this.attributes[t];
            return this.buffers[e.buffer].data.length / (e.stride / 4 || e.size)
        }
        return 0
    }, Oi.prototype.dispose = function() {
        this.disposeRunner.run(this, !1)
    }, Oi.prototype.destroy = function() {
        this.dispose(), this.buffers = null, this.indexBuffer.destroy(), this.attributes = null
    }, Oi.prototype.clone = function() {
        for (var t = new Oi, e = 0; e < this.buffers.length; e++) t.buffers[e] = new Ei(this.buffers[e].data.slice());
        for (var i in this.attributes) {
            var r = this.attributes[i];
            t.attributes[i] = new Ti(r.buffer, r.size, r.normalized, r.type, r.stride, r.start, r.instance)
        }
        return this.indexBuffer && (t.indexBuffer = t.buffers[this.buffers.indexOf(this.indexBuffer)], t.indexBuffer.index = !0), t
    }, Oi.merge = function(t) {
        for (var e, i = new Oi, r = [], n = [], o = [], s = 0; s < t.length; s++) {
            e = t[s];
            for (var a = 0; a < e.buffers.length; a++) n[a] = n[a] || 0, n[a] += e.buffers[a].data.length, o[a] = 0
        }
        for (var h = 0; h < e.buffers.length; h++) r[h] = new(Mi[Pi(e.buffers[h].data)])(n[h]), i.buffers[h] = new Ei(r[h]);
        for (var u = 0; u < t.length; u++) {
            e = t[u];
            for (var l = 0; l < e.buffers.length; l++) r[l].set(e.buffers[l].data, o[l]), o[l] += e.buffers[l].data.length
        }
        if (i.attributes = e.attributes, e.indexBuffer) {
            i.indexBuffer = i.buffers[e.buffers.indexOf(e.indexBuffer)], i.indexBuffer.index = !0;
            for (var c = 0, d = 0, p = 0, f = 0, m = 0; m < e.buffers.length; m++)
                if (e.buffers[m] !== e.indexBuffer) {
                    f = m;
                    break
                }
            for (var g in e.attributes) {
                var v = e.attributes[g];
                (0 | v.buffer) === f && (d += v.size * Ci[v.type] / 4)
            }
            for (var y = 0; y < t.length; y++) {
                for (var _ = t[y].indexBuffer.data, b = 0; b < _.length; b++) i.indexBuffer.data[b + p] += c;
                c += e.buffers[f].data.length / d, p += _.length
            }
        }
        return i
    };
    var Ri = function(t) {
            function e() {
                t.call(this), this.addAttribute("aVertexPosition", [0, 0, 1, 0, 1, 1, 0, 1]).addIndex([0, 1, 3, 2])
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
        }(Oi),
        Di = function(t) {
            function e() {
                t.call(this), this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.vertexBuffer = new Ei(this.vertices), this.uvBuffer = new Ei(this.uvs), this.addAttribute("aVertexPosition", this.vertexBuffer).addAttribute("aTextureCoord", this.uvBuffer).addIndex([0, 1, 2, 0, 2, 3])
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.map = function(t, e) {
                var i = 0,
                    r = 0;
                return this.uvs[0] = i, this.uvs[1] = r, this.uvs[2] = i + e.width / t.width, this.uvs[3] = r, this.uvs[4] = i + e.width / t.width, this.uvs[5] = r + e.height / t.height, this.uvs[6] = i, this.uvs[7] = r + e.height / t.height, i = e.x, r = e.y, this.vertices[0] = i, this.vertices[1] = r, this.vertices[2] = i + e.width, this.vertices[3] = r, this.vertices[4] = i + e.width, this.vertices[5] = r + e.height, this.vertices[6] = i, this.vertices[7] = r + e.height, this.invalidate(), this
            }, e.prototype.invalidate = function() {
                return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this
            }, e
        }(Oi),
        Fi = 0,
        Li = function(t, e) {
            this.uniforms = t, this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = Fi++, this.static = !!e
        };
    Li.prototype.update = function() {
        this.dirtyId++
    }, Li.prototype.add = function(t, e, i) {
        this.uniforms[t] = new Li(e, i)
    }, Li.from = function(t, e) {
        return new Li(t, e)
    };
    var Bi = function() {
        this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.sourceFrame = new Ce, this.destinationFrame = new Ce, this.filters = []
    };
    Bi.prototype.clear = function() {
        this.target = null, this.filters = null, this.renderTexture = null
    };
    var ki = function(t) {
            function e(e) {
                t.call(this, e), this.defaultFilterStack = [{}], this.texturePool = new wi, this.texturePool.setScreenSize(e.view), this.statePool = [], this.quad = new Ri, this.quadUv = new Di, this.tempRect = new Ce, this.activeState = {}, this.globalUniforms = new Li({
                    outputFrame: this.tempRect,
                    inputSize: new Float32Array(4),
                    inputPixel: new Float32Array(4),
                    inputClamp: new Float32Array(4),
                    resolution: 1,
                    filterArea: new Float32Array(4),
                    filterClamp: new Float32Array(4)
                }, !0), this._pixelsWidth = e.view.width, this._pixelsHeight = e.view.height
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.push = function(t, e) {
                for (var i = this.renderer, r = this.defaultFilterStack, n = this.statePool.pop() || new Bi, o = e[0].resolution, s = e[0].padding, a = e[0].autoFit, h = e[0].legacy, u = 1; u < e.length; u++) {
                    var l = e[u];
                    o = Math.min(o, l.resolution), s = Math.max(s, l.padding), a = a || l.autoFit, h = h || l.legacy
                }
                1 === r.length && (this.defaultFilterStack[0].renderTexture = i.renderTexture.current), r.push(n), n.resolution = o, n.legacy = h, n.target = t, n.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)), n.sourceFrame.pad(s), a && n.sourceFrame.fit(this.renderer.renderTexture.sourceFrame), n.sourceFrame.ceil(o), n.renderTexture = this.getOptimalFilterTexture(n.sourceFrame.width, n.sourceFrame.height, o), n.filters = e, n.destinationFrame.width = n.renderTexture.width, n.destinationFrame.height = n.renderTexture.height, n.renderTexture.filterFrame = n.sourceFrame, i.renderTexture.bind(n.renderTexture, n.sourceFrame), i.renderTexture.clear()
            }, e.prototype.pop = function() {
                var t = this.defaultFilterStack,
                    e = t.pop(),
                    i = e.filters;
                this.activeState = e;
                var r = this.globalUniforms.uniforms;
                r.outputFrame = e.sourceFrame, r.resolution = e.resolution;
                var n = r.inputSize,
                    o = r.inputPixel,
                    s = r.inputClamp;
                if (n[0] = e.destinationFrame.width, n[1] = e.destinationFrame.height, n[2] = 1 / n[0], n[3] = 1 / n[1], o[0] = n[0] * e.resolution, o[1] = n[1] * e.resolution, o[2] = 1 / o[0], o[3] = 1 / o[1], s[0] = .5 * o[2], s[1] = .5 * o[3], s[2] = e.sourceFrame.width * n[2] - .5 * o[2], s[3] = e.sourceFrame.height * n[3] - .5 * o[3], e.legacy) {
                    var a = r.filterArea;
                    a[0] = e.destinationFrame.width, a[1] = e.destinationFrame.height, a[2] = e.sourceFrame.x, a[3] = e.sourceFrame.y, r.filterClamp = r.inputClamp
                }
                this.globalUniforms.update();
                var h = t[t.length - 1];
                if (1 === i.length) i[0].apply(this, e.renderTexture, h.renderTexture, !1, e), this.returnFilterTexture(e.renderTexture);
                else {
                    var u = e.renderTexture,
                        l = this.getOptimalFilterTexture(u.width, u.height, e.resolution);
                    l.filterFrame = u.filterFrame;
                    var c = 0;
                    for (c = 0; c < i.length - 1; ++c) {
                        i[c].apply(this, u, l, !0, e);
                        var d = u;
                        u = l, l = d
                    }
                    i[c].apply(this, u, h.renderTexture, !1, e), this.returnFilterTexture(u), this.returnFilterTexture(l)
                }
                e.clear(), this.statePool.push(e)
            }, e.prototype.applyFilter = function(t, e, i, r) {
                var n = this.renderer;
                n.renderTexture.bind(i, i ? i.filterFrame : null), r && n.renderTexture.clear(), t.uniforms.uSampler = e, t.uniforms.filterGlobals = this.globalUniforms, n.state.set(t.state), n.shader.bind(t), t.legacy ? (this.quadUv.map(e._frame, e.filterFrame), n.geometry.bind(this.quadUv), n.geometry.draw(_t.TRIANGLES)) : (n.geometry.bind(this.quad), n.geometry.draw(_t.TRIANGLE_STRIP))
            }, e.prototype.calculateSpriteMatrix = function(t, e) {
                var i = this.activeState,
                    r = i.sourceFrame,
                    n = i.destinationFrame,
                    o = e._texture.orig,
                    s = t.set(n.width, 0, 0, n.height, r.x, r.y),
                    a = e.worldTransform.copyTo(ge.TEMP_MATRIX);
                return a.invert(), s.prepend(a), s.scale(1 / o.width, 1 / o.height), s.translate(e.anchor.x, e.anchor.y), s
            }, e.prototype.destroy = function() {
                this.texturePool.clear(!1)
            }, e.prototype.getOptimalFilterTexture = function(t, e, i) {
                return void 0 === i && (i = 1), this.texturePool.getOptimalTexture(t, e, i)
            }, e.prototype.getFilterTexture = function(t, e) {
                if ("number" == typeof t) {
                    var i = t;
                    t = e, e = i
                }
                t = t || this.activeState.renderTexture;
                var r = this.texturePool.getOptimalTexture(t.width, t.height, e || t.resolution);
                return r.filterFrame = t.filterFrame, r
            }, e.prototype.returnFilterTexture = function(t) {
                this.texturePool.returnTexture(t)
            }, e.prototype.emptyPool = function() {
                this.texturePool.clear(!0)
            }, e.prototype.resize = function() {
                this.texturePool.setScreenSize(this.renderer.view)
            }, e
        }(di),
        Ni = function(t) {
            this.renderer = t
        };
    Ni.prototype.flush = function() {}, Ni.prototype.destroy = function() {
        this.renderer = null
    }, Ni.prototype.start = function() {}, Ni.prototype.stop = function() {
        this.flush()
    }, Ni.prototype.render = function(t) {};
    var Ui = function(t) {
        function e(e) {
            t.call(this, e), this.emptyRenderer = new Ni(e), this.currentRenderer = this.emptyRenderer
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.setObjectRenderer = function(t) {
            this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start())
        }, e.prototype.flush = function() {
            this.setObjectRenderer(this.emptyRenderer)
        }, e.prototype.reset = function() {
            this.setObjectRenderer(this.emptyRenderer)
        }, e
    }(di);
    g.PREFER_ENV = m.any ? gt.WEBGL : gt.WEBGL2;
    var ji = 0,
        Xi = function(t) {
            function e(e) {
                t.call(this, e), this.webGLVersion = 1, this.extensions = {}, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), e.view.addEventListener("webglcontextlost", this.handleContextLost, !1), e.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1)
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                isLost: {
                    configurable: !0
                }
            };
            return i.isLost.get = function() {
                return !this.gl || this.gl.isContextLost()
            }, e.prototype.contextChange = function(t) {
                this.gl = t, this.renderer.gl = t, this.renderer.CONTEXT_UID = ji++, t.isContextLost() && t.getExtension("WEBGL_lose_context") && t.getExtension("WEBGL_lose_context").restoreContext()
            }, e.prototype.initFromContext = function(t) {
                this.gl = t, this.validateContext(t), this.renderer.gl = t, this.renderer.CONTEXT_UID = ji++, this.renderer.runners.contextChange.run(t)
            }, e.prototype.initFromOptions = function(t) {
                var e = this.createContext(this.renderer.view, t);
                this.initFromContext(e)
            }, e.prototype.createContext = function(t, e) {
                var i;
                if (g.PREFER_ENV >= gt.WEBGL2 && (i = t.getContext("webgl2", e)), i) this.webGLVersion = 2;
                else if (this.webGLVersion = 1, !(i = t.getContext("webgl", e) || t.getContext("experimental-webgl", e))) throw new Error("This browser does not support WebGL. Try using the canvas renderer");
                return this.gl = i, this.getExtensions(), i
            }, e.prototype.getExtensions = function() {
                var t = this.gl;
                1 === this.webGLVersion ? Object.assign(this.extensions, {
                    drawBuffers: t.getExtension("WEBGL_draw_buffers"),
                    depthTexture: t.getExtension("WEBKIT_WEBGL_depth_texture"),
                    loseContext: t.getExtension("WEBGL_lose_context"),
                    vertexArrayObject: t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object"),
                    anisotropicFiltering: t.getExtension("EXT_texture_filter_anisotropic"),
                    uint32ElementIndex: t.getExtension("OES_element_index_uint"),
                    floatTexture: t.getExtension("OES_texture_float"),
                    floatTextureLinear: t.getExtension("OES_texture_float_linear"),
                    textureHalfFloat: t.getExtension("OES_texture_half_float"),
                    textureHalfFloatLinear: t.getExtension("OES_texture_half_float_linear")
                }) : 2 === this.webGLVersion && Object.assign(this.extensions, {
                    anisotropicFiltering: t.getExtension("EXT_texture_filter_anisotropic"),
                    colorBufferFloat: t.getExtension("EXT_color_buffer_float"),
                    floatTextureLinear: t.getExtension("OES_texture_float_linear")
                })
            }, e.prototype.handleContextLost = function(t) {
                t.preventDefault()
            }, e.prototype.handleContextRestored = function() {
                this.renderer.runners.contextChange.run(this.gl)
            }, e.prototype.destroy = function() {
                var t = this.renderer.view;
                t.removeEventListener("webglcontextlost", this.handleContextLost), t.removeEventListener("webglcontextrestored", this.handleContextRestored), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext()
            }, e.prototype.postrender = function() {
                this.gl.flush()
            }, e.prototype.validateContext = function(t) {
                t.getContextAttributes().stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly")
            }, Object.defineProperties(e.prototype, i), e
        }(di),
        Gi = function(t) {
            function e(e) {
                t.call(this, e), this.managedFramebuffers = [], this.unknownFramebuffer = new fi(10, 10)
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                size: {
                    configurable: !0
                }
            };
            return e.prototype.contextChange = function() {
                var t = this.gl = this.renderer.gl;
                if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new Ce, this.hasMRT = !0, this.writeDepthTexture = !0, this.disposeAll(!0), 1 === this.renderer.context.webGLVersion) {
                    var e = this.renderer.context.extensions.drawBuffers,
                        i = this.renderer.context.extensions.depthTexture;
                    g.PREFER_ENV === gt.WEBGL_LEGACY && (e = null, i = null), e ? t.drawBuffers = function(t) {
                        return e.drawBuffersWEBGL(t)
                    } : (this.hasMRT = !1, t.drawBuffers = function() {}), i || (this.writeDepthTexture = !1)
                }
            }, e.prototype.bind = function(t, e) {
                var i = this.gl;
                if (t) {
                    var r = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
                    this.current !== t && (this.current = t, i.bindFramebuffer(i.FRAMEBUFFER, r.framebuffer)), r.dirtyId !== t.dirtyId && (r.dirtyId = t.dirtyId, r.dirtyFormat !== t.dirtyFormat ? (r.dirtyFormat = t.dirtyFormat, this.updateFramebuffer(t)) : r.dirtySize !== t.dirtySize && (r.dirtySize = t.dirtySize, this.resizeFramebuffer(t)));
                    for (var n = 0; n < t.colorTextures.length; n++) t.colorTextures[n].texturePart ? this.renderer.texture.unbind(t.colorTextures[n].texture) : this.renderer.texture.unbind(t.colorTextures[n]);
                    t.depthTexture && this.renderer.texture.unbind(t.depthTexture), e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, t.width, t.height)
                } else this.current && (this.current = null, i.bindFramebuffer(i.FRAMEBUFFER, null)), e ? this.setViewport(e.x, e.y, e.width, e.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height)
            }, e.prototype.setViewport = function(t, e, i, r) {
                var n = this.viewport;
                n.width === i && n.height === r && n.x === t && n.y === e || (n.x = t, n.y = e, n.width = i, n.height = r, this.gl.viewport(t, e, i, r))
            }, i.size.get = function() {
                return this.current ? {
                    x: 0,
                    y: 0,
                    width: this.current.width,
                    height: this.current.height
                } : {
                    x: 0,
                    y: 0,
                    width: this.renderer.width,
                    height: this.renderer.height
                }
            }, e.prototype.clear = function(t, e, i, r) {
                var n = this.gl;
                n.clearColor(t, e, i, r), n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT)
            }, e.prototype.initFramebuffer = function(t) {
                var e = {
                    framebuffer: this.gl.createFramebuffer(),
                    stencil: null,
                    dirtyId: 0,
                    dirtyFormat: 0,
                    dirtySize: 0
                };
                return t.glFramebuffers[this.CONTEXT_UID] = e, this.managedFramebuffers.push(t), t.disposeRunner.add(this), e
            }, e.prototype.resizeFramebuffer = function(t) {
                var e = this.gl,
                    i = t.glFramebuffers[this.CONTEXT_UID];
                i.stencil && (e.bindRenderbuffer(e.RENDERBUFFER, i.stencil), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height));
                for (var r = t.colorTextures, n = 0; n < r.length; n++) this.renderer.texture.bind(r[n], 0);
                t.depthTexture && this.renderer.texture.bind(t.depthTexture, 0)
            }, e.prototype.updateFramebuffer = function(t) {
                var e = this.gl,
                    i = t.glFramebuffers[this.CONTEXT_UID],
                    r = t.colorTextures.length;
                e.drawBuffers || (r = Math.min(r, 1));
                for (var n = [], o = 0; o < r; o++) {
                    var s = t.colorTextures[o];
                    s.texturePart ? (this.renderer.texture.bind(s.texture, 0), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + o, e.TEXTURE_CUBE_MAP_NEGATIVE_X + s.side, s.texture._glTextures[this.CONTEXT_UID].texture, 0)) : (this.renderer.texture.bind(s, 0), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + o, e.TEXTURE_2D, s._glTextures[this.CONTEXT_UID].texture, 0)), n.push(e.COLOR_ATTACHMENT0 + o)
                }
                if (n.length > 1 && e.drawBuffers(n), t.depthTexture && this.writeDepthTexture) {
                    var a = t.depthTexture;
                    this.renderer.texture.bind(a, 0), e.framebufferTexture2D(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.TEXTURE_2D, a._glTextures[this.CONTEXT_UID].texture, 0)
                }
                i.stencil || !t.stencil && !t.depth || (i.stencil = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, i.stencil), e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, t.width, t.height), t.depthTexture || e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, i.stencil))
            }, e.prototype.disposeFramebuffer = function(t, e) {
                var i = t.glFramebuffers[this.CONTEXT_UID],
                    r = this.gl;
                if (i) {
                    delete t.glFramebuffers[this.CONTEXT_UID];
                    var n = this.managedFramebuffers.indexOf(t);
                    n >= 0 && this.managedFramebuffers.splice(n, 1), t.disposeRunner.remove(this), e || (r.deleteFramebuffer(i.framebuffer), i.stencil && r.deleteRenderbuffer(i.stencil))
                }
            }, e.prototype.disposeAll = function(t) {
                var e = this.managedFramebuffers;
                this.managedFramebuffers = [];
                for (var i = 0; i < e.length; i++) this.disposeFramebuffer(e[i], t)
            }, e.prototype.forceStencil = function() {
                var t = this.current;
                if (t) {
                    var e = t.glFramebuffers[this.CONTEXT_UID];
                    if (e && !e.stencil) {
                        t.enableStencil();
                        var i = t.width,
                            r = t.height,
                            n = this.gl,
                            o = n.createRenderbuffer();
                        n.bindRenderbuffer(n.RENDERBUFFER, o), n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_STENCIL, i, r), e.stencil = o, n.framebufferRenderbuffer(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.RENDERBUFFER, o)
                    }
                }
            }, e.prototype.reset = function() {
                this.current = this.unknownFramebuffer, this.viewport = new Ce
            }, Object.defineProperties(e.prototype, i), e
        }(di),
        Vi = function(t) {
            this.buffer = t, this.updateID = -1, this.byteLength = -1, this.refCount = 0
        },
        Hi = {
            5126: 4,
            5123: 2,
            5121: 1
        },
        zi = function(t) {
            function e(e) {
                t.call(this, e), this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.boundBuffers = {}, this.managedGeometries = {}, this.managedBuffers = {}
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.contextChange = function() {
                this.disposeAll(!0);
                var t = this.gl = this.renderer.gl,
                    e = this.renderer.context;
                if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, !t.createVertexArray) {
                    var i = this.renderer.context.extensions.vertexArrayObject;
                    g.PREFER_ENV === gt.WEBGL_LEGACY && (i = null), i ? (t.createVertexArray = function() {
                        return i.createVertexArrayOES()
                    }, t.bindVertexArray = function(t) {
                        return i.bindVertexArrayOES(t)
                    }, t.deleteVertexArray = function(t) {
                        return i.deleteVertexArrayOES(t)
                    }) : (this.hasVao = !1, t.createVertexArray = function() {}, t.bindVertexArray = function() {}, t.deleteVertexArray = function() {})
                }
                if (!t.vertexAttribDivisor) {
                    var r = t.getExtension("ANGLE_instanced_arrays");
                    r ? (t.vertexAttribDivisor = function(t, e) {
                        return r.vertexAttribDivisorANGLE(t, e)
                    }, t.drawElementsInstanced = function(t, e, i, n, o) {
                        return r.drawElementsInstancedANGLE(t, e, i, n, o)
                    }, t.drawArraysInstanced = function(t, e, i, n) {
                        return r.drawArraysInstancedANGLE(t, e, i, n)
                    }) : this.hasInstance = !1
                }
                this.canUseUInt32ElementIndex = 2 === e.webGLVersion || !!e.extensions.uint32ElementIndex
            }, e.prototype.bind = function(t, e) {
                e = e || this.renderer.shader.shader;
                var i = this.gl,
                    r = t.glVertexArrayObjects[this.CONTEXT_UID];
                r || (this.managedGeometries[t.id] = t, t.disposeRunner.add(this), t.glVertexArrayObjects[this.CONTEXT_UID] = r = {});
                var n = r[e.program.id] || this.initGeometryVao(t, e.program);
                this._activeGeometry = t, this._activeVao !== n && (this._activeVao = n, this.hasVao ? i.bindVertexArray(n) : this.activateVao(t, e.program)), this.updateBuffers()
            }, e.prototype.reset = function() {
                this.unbind()
            }, e.prototype.updateBuffers = function() {
                for (var t = this._activeGeometry, e = this.gl, i = 0; i < t.buffers.length; i++) {
                    var r = t.buffers[i],
                        n = r._glBuffers[this.CONTEXT_UID];
                    if (r._updateID !== n.updateID) {
                        n.updateID = r._updateID;
                        var o = r.index ? e.ELEMENT_ARRAY_BUFFER : e.ARRAY_BUFFER;
                        if (e.bindBuffer(o, n.buffer), this._boundBuffer = n, n.byteLength >= r.data.byteLength) e.bufferSubData(o, 0, r.data);
                        else {
                            var s = r.static ? e.STATIC_DRAW : e.DYNAMIC_DRAW;
                            n.byteLength = r.data.byteLength, e.bufferData(o, r.data, s)
                        }
                    }
                }
            }, e.prototype.checkCompatibility = function(t, e) {
                var i = t.attributes,
                    r = e.attributeData;
                for (var n in r)
                    if (!i[n]) throw new Error('shader and geometry incompatible, geometry missing the "' + n + '" attribute')
            }, e.prototype.getSignature = function(t, e) {
                var i = t.attributes,
                    r = e.attributeData,
                    n = ["g", t.id];
                for (var o in i) r[o] && n.push(o);
                return n.join("-")
            }, e.prototype.initGeometryVao = function(t, e) {
                this.checkCompatibility(t, e);
                var i = this.gl,
                    r = this.CONTEXT_UID,
                    n = this.getSignature(t, e),
                    o = t.glVertexArrayObjects[this.CONTEXT_UID],
                    s = o[n];
                if (s) return o[e.id] = s, s;
                var a = t.buffers,
                    h = t.attributes,
                    u = {},
                    l = {};
                for (var c in a) u[c] = 0, l[c] = 0;
                for (var d in h) !h[d].size && e.attributeData[d] ? h[d].size = e.attributeData[d].size : h[d].size || console.warn("PIXI Geometry attribute '" + d + "' size cannot be determined (likely the bound shader does not have the attribute)"), u[h[d].buffer] += h[d].size * Hi[h[d].type];
                for (var p in h) {
                    var f = h[p],
                        m = f.size;
                    void 0 === f.stride && (u[f.buffer] === m * Hi[f.type] ? f.stride = 0 : f.stride = u[f.buffer]), void 0 === f.start && (f.start = l[f.buffer], l[f.buffer] += m * Hi[f.type])
                }
                s = i.createVertexArray(), i.bindVertexArray(s);
                for (var g = 0; g < a.length; g++) {
                    var v = a[g];
                    v._glBuffers[r] || (v._glBuffers[r] = new Vi(i.createBuffer()), this.managedBuffers[v.id] = v, v.disposeRunner.add(this)), v._glBuffers[r].refCount++
                }
                return this.activateVao(t, e), this._activeVao = s, o[e.id] = s, o[n] = s, s
            }, e.prototype.disposeBuffer = function(t, e) {
                if (this.managedBuffers[t.id]) {
                    delete this.managedBuffers[t.id];
                    var i = t._glBuffers[this.CONTEXT_UID],
                        r = this.gl;
                    t.disposeRunner.remove(this), i && (e || r.deleteBuffer(i.buffer), delete t._glBuffers[this.CONTEXT_UID])
                }
            }, e.prototype.disposeGeometry = function(t, e) {
                if (this.managedGeometries[t.id]) {
                    delete this.managedGeometries[t.id];
                    var i = t.glVertexArrayObjects[this.CONTEXT_UID],
                        r = this.gl,
                        n = t.buffers;
                    if (t.disposeRunner.remove(this), i) {
                        for (var o = 0; o < n.length; o++) {
                            var s = n[o]._glBuffers[this.CONTEXT_UID];
                            s.refCount--, 0 !== s.refCount || e || this.disposeBuffer(n[o], e)
                        }
                        if (!e)
                            for (var a in i)
                                if ("g" === a[0]) {
                                    var h = i[a];
                                    this._activeVao === h && this.unbind(), r.deleteVertexArray(h)
                                }
                        delete t.glVertexArrayObjects[this.CONTEXT_UID]
                    }
                }
            }, e.prototype.disposeAll = function(t) {
                for (var e = Object.keys(this.managedGeometries), i = 0; i < e.length; i++) this.disposeGeometry(this.managedGeometries[e[i]], t);
                e = Object.keys(this.managedBuffers);
                for (var r = 0; r < e.length; r++) this.disposeBuffer(this.managedBuffers[e[r]], t)
            }, e.prototype.activateVao = function(t, e) {
                var i = this.gl,
                    r = this.CONTEXT_UID,
                    n = t.buffers,
                    o = t.attributes;
                t.indexBuffer && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.indexBuffer._glBuffers[r].buffer);
                var s = null;
                for (var a in o) {
                    var h = o[a],
                        u = n[h.buffer]._glBuffers[r];
                    if (e.attributeData[a]) {
                        s !== u && (i.bindBuffer(i.ARRAY_BUFFER, u.buffer), s = u);
                        var l = e.attributeData[a].location;
                        if (i.enableVertexAttribArray(l), i.vertexAttribPointer(l, h.size, h.type || i.FLOAT, h.normalized, h.stride, h.start), h.instance) {
                            if (!this.hasInstance) throw new Error("geometry error, GPU Instancing is not supported on this device");
                            i.vertexAttribDivisor(l, 1)
                        }
                    }
                }
            }, e.prototype.draw = function(t, e, i, r) {
                var n = this.gl,
                    o = this._activeGeometry;
                if (o.indexBuffer) {
                    var s = o.indexBuffer.data.BYTES_PER_ELEMENT,
                        a = 2 === s ? n.UNSIGNED_SHORT : n.UNSIGNED_INT;
                    2 === s || 4 === s && this.canUseUInt32ElementIndex ? o.instanced ? n.drawElementsInstanced(t, e || o.indexBuffer.data.length, a, (i || 0) * s, r || 1) : n.drawElements(t, e || o.indexBuffer.data.length, a, (i || 0) * s) : console.warn("unsupported index buffer type: uint32")
                } else o.instanced ? n.drawArraysInstanced(t, i, e || o.getSize(), r || 1) : n.drawArrays(t, i, e || o.getSize());
                return this
            }, e.prototype.unbind = function() {
                this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null
            }, e
        }(di);

    function Wi(t, e, i, r) {
        var n = Yi(t, t.VERTEX_SHADER, e),
            o = Yi(t, t.FRAGMENT_SHADER, i),
            s = t.createProgram();
        if (t.attachShader(s, n), t.attachShader(s, o), r)
            for (var a in r) t.bindAttribLocation(s, r[a], a);
        return t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."), console.error("gl.VALIDATE_STATUS", t.getProgramParameter(s, t.VALIDATE_STATUS)), console.error("gl.getError()", t.getError()), "" !== t.getProgramInfoLog(s) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(s)), t.deleteProgram(s), s = null), t.deleteShader(n), t.deleteShader(o), s
    }

    function Yi(t, e, i) {
        var r = t.createShader(e);
        return t.shaderSource(r, i), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (console.warn(i), console.error(t.getShaderInfoLog(r)), null)
    }

    function qi(t, e) {
        switch (t) {
            case "float":
                return 0;
            case "vec2":
                return new Float32Array(2 * e);
            case "vec3":
                return new Float32Array(3 * e);
            case "vec4":
                return new Float32Array(4 * e);
            case "int":
            case "sampler2D":
            case "sampler2DArray":
                return 0;
            case "ivec2":
                return new Int32Array(2 * e);
            case "ivec3":
                return new Int32Array(3 * e);
            case "ivec4":
                return new Int32Array(4 * e);
            case "bool":
                return !1;
            case "bvec2":
                return Ki(2 * e);
            case "bvec3":
                return Ki(3 * e);
            case "bvec4":
                return Ki(4 * e);
            case "mat2":
                return new Float32Array([1, 0, 0, 1]);
            case "mat3":
                return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
            case "mat4":
                return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        }
        return null
    }

    function Ki(t) {
        for (var e = new Array(t), i = 0; i < e.length; i++) e[i] = !1;
        return e
    }
    var Zi, Ji = {},
        Qi = Ji;

    function $i() {
        if (Qi === Ji || Qi.isContextLost()) {
            var t, e = document.createElement("canvas");
            g.PREFER_ENV >= gt.WEBGL2 && (t = e.getContext("webgl2", {})), t || ((t = e.getContext("webgl", {}) || e.getContext("experimental-webgl", {})) ? t.getExtension("WEBGL_draw_buffers") : t = null), Qi = t
        }
        return Qi
    }

    function tr(t, e, i) {
        if ("precision" !== t.substring(0, 9)) {
            var r = e;
            return e === It.HIGH && i !== It.HIGH && (r = It.MEDIUM), "precision " + r + " float;\n" + t
        }
        return i !== It.HIGH && "precision highp" === t.substring(0, 15) ? t.replace("precision highp", "precision mediump") : t
    }
    var er = {
        float: 1,
        vec2: 2,
        vec3: 3,
        vec4: 4,
        int: 1,
        ivec2: 2,
        ivec3: 3,
        ivec4: 4,
        bool: 1,
        bvec2: 2,
        bvec3: 3,
        bvec4: 4,
        mat2: 4,
        mat3: 9,
        mat4: 16,
        sampler2D: 1
    };

    function ir(t) {
        return er[t]
    }
    var rr = null,
        nr = {
            FLOAT: "float",
            FLOAT_VEC2: "vec2",
            FLOAT_VEC3: "vec3",
            FLOAT_VEC4: "vec4",
            INT: "int",
            INT_VEC2: "ivec2",
            INT_VEC3: "ivec3",
            INT_VEC4: "ivec4",
            BOOL: "bool",
            BOOL_VEC2: "bvec2",
            BOOL_VEC3: "bvec3",
            BOOL_VEC4: "bvec4",
            FLOAT_MAT2: "mat2",
            FLOAT_MAT3: "mat3",
            FLOAT_MAT4: "mat4",
            SAMPLER_2D: "sampler2D",
            SAMPLER_CUBE: "samplerCube",
            SAMPLER_2D_ARRAY: "sampler2DArray"
        };

    function or(t, e) {
        if (!rr) {
            var i = Object.keys(nr);
            rr = {};
            for (var r = 0; r < i.length; ++r) {
                var n = i[r];
                rr[t[n]] = nr[n]
            }
        }
        return rr[e]
    }
    var sr, ar = {
            float: "\n    if(cv !== v)\n    {\n        cv.v = v;\n        gl.uniform1f(location, v)\n    }",
            vec2: "\n    if(cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        gl.uniform2f(location, v[0], v[1])\n    }",
            vec3: "\n    if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3f(location, v[0], v[1], v[2])\n    }",
            vec4: "gl.uniform4f(location, v[0], v[1], v[2], v[3])",
            int: "gl.uniform1i(location, v)",
            ivec2: "gl.uniform2i(location, v[0], v[1])",
            ivec3: "gl.uniform3i(location, v[0], v[1], v[2])",
            ivec4: "gl.uniform4i(location, v[0], v[1], v[2], v[3])",
            bool: "gl.uniform1i(location, v)",
            bvec2: "gl.uniform2i(location, v[0], v[1])",
            bvec3: "gl.uniform3i(location, v[0], v[1], v[2])",
            bvec4: "gl.uniform4i(location, v[0], v[1], v[2], v[3])",
            mat2: "gl.uniformMatrix2fv(location, false, v)",
            mat3: "gl.uniformMatrix3fv(location, false, v)",
            mat4: "gl.uniformMatrix4fv(location, false, v)",
            sampler2D: "gl.uniform1i(location, v)",
            samplerCube: "gl.uniform1i(location, v)",
            sampler2DArray: "gl.uniform1i(location, v)"
        },
        hr = {
            float: "gl.uniform1fv(location, v)",
            vec2: "gl.uniform2fv(location, v)",
            vec3: "gl.uniform3fv(location, v)",
            vec4: "gl.uniform4fv(location, v)",
            mat4: "gl.uniformMatrix4fv(location, false, v)",
            mat3: "gl.uniformMatrix3fv(location, false, v)",
            mat2: "gl.uniformMatrix2fv(location, false, v)",
            int: "gl.uniform1iv(location, v)",
            ivec2: "gl.uniform2iv(location, v)",
            ivec3: "gl.uniform3iv(location, v)",
            ivec4: "gl.uniform4iv(location, v)",
            bool: "gl.uniform1iv(location, v)",
            bvec2: "gl.uniform2iv(location, v)",
            bvec3: "gl.uniform3iv(location, v)",
            bvec4: "gl.uniform4iv(location, v)",
            sampler2D: "gl.uniform1iv(location, v)",
            samplerCube: "gl.uniform1iv(location, v)",
            sampler2DArray: "gl.uniform1iv(location, v)"
        },
        ur = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n");

    function lr(t, e) {
        if (0 === t) throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
        for (var i = e.createShader(e.FRAGMENT_SHADER);;) {
            var r = ur.replace(/%forloop%/gi, cr(t));
            if (e.shaderSource(i, r), e.compileShader(i), e.getShaderParameter(i, e.COMPILE_STATUS)) break;
            t = t / 2 | 0
        }
        return t
    }

    function cr(t) {
        for (var e = "", i = 0; i < t; ++i) i > 0 && (e += "\nelse "), i < t - 1 && (e += "if(test == " + i + ".0){}");
        return e
    }
    var dr = 0,
        pr = {},
        fr = function t(e, i, r) {
            void 0 === r && (r = "pixi-shader"), this.id = dr++, this.vertexSrc = e || t.defaultVertexSrc, this.fragmentSrc = i || t.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), "#version" !== this.vertexSrc.substring(0, 8) && (r = r.replace(/\s+/g, "-"), pr[r] ? (pr[r]++, r += "-" + pr[r]) : pr[r] = 1, this.vertexSrc = "#define SHADER_NAME " + r + "\n" + this.vertexSrc, this.fragmentSrc = "#define SHADER_NAME " + r + "\n" + this.fragmentSrc, this.vertexSrc = tr(this.vertexSrc, g.PRECISION_VERTEX, It.HIGH), this.fragmentSrc = tr(this.fragmentSrc, g.PRECISION_FRAGMENT, function() {
                if (!Zi) {
                    Zi = It.MEDIUM;
                    var t = $i();
                    if (t && t.getShaderPrecisionFormat) {
                        var e = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT);
                        Zi = e.precision ? It.HIGH : It.MEDIUM
                    }
                }
                return Zi
            }())), this.extractData(this.vertexSrc, this.fragmentSrc), this.glPrograms = {}, this.syncUniforms = null
        },
        mr = {
            defaultVertexSrc: {
                configurable: !0
            },
            defaultFragmentSrc: {
                configurable: !0
            }
        };
    fr.prototype.extractData = function(t, e) {
        var i = $i();
        if (i) {
            var r = Wi(i, t, e);
            this.attributeData = this.getAttributeData(r, i), this.uniformData = this.getUniformData(r, i), i.deleteProgram(r)
        } else this.uniformData = {}, this.attributeData = {}
    }, fr.prototype.getAttributeData = function(t, e) {
        for (var i = {}, r = [], n = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), o = 0; o < n; o++) {
            var s = e.getActiveAttrib(t, o),
                a = or(e, s.type),
                h = {
                    type: a,
                    name: s.name,
                    size: ir(a),
                    location: 0
                };
            i[s.name] = h, r.push(h)
        }
        r.sort(function(t, e) {
            return t.name > e.name ? 1 : -1
        });
        for (var u = 0; u < r.length; u++) r[u].location = u;
        return i
    }, fr.prototype.getUniformData = function(t, e) {
        for (var i = {}, r = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), n = 0; n < r; n++) {
            var o = e.getActiveUniform(t, n),
                s = o.name.replace(/\[.*?\]/, ""),
                a = o.name.match(/\[.*?\]/, ""),
                h = or(e, o.type);
            i[s] = {
                type: h,
                size: o.size,
                isArray: a,
                value: qi(h, o.size)
            }
        }
        return i
    }, mr.defaultVertexSrc.get = function() {
        return "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n"
    }, mr.defaultFragmentSrc.get = function() {
        return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}"
    }, fr.from = function(t, e, i) {
        var r = t + e,
            n = Zt[r];
        return n || (Zt[r] = n = new fr(t, e, i)), n
    }, Object.defineProperties(fr, mr);
    var gr = function(t, e) {
            for (var i in this.program = t, this.uniformGroup = e ? e instanceof Li ? e : new Li(e) : new Li({}), t.uniformData) this.uniformGroup.uniforms[i] instanceof Array && (this.uniformGroup.uniforms[i] = new Float32Array(this.uniformGroup.uniforms[i]))
        },
        vr = {
            uniforms: {
                configurable: !0
            }
        };
    gr.prototype.checkUniformExists = function(t, e) {
        if (e.uniforms[t]) return !0;
        for (var i in e.uniforms) {
            var r = e.uniforms[i];
            if (r.group && this.checkUniformExists(t, r)) return !0
        }
        return !1
    }, gr.prototype.destroy = function() {
        this.uniformGroup = null
    }, vr.uniforms.get = function() {
        return this.uniformGroup.uniforms
    }, gr.from = function(t, e, i) {
        var r = fr.from(t, e);
        return new gr(r, i)
    }, Object.defineProperties(gr.prototype, vr);
    var yr = function() {
            this.data = 0, this.blendMode = yt.NORMAL, this.polygonOffset = 0, this.blend = !0
        },
        _r = {
            blend: {
                configurable: !0
            },
            offsets: {
                configurable: !0
            },
            culling: {
                configurable: !0
            },
            depthTest: {
                configurable: !0
            },
            clockwiseFrontFace: {
                configurable: !0
            },
            blendMode: {
                configurable: !0
            },
            polygonOffset: {
                configurable: !0
            }
        };
    _r.blend.get = function() {
        return !!(1 & this.data)
    }, _r.blend.set = function(t) {
        !!(1 & this.data) !== t && (this.data ^= 1)
    }, _r.offsets.get = function() {
        return !!(2 & this.data)
    }, _r.offsets.set = function(t) {
        !!(2 & this.data) !== t && (this.data ^= 2)
    }, _r.culling.get = function() {
        return !!(4 & this.data)
    }, _r.culling.set = function(t) {
        !!(4 & this.data) !== t && (this.data ^= 4)
    }, _r.depthTest.get = function() {
        return !!(8 & this.data)
    }, _r.depthTest.set = function(t) {
        !!(8 & this.data) !== t && (this.data ^= 8)
    }, _r.clockwiseFrontFace.get = function() {
        return !!(16 & this.data)
    }, _r.clockwiseFrontFace.set = function(t) {
        !!(16 & this.data) !== t && (this.data ^= 16)
    }, _r.blendMode.get = function() {
        return this._blendMode
    }, _r.blendMode.set = function(t) {
        this.blend = t !== yt.NONE, this._blendMode = t
    }, _r.polygonOffset.get = function() {
        return this._polygonOffset
    }, _r.polygonOffset.set = function(t) {
        this.offsets = !!t, this._polygonOffset = t
    }, yr.for2d = function() {
        var t = new yr;
        return t.depthTest = !1, t.blend = !0, t
    }, Object.defineProperties(yr.prototype, _r);
    var br = function(t) {
        function e(i, r, n) {
            var o = fr.from(i || e.defaultVertexSrc, r || e.defaultFragmentSrc);
            t.call(this, o, n), this.padding = 0, this.resolution = g.FILTER_RESOLUTION, this.enabled = !0, this.autoFit = !0, this.legacy = !!this.program.attributeData.aTextureCoord, this.state = new yr
        }
        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var i = {
                blendMode: {
                    configurable: !0
                }
            },
            r = {
                defaultVertexSrc: {
                    configurable: !0
                },
                defaultFragmentSrc: {
                    configurable: !0
                }
            };
        return e.prototype.apply = function(t, e, i, r, n) {
            t.applyFilter(this, e, i, r, n)
        }, i.blendMode.get = function() {
            return this.state.blendMode
        }, i.blendMode.set = function(t) {
            this.state.blendMode = t
        }, r.defaultVertexSrc.get = function() {
            return "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n"
        }, r.defaultFragmentSrc.get = function() {
            return "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"
        }, Object.defineProperties(e.prototype, i), Object.defineProperties(e, r), e
    }(gr);
    br.SOURCE_KEY_MAP = {};
    var xr = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n",
        wr = "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n",
        Tr = new ge,
        Sr = function(t, e) {
            this._texture = t, this.mapCoord = new ge, this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._updateID = -1, this.clampOffset = 0, this.clampMargin = void 0 === e ? .5 : e, this.isSimple = !1
        },
        Er = {
            texture: {
                configurable: !0
            }
        };
    Er.texture.get = function() {
        return this._texture
    }, Er.texture.set = function(t) {
        this._texture = t, this._updateID = -1
    }, Sr.prototype.multiplyUvs = function(t, e) {
        void 0 === e && (e = t);
        for (var i = this.mapCoord, r = 0; r < t.length; r += 2) {
            var n = t[r],
                o = t[r + 1];
            e[r] = n * i.a + o * i.c + i.tx, e[r + 1] = n * i.b + o * i.d + i.ty
        }
        return e
    }, Sr.prototype.update = function(t) {
        var e = this._texture;
        if (!e || !e.valid) return !1;
        if (!t && this._updateID === e._updateID) return !1;
        this._updateID = e._updateID;
        var i = e._uvs;
        this.mapCoord.set(i.x1 - i.x0, i.y1 - i.y0, i.x3 - i.x0, i.y3 - i.y0, i.x0, i.y0);
        var r = e.orig,
            n = e.trim;
        n && (Tr.set(r.width / n.width, 0, 0, r.height / n.height, -n.x / n.width, -n.y / n.height), this.mapCoord.append(Tr));
        var o = e.baseTexture,
            s = this.uClampFrame,
            a = this.clampMargin / o.resolution,
            h = this.clampOffset;
        return s[0] = (e._frame.x + a + h) / o.width, s[1] = (e._frame.y + a + h) / o.height, s[2] = (e._frame.x + e._frame.width - a + h) / o.width, s[3] = (e._frame.y + e._frame.height - a + h) / o.height, this.uClampOffset[0] = h / o.realWidth, this.uClampOffset[1] = h / o.realHeight, this.isSimple = e._frame.width === o.width && e._frame.height === o.height && 0 === e.rotate, !0
    }, Object.defineProperties(Sr.prototype, Er);
    var Pr = function(t) {
            function e(e) {
                var i = new ge;
                t.call(this, xr, wr), e.renderable = !1, this.maskSprite = e, this.maskMatrix = i
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.apply = function(t, e, i, r) {
                var n = this.maskSprite,
                    o = this.maskSprite.texture;
                o.valid && (o.transform || (o.transform = new Sr(o, 0)), o.transform.update(), this.uniforms.npmAlpha = o.baseTexture.premultiplyAlpha ? 0 : 1, this.uniforms.mask = o, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, n).prepend(o.transform.mapCoord), this.uniforms.alpha = n.worldAlpha, this.uniforms.maskClamp = o.transform.uClampFrame, t.applyFilter(this, e, i, r))
            }, e
        }(br),
        Ir = function(t) {
            function e(e) {
                t.call(this, e), this.scissor = !1, this.scissorData = null, this.scissorRenderTarget = null, this.enableScissor = !1, this.alphaMaskPool = [], this.alphaMaskIndex = 0
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.push = function(t, e) {
                if (e.isSprite) this.pushSpriteMask(t, e);
                else if (this.enableScissor && !this.scissor && this.renderer._activeRenderTarget.root && !this.renderer.stencil.stencilMaskStack.length && e.isFastRect()) {
                    var i = e.worldTransform,
                        r = Math.atan2(i.b, i.a);
                    (r = Math.round(r * (180 / Math.PI))) % 90 ? this.pushStencilMask(e) : this.pushScissorMask(t, e)
                } else this.pushStencilMask(e)
            }, e.prototype.pop = function(t, e) {
                e.isSprite ? this.popSpriteMask(t, e) : this.enableScissor && !this.renderer.stencil.stencilMaskStack.length ? this.popScissorMask(t, e) : this.popStencilMask(t, e)
            }, e.prototype.pushSpriteMask = function(t, e) {
                var i = this.alphaMaskPool[this.alphaMaskIndex];
                i || (i = this.alphaMaskPool[this.alphaMaskIndex] = [new Pr(e)]), i[0].resolution = this.renderer.resolution, i[0].maskSprite = e;
                var r = t.filterArea;
                t.filterArea = e.getBounds(!0), this.renderer.filter.push(t, i), t.filterArea = r, this.alphaMaskIndex++
            }, e.prototype.popSpriteMask = function() {
                this.renderer.filter.pop(), this.alphaMaskIndex--
            }, e.prototype.pushStencilMask = function(t) {
                this.renderer.batch.flush(), this.renderer.stencil.pushStencil(t)
            }, e.prototype.popStencilMask = function() {
                this.renderer.stencil.popStencil()
            }, e.prototype.pushScissorMask = function(t, e) {
                e.renderable = !0;
                var i = this.renderer._activeRenderTarget,
                    r = e.getBounds();
                r.fit(i.size), e.renderable = !1, this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
                var n = this.renderer.resolution;
                this.renderer.gl.scissor(r.x * n, (i.root ? i.size.height - r.y - r.height : r.y) * n, r.width * n, r.height * n), this.scissorRenderTarget = i, this.scissorData = e, this.scissor = !0
            }, e.prototype.popScissorMask = function() {
                this.scissorRenderTarget = null, this.scissorData = null, this.scissor = !1;
                var t = this.renderer.gl;
                t.disable(t.SCISSOR_TEST)
            }, e
        }(di),
        Cr = function(t) {
            function e(e) {
                t.call(this, e), this.stencilMaskStack = []
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.setMaskStack = function(t) {
                var e = this.renderer.gl,
                    i = this.stencilMaskStack.length;
                this.stencilMaskStack = t, t.length !== i && (0 === t.length ? e.disable(e.STENCIL_TEST) : (e.enable(e.STENCIL_TEST), this._useCurrent()))
            }, e.prototype.pushStencil = function(t) {
                var e = this.renderer.gl,
                    i = this.stencilMaskStack.length;
                0 === i && (this.renderer.framebuffer.forceStencil(), e.enable(e.STENCIL_TEST)), this.stencilMaskStack.push(t), e.colorMask(!1, !1, !1, !1), e.stencilFunc(e.EQUAL, i, this._getBitwiseMask()), e.stencilOp(e.KEEP, e.KEEP, e.INCR), t.renderable = !0, t.render(this.renderer), this.renderer.batch.flush(), t.renderable = !1, this._useCurrent()
            }, e.prototype.popStencil = function() {
                var t = this.renderer.gl,
                    e = this.stencilMaskStack.pop();
                0 === this.stencilMaskStack.length ? (t.disable(t.STENCIL_TEST), t.clear(t.STENCIL_BUFFER_BIT), t.clearStencil(0)) : (t.colorMask(!1, !1, !1, !1), t.stencilOp(t.KEEP, t.KEEP, t.DECR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), e.renderable = !1, this._useCurrent())
            }, e.prototype._useCurrent = function() {
                var t = this.renderer.gl;
                t.colorMask(!0, !0, !0, !0), t.stencilFunc(t.EQUAL, this.stencilMaskStack.length, this._getBitwiseMask()), t.stencilOp(t.KEEP, t.KEEP, t.KEEP)
            }, e.prototype._getBitwiseMask = function() {
                return (1 << this.stencilMaskStack.length) - 1
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this, this), this.stencilMaskStack = null
            }, e
        }(di),
        Ar = function(t) {
            function e(e) {
                t.call(this, e), this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new ge, this.transform = null
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.update = function(t, e, i, r) {
                this.destinationFrame = t || this.destinationFrame || this.defaultFrame, this.sourceFrame = e || this.sourceFrame || t, this.calculateProjection(this.destinationFrame, this.sourceFrame, i, r), this.transform && this.projectionMatrix.append(this.transform);
                var n = this.renderer;
                n.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, n.globalUniforms.update(), n.shader.shader && n.shader.syncUniformGroup(n.shader.shader.uniforms.globals)
            }, e.prototype.calculateProjection = function(t, e, i, r) {
                var n = this.projectionMatrix;
                r ? (n.a = 1 / t.width * 2 * i, n.d = -1 / t.height * 2 * i, n.tx = -1 - e.x * n.a, n.ty = 1 - e.y * n.d) : (n.a = 1 / t.width * 2 * i, n.d = 1 / t.height * 2 * i, n.tx = -1 - e.x * n.a, n.ty = -1 - e.y * n.d)
            }, e.prototype.setTransform = function() {}, e
        }(di),
        Mr = new Ce,
        Or = function(t) {
            function e(e) {
                t.call(this, e), this.clearColor = e._backgroundColorRgba, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new Ce, this.destinationFrame = new Ce
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.bind = function(t, e, i) {
                void 0 === t && (t = null), this.current = t;
                var r, n = this.renderer;
                if (t) {
                    var o = t.baseTexture;
                    r = o.resolution, i || (Mr.width = o.realWidth, Mr.height = o.realHeight, i = Mr), e || (e = i), this.renderer.framebuffer.bind(o.framebuffer, i), this.renderer.projection.update(i, e, r, !1), this.renderer.stencil.setMaskStack(o.stencilMaskStack)
                } else r = this.renderer.resolution, i || (Mr.width = n.width, Mr.height = n.height, i = Mr), e || (e = i), n.framebuffer.bind(null, i), this.renderer.projection.update(i, e, r, !0), this.renderer.stencil.setMaskStack(this.defaultMaskStack);
                this.sourceFrame.copyFrom(e), this.destinationFrame.x = i.x / r, this.destinationFrame.y = i.y / r, this.destinationFrame.width = i.width / r, this.destinationFrame.height = i.height / r, e === i && this.sourceFrame.copyFrom(this.destinationFrame)
            }, e.prototype.clear = function(t) {
                t = this.current ? t || this.current.baseTexture.clearColor : t || this.clearColor, this.renderer.framebuffer.clear(t[0], t[1], t[2], t[3])
            }, e.prototype.resize = function() {
                this.bind(null)
            }, e.prototype.reset = function() {
                this.bind(null)
            }, e
        }(di),
        Rr = function(t, e) {
            this.program = t, this.uniformData = e, this.uniformGroups = {}
        };
    Rr.prototype.destroy = function() {
        this.uniformData = null, this.uniformGroups = null, this.program = null
    };
    var Dr = 0,
        Fr = function(t) {
            function e(e) {
                t.call(this, e), this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this.id = Dr++
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.systemCheck = function() {
                if (! function() {
                        if ("boolean" == typeof sr) return sr;
                        try {
                            var t = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
                            sr = !0 === t({
                                a: "b"
                            }, "a", "b")
                        } catch (t) {
                            sr = !1
                        }
                        return sr
                    }()) throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")
            }, e.prototype.contextChange = function(t) {
                this.gl = t, this.reset()
            }, e.prototype.bind = function(t, e) {
                t.uniforms.globals = this.renderer.globalUniforms;
                var i = t.program,
                    r = i.glPrograms[this.renderer.CONTEXT_UID] || this.generateShader(t);
                return this.shader = t, this.program !== i && (this.program = i, this.gl.useProgram(r.program)), e || this.syncUniformGroup(t.uniformGroup), r
            }, e.prototype.setUniforms = function(t) {
                var e = this.shader.program,
                    i = e.glPrograms[this.renderer.CONTEXT_UID];
                e.syncUniforms(i.uniformData, t, this.renderer)
            }, e.prototype.syncUniformGroup = function(t) {
                var e = this.getglProgram();
                t.static && t.dirtyId === e.uniformGroups[t.id] || (e.uniformGroups[t.id] = t.dirtyId, this.syncUniforms(t, e))
            }, e.prototype.syncUniforms = function(t, e) {
                (t.syncUniforms[this.shader.program.id] || this.createSyncGroups(t))(e.uniformData, t.uniforms, this.renderer)
            }, e.prototype.createSyncGroups = function(t) {
                var e = this.getSignature(t, this.shader.program.uniformData);
                return this.cache[e] || (this.cache[e] = function(t, e) {
                    var i = 0,
                        r = "var v = null;\n    var cv = null\n    var gl = renderer.gl";
                    for (var n in t.uniforms) {
                        var o = e[n];
                        o ? "float" === o.type && 1 === o.size ? r += "\n            if(uv." + n + " !== ud." + n + ".value)\n            {\n                ud." + n + ".value = uv." + n + "\n                gl.uniform1f(ud." + n + ".location, uv." + n + ")\n            }\n" : "sampler2D" !== o.type && "samplerCube" !== o.type && "sampler2DArray" !== o.type || 1 !== o.size || o.isArray ? "mat3" === o.type && 1 === o.size ? void 0 !== t.uniforms[n].a ? r += "\n                gl.uniformMatrix3fv(ud." + n + ".location, false, uv." + n + ".toArray(true));\n                \n" : r += "\n                gl.uniformMatrix3fv(ud." + n + ".location, false, uv." + n + ");\n                \n" : "vec2" === o.type && 1 === o.size ? void 0 !== t.uniforms[n].x ? r += "\n                cv = ud." + n + ".value;\n                v = uv." + n + ";\n\n                if(cv[0] !== v.x || cv[1] !== v.y)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    gl.uniform2f(ud." + n + ".location, v.x, v.y);\n                }\n" : r += "\n                cv = ud." + n + ".value;\n                v = uv." + n + ";\n\n                if(cv[0] !== v[0] || cv[1] !== v[1])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    gl.uniform2f(ud." + n + ".location, v[0], v[1]);\n                }\n                \n" : "vec4" === o.type && 1 === o.size ? void 0 !== t.uniforms[n].width ? r += "\n                cv = ud." + n + ".value;\n                v = uv." + n + ";\n\n                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    cv[2] = v.width;\n                    cv[3] = v.height;\n                    gl.uniform4f(ud." + n + ".location, v.x, v.y, v.width, v.height)\n                }\n" : r += "\n                cv = ud." + n + ".value;\n                v = uv." + n + ";\n\n                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    cv[2] = v[2];\n                    cv[3] = v[3];\n\n                    gl.uniform4f(ud." + n + ".location, v[0], v[1], v[2], v[3])\n                }\n                \n" : r += "\n            cv = ud." + n + ".value;\n            v = uv." + n + ";\n            " + (1 === o.size ? ar : hr)[o.type].replace("location", "ud." + n + ".location") + ";\n" : (r += "\n            renderer.texture.bind(uv." + n + ", " + i + ");\n\n            if(ud." + n + ".value !== " + i + ")\n            {\n                ud." + n + ".value = " + i + ";\n                gl.uniform1i(ud." + n + ".location, " + i + ");\n; // eslint-disable-line max-len\n            }\n", i++) : t.uniforms[n].group && (r += "\n                    renderer.shader.syncUniformGroup(uv." + n + ");\n                ")
                    }
                    return new Function("ud", "uv", "renderer", r)
                }(t, this.shader.program.uniformData)), t.syncUniforms[this.shader.program.id] = this.cache[e], t.syncUniforms[this.shader.program.id]
            }, e.prototype.getSignature = function(t, e) {
                var i = t.uniforms,
                    r = [];
                for (var n in i) r.push(n), e[n] && r.push(e[n].type);
                return r.join("-")
            }, e.prototype.getglProgram = function() {
                return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null
            }, e.prototype.generateShader = function(t) {
                var e = this.gl,
                    i = t.program,
                    r = {};
                for (var n in i.attributeData) r[n] = i.attributeData[n].location;
                var o = Wi(e, i.vertexSrc, i.fragmentSrc, r),
                    s = {};
                for (var a in i.uniformData) {
                    var h = i.uniformData[a];
                    s[a] = {
                        location: e.getUniformLocation(o, a),
                        value: qi(h.type, h.size)
                    }
                }
                var u = new Rr(o, s);
                return i.glPrograms[this.renderer.CONTEXT_UID] = u, u
            }, e.prototype.reset = function() {
                this.program = null, this.shader = null
            }, e.prototype.destroy = function() {
                this.destroyed = !0
            }, e
        }(di),
        Lr = 0,
        Br = 1,
        kr = 2,
        Nr = 3,
        Ur = 4,
        jr = function(t) {
            function e(e) {
                t.call(this, e), this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = yt.NONE, this._blendEq = !1, this.map = [], this.map[Lr] = this.setBlend, this.map[Br] = this.setOffset, this.map[kr] = this.setCullFace, this.map[Nr] = this.setDepthTest, this.map[Ur] = this.setFrontFace, this.checks = [], this.defaultState = new yr, this.defaultState.blend = !0, this.defaultState.depth = !0
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.contextChange = function(t) {
                this.gl = t, this.blendModes = function(t, e) {
                    return void 0 === e && (e = []), e[yt.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.ADD] = [t.ONE, t.ONE], e[yt.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.SCREEN] = [t.ONE, t.ONE_MINUS_SRC_COLOR, t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.NONE] = [0, 0], e[yt.NORMAL_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.ADD_NPM] = [t.SRC_ALPHA, t.ONE, t.ONE, t.ONE], e[yt.SCREEN_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_COLOR, t.ONE, t.ONE_MINUS_SRC_ALPHA], e[yt.SRC_IN] = [t.DST_ALPHA, t.ZERO], e[yt.SRC_OUT] = [t.ONE_MINUS_DST_ALPHA, t.ZERO], e[yt.SRC_ATOP] = [t.DST_ALPHA, t.ONE_MINUS_SRC_ALPHA], e[yt.DST_OVER] = [t.ONE_MINUS_DST_ALPHA, t.ONE], e[yt.DST_IN] = [t.ZERO, t.SRC_ALPHA], e[yt.DST_OUT] = [t.ZERO, t.ONE_MINUS_SRC_ALPHA], e[yt.DST_ATOP] = [t.ONE_MINUS_DST_ALPHA, t.SRC_ALPHA], e[yt.SUBTRACT] = [t.ONE, t.ONE, t.ONE, t.ONE, t.FUNC_REVERSE_SUBTRACT, t.FUNC_ADD], e
                }(t), this.set(this.defaultState), this.reset()
            }, e.prototype.set = function(t) {
                if (t = t || this.defaultState, this.stateId !== t.data) {
                    for (var e = this.stateId ^ t.data, i = 0; e;) 1 & e && this.map[i].call(this, !!(t.data & 1 << i)), e >>= 1, i++;
                    this.stateId = t.data
                }
                for (var r = 0; r < this.checks.length; r++) this.checks[r](this, t)
            }, e.prototype.forceState = function(t) {
                t = t || this.defaultState;
                for (var e = 0; e < this.map.length; e++) this.map[e].call(this, !!(t.data & 1 << e));
                for (var i = 0; i < this.checks.length; i++) this.checks[i](this, t);
                this.stateId = t.data
            }, e.prototype.setBlend = function(t) {
                this.updateCheck(e.checkBlendMode, t), this.gl[t ? "enable" : "disable"](this.gl.BLEND)
            }, e.prototype.setOffset = function(t) {
                this.updateCheck(e.checkPolygonOffset, t), this.gl[t ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL)
            }, e.prototype.setDepthTest = function(t) {
                this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST)
            }, e.prototype.setCullFace = function(t) {
                this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE)
            }, e.prototype.setFrontFace = function(t) {
                this.gl.frontFace(this.gl[t ? "CW" : "CCW"])
            }, e.prototype.setBlendMode = function(t) {
                if (t !== this.blendMode) {
                    this.blendMode = t;
                    var e = this.blendModes[t],
                        i = this.gl;
                    2 === e.length ? i.blendFunc(e[0], e[1]) : i.blendFuncSeparate(e[0], e[1], e[2], e[3]), 6 === e.length ? (this._blendEq = !0, i.blendEquationSeparate(e[4], e[5])) : this._blendEq && (this._blendEq = !1, i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD))
                }
            }, e.prototype.setPolygonOffset = function(t, e) {
                this.gl.polygonOffset(t, e)
            }, e.prototype.reset = function() {
                this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(0), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0)
            }, e.prototype.updateCheck = function(t, e) {
                var i = this.checks.indexOf(t);
                e && -1 === i ? this.checks.push(t) : e || -1 === i || this.checks.splice(i, 1)
            }, e.checkBlendMode = function(t, e) {
                t.setBlendMode(e.blendMode)
            }, e.checkPolygonOffset = function(t, e) {
                t.setPolygonOffset(e.polygonOffset, 0)
            }, e
        }(di),
        Xr = function(t) {
            function e(e) {
                t.call(this, e), this.count = 0, this.checkCount = 0, this.maxIdle = g.GC_MAX_IDLE, this.checkCountMax = g.GC_MAX_CHECK_COUNT, this.mode = g.GC_MODE
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.postrender = function() {
                this.count++, this.mode !== Pt.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run()))
            }, e.prototype.run = function() {
                for (var t = this.renderer.texture, e = t.managedTextures, i = !1, r = 0; r < e.length; r++) {
                    var n = e[r];
                    !n.framebuffer && this.count - n.touched > this.maxIdle && (t.destroyTexture(n, !0), e[r] = null, i = !0)
                }
                if (i) {
                    for (var o = 0, s = 0; s < e.length; s++) null !== e[s] && (e[o++] = e[s]);
                    e.length = o
                }
            }, e.prototype.unload = function(t) {
                var e = this.renderer.textureSystem;
                t._texture && t._texture._glRenderTargets && e.destroyTexture(t._texture);
                for (var i = t.children.length - 1; i >= 0; i--) this.unload(t.children[i])
            }, e
        }(di),
        Gr = function(t) {
            this.texture = t, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = 6408, this.internalFormat = 5121
        },
        Vr = function(t) {
            function e(e) {
                t.call(this, e), this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new ni
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.contextChange = function() {
                var t = this.gl = this.renderer.gl;
                this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion;
                var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
                this.boundTextures.length = e;
                for (var i = 0; i < e; i++) this.boundTextures[i] = null;
                this.emptyTextures = {};
                var r = new Gr(t.createTexture());
                t.bindTexture(t.TEXTURE_2D, r.texture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[t.TEXTURE_2D] = r, this.emptyTextures[t.TEXTURE_CUBE_MAP] = new Gr(t.createTexture()), t.bindTexture(t.TEXTURE_CUBE_MAP, this.emptyTextures[t.TEXTURE_CUBE_MAP].texture);
                for (var n = 0; n < 6; n++) t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, null);
                t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR);
                for (var o = 0; o < this.boundTextures.length; o++) this.bind(null, o)
            }, e.prototype.bind = function(t, e) {
                void 0 === e && (e = 0);
                var i = this.gl;
                if (t) {
                    if ((t = t.baseTexture || t).valid) {
                        t.touched = this.renderer.textureGC.count;
                        var r = t._glTextures[this.CONTEXT_UID] || this.initTexture(t);
                        this.currentLocation !== e && (this.currentLocation = e, i.activeTexture(i.TEXTURE0 + e)), this.boundTextures[e] !== t && i.bindTexture(t.target, r.texture), r.dirtyId !== t.dirtyId && this.updateTexture(t), this.boundTextures[e] = t
                    }
                } else this.currentLocation !== e && (this.currentLocation = e, i.activeTexture(i.TEXTURE0 + e)), i.bindTexture(i.TEXTURE_2D, this.emptyTextures[i.TEXTURE_2D].texture), this.boundTextures[e] = null
            }, e.prototype.reset = function() {
                this._unknownBoundTextures = !0, this.currentLocation = -1;
                for (var t = 0; t < this.boundTextures.length; t++) this.boundTextures[t] = this.unknownTexture
            }, e.prototype.unbind = function(t) {
                var e = this.gl,
                    i = this.boundTextures;
                if (this._unknownBoundTextures) {
                    this._unknownBoundTextures = !1;
                    for (var r = 0; r < i.length; r++) i[r] === this.unknownTexture && this.bind(null, r)
                }
                for (var n = 0; n < i.length; n++) i[n] === t && (this.currentLocation !== n && (e.activeTexture(e.TEXTURE0 + n), this.currentLocation = n), e.bindTexture(e.TEXTURE_2D, this.emptyTextures[t.target].texture), i[n] = null)
            }, e.prototype.initTexture = function(t) {
                var e = new Gr(this.gl.createTexture());
                return e.dirtyId = -1, t._glTextures[this.CONTEXT_UID] = e, this.managedTextures.push(t), t.on("dispose", this.destroyTexture, this), e
            }, e.prototype.initTextureType = function(t, e) {
                if (e.internalFormat = t.format, e.type = t.type, 2 === this.webGLVersion) {
                    var i = this.renderer.gl;
                    t.type === i.FLOAT && t.format === i.RGBA && (e.internalFormat = i.RGBA32F), t.type === wt.HALF_FLOAT && (e.type = i.HALF_FLOAT), e.type === i.HALF_FLOAT && t.format === i.RGBA && (e.internalFormat = i.RGBA16F)
                }
            }, e.prototype.updateTexture = function(t) {
                var e = t._glTextures[this.CONTEXT_UID];
                if (e) {
                    var i = this.renderer;
                    if (this.initTextureType(t, e), t.resource && t.resource.upload(i, t, e));
                    else {
                        var r = t.realWidth,
                            n = t.realHeight,
                            o = i.gl;
                        (e.width !== r || e.height !== n || e.dirtyId < 0) && (e.width = r, e.height = n, o.texImage2D(t.target, 0, e.internalFormat, r, n, 0, t.format, e.type, null))
                    }
                    t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t), e.dirtyId = t.dirtyId
                }
            }, e.prototype.destroyTexture = function(t, e) {
                var i = this.gl;
                if ((t = t.baseTexture || t)._glTextures[this.CONTEXT_UID] && (this.unbind(t), i.deleteTexture(t._glTextures[this.CONTEXT_UID].texture), t.off("dispose", this.destroyTexture, this), delete t._glTextures[this.CONTEXT_UID], !e)) {
                    var r = this.managedTextures.indexOf(t); - 1 !== r && Vt(this.managedTextures, r, 1)
                }
            }, e.prototype.updateTextureStyle = function(t) {
                var e = t._glTextures[this.CONTEXT_UID];
                e && (t.mipmap !== Et.POW2 && 2 === this.webGLVersion || t.isPowerOfTwo ? (e.mipmap = t.mipmap >= 1, e.wrapMode = t.wrapMode) : (e.mipmap = 0, e.wrapMode = St.CLAMP), t.resource && t.resource.style(this.renderer, t, e) || this.setStyle(t, e), e.dirtyStyleId = t.dirtyStyleId)
            }, e.prototype.setStyle = function(t, e) {
                var i = this.gl;
                if (e.mipmap && i.generateMipmap(t.target), i.texParameteri(t.target, i.TEXTURE_WRAP_S, e.wrapMode), i.texParameteri(t.target, i.TEXTURE_WRAP_T, e.wrapMode), e.mipmap) {
                    i.texParameteri(t.target, i.TEXTURE_MIN_FILTER, t.scaleMode ? i.LINEAR_MIPMAP_LINEAR : i.NEAREST_MIPMAP_NEAREST);
                    var r = this.renderer.context.extensions.anisotropicFiltering;
                    if (r && t.anisotropicLevel > 0 && t.scaleMode === Tt.LINEAR) {
                        var n = Math.min(t.anisotropicLevel, i.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
                        i.texParameterf(t.target, r.TEXTURE_MAX_ANISOTROPY_EXT, n)
                    }
                } else i.texParameteri(t.target, i.TEXTURE_MIN_FILTER, t.scaleMode ? i.LINEAR : i.NEAREST);
                i.texParameteri(t.target, i.TEXTURE_MAG_FILTER, t.scaleMode ? i.LINEAR : i.NEAREST)
            }, e
        }(di),
        Hr = {
            FilterSystem: ki,
            BatchSystem: Ui,
            ContextSystem: Xi,
            FramebufferSystem: Gi,
            GeometrySystem: zi,
            MaskSystem: Ir,
            StencilSystem: Cr,
            ProjectionSystem: Ar,
            RenderTextureSystem: Or,
            ShaderSystem: Fr,
            StateSystem: jr,
            TextureGCSystem: Xr,
            TextureSystem: Vr
        },
        zr = new ge,
        Wr = function(t) {
            function e(e, i) {
                t.call(this), (i = Object.assign({}, g.RENDER_OPTIONS, i)).roundPixels && (g.ROUND_PIXELS = i.roundPixels, ae("5.0.0", "Renderer roundPixels option is deprecated, please use PIXI.settings.ROUND_PIXELS", 2)), this.options = i, this.type = vt.UNKNOWN, this.screen = new Ce(0, 0, i.width, i.height), this.view = i.view || document.createElement("canvas"), this.resolution = i.resolution || g.RESOLUTION, this.transparent = i.transparent, this.autoDensity = i.autoDensity || i.autoResize || !1, this.preserveDrawingBuffer = i.preserveDrawingBuffer, this.clearBeforeRender = i.clearBeforeRender, this._backgroundColor = 0, this._backgroundColorRgba = [0, 0, 0, 0], this._backgroundColorString = "#000000", this.backgroundColor = i.backgroundColor || this._backgroundColor, this._tempDisplayObjectParent = new Ne, this._lastObjectRendered = this._tempDisplayObjectParent, this.plugins = {}
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                width: {
                    configurable: !0
                },
                height: {
                    configurable: !0
                },
                backgroundColor: {
                    configurable: !0
                }
            };
            return e.prototype.initPlugins = function(t) {
                for (var e in t) this.plugins[e] = new t[e](this)
            }, i.width.get = function() {
                return this.view.width
            }, i.height.get = function() {
                return this.view.height
            }, e.prototype.resize = function(t, e) {
                this.screen.width = t, this.screen.height = e, this.view.width = t * this.resolution, this.view.height = e * this.resolution, this.autoDensity && (this.view.style.width = t + "px", this.view.style.height = e + "px")
            }, e.prototype.generateTexture = function(t, e, i, r) {
                0 === (r = r || t.getLocalBounds()).width && (r.width = 1), 0 === r.height && (r.height = 1);
                var n = xi.create(0 | r.width, 0 | r.height, e, i);
                return zr.tx = -r.x, zr.ty = -r.y, this.render(t, n, !1, zr, !!t.parent), n
            }, e.prototype.destroy = function(t) {
                for (var e in this.plugins) this.plugins[e].destroy(), this.plugins[e] = null;
                t && this.view.parentNode && this.view.parentNode.removeChild(this.view), this.plugins = null, this.type = vt.UNKNOWN, this.view = null, this.screen = null, this.resolution = 0, this.transparent = !1, this.autoDensity = !1, this.blendModes = null, this.options = null, this.preserveDrawingBuffer = !1, this.clearBeforeRender = !1, this._backgroundColor = 0, this._backgroundColorRgba = null, this._backgroundColorString = null, this._tempDisplayObjectParent = null, this._lastObjectRendered = null
            }, i.backgroundColor.get = function() {
                return this._backgroundColor
            }, i.backgroundColor.set = function(t) {
                this._backgroundColor = t, this._backgroundColorString = Ft(t), Dt(t, this._backgroundColorRgba)
            }, Object.defineProperties(e.prototype, i), e
        }(v),
        Yr = function(t) {
            function e(i) {
                void 0 === i && (i = {}), t.call(this, "WebGL", i), i = this.options, this.type = vt.WEBGL, this.gl = null, this.CONTEXT_UID = 0, this.runners = {
                    destroy: new Ge("destroy"),
                    contextChange: new Ge("contextChange", 1),
                    reset: new Ge("reset"),
                    update: new Ge("update"),
                    postrender: new Ge("postrender"),
                    prerender: new Ge("prerender"),
                    resize: new Ge("resize", 2)
                }, this.globalUniforms = new Li({
                    projectionMatrix: new ge
                }, !0), this.addSystem(Ir, "mask").addSystem(Xi, "context").addSystem(jr, "state").addSystem(Fr, "shader").addSystem(Vr, "texture").addSystem(zi, "geometry").addSystem(Gi, "framebuffer").addSystem(Cr, "stencil").addSystem(Ar, "projection").addSystem(Xr, "textureGC").addSystem(ki, "filter").addSystem(Or, "renderTexture").addSystem(Ui, "batch"), this.initPlugins(e.__plugins), i.context ? this.context.initFromContext(i.context) : this.context.initFromOptions({
                    alpha: this.transparent,
                    antialias: i.antialias,
                    premultipliedAlpha: this.transparent && "notMultiplied" !== this.transparent,
                    stencil: !0,
                    preserveDrawingBuffer: i.preserveDrawingBuffer,
                    powerPreference: this.options.powerPreference
                }), this.renderingToScreen = !0, Ot(2 === this.context.webGLVersion ? "WebGL 2" : "WebGL 1"), this.resize(this.options.width, this.options.height)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.create = function(t) {
                if (Rt()) return new e(t);
                throw new Error('WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.')
            }, e.prototype.addSystem = function(t, e) {
                e || (e = t.name);
                var i = new t(this);
                if (this[e]) throw new Error('Whoops! The name "' + e + '" is already in use');
                for (var r in this[e] = i, this.runners) this.runners[r].add(i);
                return this
            }, e.prototype.render = function(t, e, i, r, n) {
                if (this.renderingToScreen = !e, this.runners.prerender.run(), this.emit("prerender"), this.projection.transform = r, !this.context.isLost) {
                    if (e || (this._lastObjectRendered = t), !n) {
                        var o = t.parent;
                        t.parent = this._tempDisplayObjectParent, t.updateTransform(), t.parent = o
                    }
                    this.renderTexture.bind(e), this.batch.currentRenderer.start(), (void 0 !== i ? i : this.clearBeforeRender) && this.renderTexture.clear(), t.render(this), this.batch.currentRenderer.flush(), e && e.baseTexture.update(), this.runners.postrender.run(), this.projection.transform = null, this.emit("postrender")
                }
            }, e.prototype.resize = function(e, i) {
                t.prototype.resize.call(this, e, i), this.runners.resize.run(e, i)
            }, e.prototype.reset = function() {
                return this.runners.reset.run(), this
            }, e.prototype.clear = function() {
                this.framebuffer.bind(), this.framebuffer.clear()
            }, e.prototype.destroy = function(e) {
                for (var i in this.runners.destroy.run(), this.runners) this.runners[i].destroy();
                t.prototype.destroy.call(this, e), this.gl = null
            }, e.registerPlugin = function(t, i) {
                e.__plugins = e.__plugins || {}, e.__plugins[t] = i
            }, e
        }(Wr);

    function qr(t) {
        return Yr.create(t)
    }
    var Kr = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",
        Zr = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n",
        Jr = function(t) {
            function e() {
                t.apply(this, arguments)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.from = function(t, i) {
                return new e(new ai(t, i))
            }, e
        }(ni),
        Qr = function() {
            this.textures = [], this.ids = [], this.blend = 0, this.textureCount = 0, this.start = 0, this.size = 0, this.type = 4
        },
        $r = function(t) {
            this.rawBinaryData = new ArrayBuffer(t), this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData)
        },
        tn = {
            int8View: {
                configurable: !0
            },
            uint8View: {
                configurable: !0
            },
            int16View: {
                configurable: !0
            },
            uint16View: {
                configurable: !0
            },
            int32View: {
                configurable: !0
            }
        };
    tn.int8View.get = function() {
        return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View
    }, tn.uint8View.get = function() {
        return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View
    }, tn.int16View.get = function() {
        return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View
    }, tn.uint16View.get = function() {
        return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View
    }, tn.int32View.get = function() {
        return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View
    }, $r.prototype.view = function(t) {
        return this[t + "View"]
    }, $r.prototype.destroy = function() {
        this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null
    }, $r.sizeOf = function(t) {
        switch (t) {
            case "int8":
            case "uint8":
                return 1;
            case "int16":
            case "uint16":
                return 2;
            case "int32":
            case "uint32":
            case "float32":
                return 4;
            default:
                throw new Error(t + " isn't a valid view type")
        }
    }, Object.defineProperties($r.prototype, tn);
    var en = function(t) {
            function e(e) {
                t.call(this, e), this.shaderGenerator = null, this.geometryClass = null, this.vertexSize = null, this.state = yr.for2d(), this.size = 8e3, this._vertexCount = 0, this._indexCount = 0, this._bufferedElements = [], this._bufferSize = 0, this._shader = null, this._packedGeometries = [], this._packedGeometryPoolSize = 2, this._flushId = 0, this._drawCalls = [];
                for (var i = 0; i < this.size / 4; i++) this._drawCalls[i] = new Qr;
                this._aBuffers = {}, this._iBuffers = {}, this.MAX_TEXTURES = 1, this.renderer.on("prerender", this.onPrerender, this), e.runners.contextChange.add(this)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.contextChange = function() {
                var t = this.renderer.gl;
                g.PREFER_ENV === gt.WEBGL_LEGACY ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), g.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = lr(this.MAX_TEXTURES, t)), this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
                for (var e = 0; e < this._packedGeometryPoolSize; e++) this._packedGeometries[e] = new this.geometryClass
            }, e.prototype.onPrerender = function() {
                this._flushId = 0
            }, e.prototype.render = function(t) {
                t._texture.valid && (this._vertexCount + t.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += t.vertexData.length / 2, this._indexCount += t.indices.length, this._bufferedElements[this._bufferSize++] = t)
            }, e.prototype.flush = function() {
                if (0 !== this._vertexCount) {
                    var t, e, i = this.getAttributeBuffer(this._vertexCount),
                        r = this.getIndexBuffer(this._indexCount),
                        n = this.renderer.gl,
                        o = this._bufferedElements,
                        s = this._drawCalls,
                        a = this.MAX_TEXTURES,
                        h = this._packedGeometries,
                        u = this.vertexSize,
                        l = this.renderer.textureGC.count,
                        c = 0,
                        d = 0,
                        p = 0,
                        f = s[0],
                        m = 0,
                        v = -1;
                    f.textureCount = 0, f.start = 0, f.blend = v;
                    var y, _ = ++ni._globalBatch;
                    for (y = 0; y < this._bufferSize; ++y) {
                        var b = o[y];
                        o[y] = null, t = b._texture.baseTexture;
                        var x = kt[t.premultiplyAlpha ? 1 : 0][b.blendMode];
                        v !== x && (v = x, e = null, p = a, _++), e !== t && (e = t, t._batchEnabled !== _ && (p === a && (_++, p = 0, f.size = d - f.start, (f = s[m++]).textureCount = 0, f.blend = v, f.start = d), t.touched = l, t._batchEnabled = _, t._id = p, f.textures[f.textureCount++] = t, p++)), this.packInterleavedGeometry(b, i, r, c, d), c += b.vertexData.length / 2 * u, d += b.indices.length
                    }
                    ni._globalBatch = _, f.size = d - f.start, g.CAN_UPLOAD_SAME_BUFFER ? (h[this._flushId]._buffer.update(i.rawBinaryData, 0), h[this._flushId]._indexBuffer.update(r, 0), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, h[this._flushId] = new this.geometryClass), h[this._flushId]._buffer.update(i.rawBinaryData, 0), h[this._flushId]._indexBuffer.update(r, 0), this.renderer.geometry.bind(h[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
                    var w = this.renderer.texture,
                        T = this.renderer.state;
                    for (y = 0; y < m; y++) {
                        for (var S = s[y], E = S.textureCount, P = 0; P < E; P++) w.bind(S.textures[P], P), S.textures[P] = null;
                        T.setBlendMode(S.blend), n.drawElements(S.type, S.size, n.UNSIGNED_SHORT, 2 * S.start)
                    }
                    this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0
                }
            }, e.prototype.start = function() {
                this.renderer.state.set(this.state), this.renderer.shader.bind(this._shader), g.CAN_UPLOAD_SAME_BUFFER && this.renderer.geometry.bind(this._packedGeometries[this._flushId])
            }, e.prototype.stop = function() {
                this.flush()
            }, e.prototype.destroy = function() {
                for (var e = 0; e < this._packedGeometryPoolSize; e++) this._packedGeometries[e] && this._packedGeometries[e].destroy();
                this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._drawCalls = null, this._shader && (this._shader.destroy(), this._shader = null), t.prototype.destroy.call(this)
            }, e.prototype.getAttributeBuffer = function(t) {
                var e = Yt(Math.ceil(t / 8)),
                    i = Kt(e),
                    r = 8 * e;
                this._aBuffers.length <= i && (this._iBuffers.length = i + 1);
                var n = this._aBuffers[r];
                return n || (this._aBuffers[r] = n = new $r(r * this.vertexSize * 4)), n
            }, e.prototype.getIndexBuffer = function(t) {
                var e = Yt(Math.ceil(t / 12)),
                    i = Kt(e),
                    r = 12 * e;
                this._iBuffers.length <= i && (this._iBuffers.length = i + 1);
                var n = this._iBuffers[i];
                return n || (this._iBuffers[i] = n = new Uint16Array(r)), n
            }, e.prototype.packInterleavedGeometry = function(t, e, i, r, n) {
                for (var o = e.uint32View, s = e.float32View, a = r / this.vertexSize, h = t.uvs, u = t.indices, l = t.vertexData, c = t._texture.baseTexture._id, d = Math.min(t.worldAlpha, 1), p = d < 1 && t._texture.baseTexture.premultiplyAlpha ? jt(t._tintRGB, d) : t._tintRGB + (255 * d << 24), f = 0; f < l.length; f += 2) s[r++] = l[f], s[r++] = l[f + 1], s[r++] = h[f], s[r++] = h[f + 1], o[r++] = p, s[r++] = c;
                for (var m = 0; m < u.length; m++) i[n++] = a + u[m]
            }, e
        }(Ni),
        rn = function(t, e) {
            if (this.vertexSrc = t, this.fragTemplate = e, this.programCache = {}, this.defaultGroupCache = {}, e.indexOf("%count%") < 0) throw new Error('Fragment template must contain "%count%".');
            if (e.indexOf("%forloop%") < 0) throw new Error('Fragment template must contain "%forloop%".')
        };
    rn.prototype.generateShader = function(t) {
        if (!this.programCache[t]) {
            for (var e = new Int32Array(t), i = 0; i < t; i++) e[i] = i;
            this.defaultGroupCache[t] = Li.from({
                uSamplers: e
            }, !0);
            var r = this.fragTemplate;
            r = (r = r.replace(/%count%/gi, "" + t)).replace(/%forloop%/gi, this.generateSampleSrc(t)), this.programCache[t] = new fr(this.vertexSrc, r)
        }
        var n = {
            tint: new Float32Array([1, 1, 1, 1]),
            translationMatrix: new ge,
            default: this.defaultGroupCache[t]
        };
        return new gr(this.programCache[t], n)
    }, rn.prototype.generateSampleSrc = function(t) {
        var e = "";
        e += "\n", e += "\n";
        for (var i = 0; i < t; i++) i > 0 && (e += "\nelse "), i < t - 1 && (e += "if(vTextureId < " + i + ".5)"), e += "\n{", e += "\n\tcolor = texture2D(uSamplers[" + i + "], vTextureCoord);", e += "\n}";
        return (e += "\n") + "\n"
    };
    var nn = function(t) {
            function e(e) {
                void 0 === e && (e = !1), t.call(this), this._buffer = new Ei(null, e, !1), this._indexBuffer = new Ei(null, e, !0), this.addAttribute("aVertexPosition", this._buffer, 2, !1, wt.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, !1, wt.FLOAT).addAttribute("aColor", this._buffer, 4, !0, wt.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, !0, wt.FLOAT).addIndex(this._indexBuffer)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
        }(Oi),
        on = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n",
        sn = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n",
        an = function() {},
        hn = {
            defaultVertexSrc: {
                configurable: !0
            },
            defaultFragmentTemplate: {
                configurable: !0
            }
        };
    an.create = function(t) {
        var e = Object.assign({
                vertex: on,
                fragment: sn,
                geometryClass: nn,
                vertexSize: 6
            }, t),
            i = e.vertex,
            r = e.fragment,
            n = e.vertexSize,
            o = e.geometryClass;
        return function(t) {
            function e(e) {
                t.call(this, e), this.shaderGenerator = new rn(i, r), this.geometryClass = o, this.vertexSize = n
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
        }(en)
    }, hn.defaultVertexSrc.get = function() {
        return on
    }, hn.defaultFragmentTemplate.get = function() {
        return sn
    }, Object.defineProperties(an, hn);
    var un = an.create(),
        ln = new Ce,
        cn = function(t) {
            this.renderer = t, t.extract = this
        };
    cn.prototype.image = function(t, e, i) {
        var r = new Image;
        return r.src = this.base64(t, e, i), r
    }, cn.prototype.base64 = function(t, e, i) {
        return this.canvas(t).toDataURL(e, i)
    }, cn.prototype.canvas = function(t) {
        var e, i, r, n = this.renderer,
            o = !1,
            s = !1;
        t && (t instanceof xi ? r = t : (r = this.renderer.generateTexture(t), s = !0)), r ? (e = r.baseTexture.resolution, i = r.frame, o = !1, n.renderTexture.bind(r)) : (e = this.renderer.resolution, o = !0, (i = ln).width = this.renderer.width, i.height = this.renderer.height, n.renderTexture.bind(null));
        var a = Math.floor(i.width * e),
            h = Math.floor(i.height * e),
            u = new te(a, h, 1),
            l = new Uint8Array(4 * a * h),
            c = n.gl;
        c.readPixels(i.x * e, i.y * e, a, h, c.RGBA, c.UNSIGNED_BYTE, l);
        var d = u.context.getImageData(0, 0, a, h);
        return cn.arrayPostDivide(l, d.data), u.context.putImageData(d, 0, 0), o && (u.context.scale(1, -1), u.context.drawImage(u.canvas, 0, -h)), s && r.destroy(!0), u.canvas
    }, cn.prototype.pixels = function(t) {
        var e, i, r, n = this.renderer,
            o = !1;
        t && (t instanceof xi ? r = t : (r = this.renderer.generateTexture(t), o = !0)), r ? (e = r.baseTexture.resolution, i = r.frame, n.renderTexture.bind(r)) : (e = n.resolution, (i = ln).width = n.width, i.height = n.height, n.renderTexture.bind(null));
        var s = i.width * e,
            a = i.height * e,
            h = new Uint8Array(4 * s * a),
            u = n.gl;
        return u.readPixels(i.x * e, i.y * e, s, a, u.RGBA, u.UNSIGNED_BYTE, h), o && r.destroy(!0), cn.arrayPostDivide(h, h), h
    }, cn.prototype.destroy = function() {
        this.renderer.extract = null, this.renderer = null
    }, cn.arrayPostDivide = function(t, e) {
        for (var i = 0; i < t.length; i += 4) {
            var r = e[i + 3] = t[i + 3];
            0 !== r ? (e[i] = Math.round(Math.min(255 * t[i] / r, 255)), e[i + 1] = Math.round(Math.min(255 * t[i + 1] / r, 255)), e[i + 2] = Math.round(Math.min(255 * t[i + 2] / r, 255))) : (e[i] = t[i], e[i + 1] = t[i + 1], e[i + 2] = t[i + 2])
        }
    };
    var dn = {
            Extract: cn
        },
        pn = function() {
            this.global = new ue, this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0
        },
        fn = {
            pointerId: {
                configurable: !0
            }
        };
    fn.pointerId.get = function() {
        return this.identifier
    }, pn.prototype.getLocalPosition = function(t, e, i) {
        return t.worldTransform.applyInverse(i || this.global, e)
    }, pn.prototype.copyEvent = function(t) {
        t.isPrimary && (this.isPrimary = !0), this.button = t.button, this.buttons = Number.isInteger(t.buttons) ? t.buttons : t.which, this.width = t.width, this.height = t.height, this.tiltX = t.tiltX, this.tiltY = t.tiltY, this.pointerType = t.pointerType, this.pressure = t.pressure, this.rotationAngle = t.rotationAngle, this.twist = t.twist || 0, this.tangentialPressure = t.tangentialPressure || 0
    }, pn.prototype.reset = function() {
        this.isPrimary = !1
    }, Object.defineProperties(pn.prototype, fn);
    var mn = function() {
        this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null
    };
    mn.prototype.stopPropagation = function() {
        this.stopped = !0, this.stopPropagationHint = !0, this.stopsPropagatingAt = this.currentTarget
    }, mn.prototype.reset = function() {
        this.stopped = !1, this.stopsPropagatingAt = null, this.stopPropagationHint = !1, this.currentTarget = null, this.target = null
    };
    var gn = function t(e) {
            this._pointerId = e, this._flags = t.FLAGS.NONE
        },
        vn = {
            pointerId: {
                configurable: !0
            },
            flags: {
                configurable: !0
            },
            none: {
                configurable: !0
            },
            over: {
                configurable: !0
            },
            rightDown: {
                configurable: !0
            },
            leftDown: {
                configurable: !0
            }
        };
    gn.prototype._doSet = function(t, e) {
        this._flags = e ? this._flags | t : this._flags & ~t
    }, vn.pointerId.get = function() {
        return this._pointerId
    }, vn.flags.get = function() {
        return this._flags
    }, vn.flags.set = function(t) {
        this._flags = t
    }, vn.none.get = function() {
        return this._flags === this.constructor.FLAGS.NONE
    }, vn.over.get = function() {
        return 0 != (this._flags & this.constructor.FLAGS.OVER)
    }, vn.over.set = function(t) {
        this._doSet(this.constructor.FLAGS.OVER, t)
    }, vn.rightDown.get = function() {
        return 0 != (this._flags & this.constructor.FLAGS.RIGHT_DOWN)
    }, vn.rightDown.set = function(t) {
        this._doSet(this.constructor.FLAGS.RIGHT_DOWN, t)
    }, vn.leftDown.get = function() {
        return 0 != (this._flags & this.constructor.FLAGS.LEFT_DOWN)
    }, vn.leftDown.set = function(t) {
        this._doSet(this.constructor.FLAGS.LEFT_DOWN, t)
    }, Object.defineProperties(gn.prototype, vn), gn.FLAGS = Object.freeze({
        NONE: 0,
        OVER: 1,
        LEFT_DOWN: 2,
        RIGHT_DOWN: 4
    });
    var yn = {
        interactive: !1,
        interactiveChildren: !0,
        hitArea: null,
        get buttonMode() {
            return "pointer" === this.cursor
        },
        set buttonMode(t) {
            t ? this.cursor = "pointer" : "pointer" === this.cursor && (this.cursor = null)
        },
        cursor: null,
        get trackedPointers() {
            return void 0 === this._trackedPointers && (this._trackedPointers = {}), this._trackedPointers
        },
        _trackedPointers: void 0
    };
    Be.mixin(yn);
    var _n = 1,
        bn = {
            target: null,
            data: {
                global: null
            }
        },
        xn = function(t) {
            function e(e, i) {
                t.call(this), i = i || {}, this.renderer = e, this.autoPreventDefault = void 0 === i.autoPreventDefault || i.autoPreventDefault, this.interactionFrequency = i.interactionFrequency || 10, this.mouse = new pn, this.mouse.identifier = _n, this.mouse.global.set(-999999), this.activeInteractionData = {}, this.activeInteractionData[_n] = this.mouse, this.interactionDataPool = [], this.eventData = new mn, this.interactionDOMElement = null, this.moveWhenInside = !1, this.eventsAdded = !1, this.mouseOverRenderer = !1, this.supportsTouchEvents = "ontouchstart" in window, this.supportsPointerEvents = !!window.PointerEvent, this.onPointerUp = this.onPointerUp.bind(this), this.processPointerUp = this.processPointerUp.bind(this), this.onPointerCancel = this.onPointerCancel.bind(this), this.processPointerCancel = this.processPointerCancel.bind(this), this.onPointerDown = this.onPointerDown.bind(this), this.processPointerDown = this.processPointerDown.bind(this), this.onPointerMove = this.onPointerMove.bind(this), this.processPointerMove = this.processPointerMove.bind(this), this.onPointerOut = this.onPointerOut.bind(this), this.processPointerOverOut = this.processPointerOverOut.bind(this), this.onPointerOver = this.onPointerOver.bind(this), this.cursorStyles = {
                    default: "inherit",
                    pointer: "pointer"
                }, this.currentCursorMode = null, this.cursor = null, this._tempPoint = new ue, this.resolution = 1, this.delayedEvents = [], this.setTargetElement(this.renderer.view, this.renderer.resolution)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.hitTest = function(t, e) {
                return bn.target = null, bn.data.global = t, e || (e = this.renderer._lastObjectRendered), this.processInteractive(bn, e, null, !0), bn.target
            }, e.prototype.setTargetElement = function(t, e) {
                void 0 === e && (e = 1), this.removeEvents(), this.interactionDOMElement = t, this.resolution = e, this.addEvents()
            }, e.prototype.addEvents = function() {
                this.interactionDOMElement && (We.system.add(this.update, this, He.INTERACTION), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "none", this.interactionDOMElement.style["-ms-touch-action"] = "none") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = "none"), this.supportsPointerEvents ? (window.document.addEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, !0), window.addEventListener("pointercancel", this.onPointerCancel, !0), window.addEventListener("pointerup", this.onPointerUp, !0)) : (window.document.addEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, !0), window.addEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, !0), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, !0)), this.eventsAdded = !0)
            }, e.prototype.removeEvents = function() {
                this.interactionDOMElement && (We.system.remove(this.update, this), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = "") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = ""), this.supportsPointerEvents ? (window.document.removeEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, !0), window.removeEventListener("pointercancel", this.onPointerCancel, !0), window.removeEventListener("pointerup", this.onPointerUp, !0)) : (window.document.removeEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, !0), window.removeEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, !0), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, !0)), this.interactionDOMElement = null, this.eventsAdded = !1)
            }, e.prototype.update = function(t) {
                if (this._deltaTime += t, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.interactionDOMElement))
                    if (this.didMove) this.didMove = !1;
                    else {
                        for (var e in this.cursor = null, this.activeInteractionData)
                            if (this.activeInteractionData.hasOwnProperty(e)) {
                                var i = this.activeInteractionData[e];
                                if (i.originalEvent && "touch" !== i.pointerType) {
                                    var r = this.configureInteractionEventForDOMEvent(this.eventData, i.originalEvent, i);
                                    this.processInteractive(r, this.renderer._lastObjectRendered, this.processPointerOverOut, !0)
                                }
                            }
                        this.setCursorMode(this.cursor)
                    }
            }, e.prototype.setCursorMode = function(t) {
                if (t = t || "default", this.currentCursorMode !== t) {
                    this.currentCursorMode = t;
                    var e = this.cursorStyles[t];
                    if (e) switch (typeof e) {
                        case "string":
                            this.interactionDOMElement.style.cursor = e;
                            break;
                        case "function":
                            e(t);
                            break;
                        case "object":
                            Object.assign(this.interactionDOMElement.style, e)
                    } else "string" != typeof t || Object.prototype.hasOwnProperty.call(this.cursorStyles, t) || (this.interactionDOMElement.style.cursor = t)
                }
            }, e.prototype.dispatchEvent = function(t, e, i) {
                i.stopPropagationHint && t !== i.stopsPropagatingAt || (i.currentTarget = t, i.type = e, t.emit(e, i), t[e] && t[e](i))
            }, e.prototype.delayDispatchEvent = function(t, e, i) {
                this.delayedEvents.push({
                    displayObject: t,
                    eventString: e,
                    eventData: i
                })
            }, e.prototype.mapPositionToPoint = function(t, e, i) {
                var r;
                r = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                var n = 1 / this.resolution;
                t.x = (e - r.left) * (this.interactionDOMElement.width / r.width) * n, t.y = (i - r.top) * (this.interactionDOMElement.height / r.height) * n
            }, e.prototype.processInteractive = function(t, e, i, r, n, o) {
                if (!e || !e.visible) return !1;
                var s = t.data.global,
                    a = !1,
                    h = n = e.interactive || n,
                    u = !0;
                if (e.hitArea ? (r && (e.worldTransform.applyInverse(s, this._tempPoint), e.hitArea.contains(this._tempPoint.x, this._tempPoint.y) ? a = !0 : (r = !1, u = !1)), h = !1) : e._mask && r && (e._mask.containsPoint && e._mask.containsPoint(s) || (r = !1)), u && e.interactiveChildren && e.children)
                    for (var l = e.children, c = l.length - 1; c >= 0; c--) {
                        var d = l[c],
                            p = this.processInteractive(t, d, i, r, h, !0);
                        if (p) {
                            if (!d.parent) continue;
                            h = !1, p && (t.target && (r = !1), a = !0)
                        }
                    }
                n && (r && !t.target && !e.hitArea && e.containsPoint && e.containsPoint(s) && (a = !0), e.interactive && (a && !t.target && (t.target = e), i && i(t, e, !!a)));
                var f = this.delayedEvents;
                if (f.length && !o) {
                    t.stopPropagationHint = !1;
                    var m = f.length;
                    this.delayedEvents = [];
                    for (var g = 0; g < m; g++) {
                        var v = f[g],
                            y = v.displayObject,
                            _ = v.eventString,
                            b = v.eventData;
                        b.stopsPropagatingAt === y && (b.stopPropagationHint = !0), this.dispatchEvent(y, _, b)
                    }
                }
                return a
            }, e.prototype.onPointerDown = function(t) {
                if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                    var e = this.normalizeToPointerData(t);
                    this.autoPreventDefault && e[0].isNormalized && (t.cancelable || !("cancelable" in t)) && t.preventDefault();
                    for (var i = e.length, r = 0; r < i; r++) {
                        var n = e[r],
                            o = this.getInteractionDataForPointerId(n),
                            s = this.configureInteractionEventForDOMEvent(this.eventData, n, o);
                        if (s.data.originalEvent = t, this.processInteractive(s, this.renderer._lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", s), "touch" === n.pointerType) this.emit("touchstart", s);
                        else if ("mouse" === n.pointerType || "pen" === n.pointerType) {
                            var a = 2 === n.button;
                            this.emit(a ? "rightdown" : "mousedown", this.eventData)
                        }
                    }
                }
            }, e.prototype.processPointerDown = function(t, e, i) {
                var r = t.data,
                    n = t.data.identifier;
                if (i)
                    if (e.trackedPointers[n] || (e.trackedPointers[n] = new gn(n)), this.dispatchEvent(e, "pointerdown", t), "touch" === r.pointerType) this.dispatchEvent(e, "touchstart", t);
                    else if ("mouse" === r.pointerType || "pen" === r.pointerType) {
                    var o = 2 === r.button;
                    o ? e.trackedPointers[n].rightDown = !0 : e.trackedPointers[n].leftDown = !0, this.dispatchEvent(e, o ? "rightdown" : "mousedown", t)
                }
            }, e.prototype.onPointerComplete = function(t, e, i) {
                for (var r = this.normalizeToPointerData(t), n = r.length, o = t.target !== this.interactionDOMElement ? "outside" : "", s = 0; s < n; s++) {
                    var a = r[s],
                        h = this.getInteractionDataForPointerId(a),
                        u = this.configureInteractionEventForDOMEvent(this.eventData, a, h);
                    if (u.data.originalEvent = t, this.processInteractive(u, this.renderer._lastObjectRendered, i, e || !o), this.emit(e ? "pointercancel" : "pointerup" + o, u), "mouse" === a.pointerType || "pen" === a.pointerType) {
                        var l = 2 === a.button;
                        this.emit(l ? "rightup" + o : "mouseup" + o, u)
                    } else "touch" === a.pointerType && (this.emit(e ? "touchcancel" : "touchend" + o, u), this.releaseInteractionDataForPointerId(a.pointerId, h))
                }
            }, e.prototype.onPointerCancel = function(t) {
                this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !0, this.processPointerCancel)
            }, e.prototype.processPointerCancel = function(t, e) {
                var i = t.data,
                    r = t.data.identifier;
                void 0 !== e.trackedPointers[r] && (delete e.trackedPointers[r], this.dispatchEvent(e, "pointercancel", t), "touch" === i.pointerType && this.dispatchEvent(e, "touchcancel", t))
            }, e.prototype.onPointerUp = function(t) {
                this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !1, this.processPointerUp)
            }, e.prototype.processPointerUp = function(t, e, i) {
                var r = t.data,
                    n = t.data.identifier,
                    o = e.trackedPointers[n],
                    s = "touch" === r.pointerType,
                    a = "mouse" === r.pointerType || "pen" === r.pointerType,
                    h = !1;
                if (a) {
                    var u = 2 === r.button,
                        l = gn.FLAGS,
                        c = u ? l.RIGHT_DOWN : l.LEFT_DOWN,
                        d = void 0 !== o && o.flags & c;
                    i ? (this.dispatchEvent(e, u ? "rightup" : "mouseup", t), d && (this.dispatchEvent(e, u ? "rightclick" : "click", t), h = !0)) : d && this.dispatchEvent(e, u ? "rightupoutside" : "mouseupoutside", t), o && (u ? o.rightDown = !1 : o.leftDown = !1)
                }
                i ? (this.dispatchEvent(e, "pointerup", t), s && this.dispatchEvent(e, "touchend", t), o && (a && !h || this.dispatchEvent(e, "pointertap", t), s && (this.dispatchEvent(e, "tap", t), o.over = !1))) : o && (this.dispatchEvent(e, "pointerupoutside", t), s && this.dispatchEvent(e, "touchendoutside", t)), o && o.none && delete e.trackedPointers[n]
            }, e.prototype.onPointerMove = function(t) {
                if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                    var e = this.normalizeToPointerData(t);
                    "mouse" !== e[0].pointerType && "pen" !== e[0].pointerType || (this.didMove = !0, this.cursor = null);
                    for (var i = e.length, r = 0; r < i; r++) {
                        var n = e[r],
                            o = this.getInteractionDataForPointerId(n),
                            s = this.configureInteractionEventForDOMEvent(this.eventData, n, o);
                        s.data.originalEvent = t, this.processInteractive(s, this.renderer._lastObjectRendered, this.processPointerMove, !0), this.emit("pointermove", s), "touch" === n.pointerType && this.emit("touchmove", s), "mouse" !== n.pointerType && "pen" !== n.pointerType || this.emit("mousemove", s)
                    }
                    "mouse" === e[0].pointerType && this.setCursorMode(this.cursor)
                }
            }, e.prototype.processPointerMove = function(t, e, i) {
                var r = t.data,
                    n = "touch" === r.pointerType,
                    o = "mouse" === r.pointerType || "pen" === r.pointerType;
                o && this.processPointerOverOut(t, e, i), this.moveWhenInside && !i || (this.dispatchEvent(e, "pointermove", t), n && this.dispatchEvent(e, "touchmove", t), o && this.dispatchEvent(e, "mousemove", t))
            }, e.prototype.onPointerOut = function(t) {
                if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                    var e = this.normalizeToPointerData(t)[0];
                    "mouse" === e.pointerType && (this.mouseOverRenderer = !1, this.setCursorMode(null));
                    var i = this.getInteractionDataForPointerId(e),
                        r = this.configureInteractionEventForDOMEvent(this.eventData, e, i);
                    r.data.originalEvent = e, this.processInteractive(r, this.renderer._lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", r), "mouse" === e.pointerType || "pen" === e.pointerType ? this.emit("mouseout", r) : this.releaseInteractionDataForPointerId(i.identifier)
                }
            }, e.prototype.processPointerOverOut = function(t, e, i) {
                var r = t.data,
                    n = t.data.identifier,
                    o = "mouse" === r.pointerType || "pen" === r.pointerType,
                    s = e.trackedPointers[n];
                i && !s && (s = e.trackedPointers[n] = new gn(n)), void 0 !== s && (i && this.mouseOverRenderer ? (s.over || (s.over = !0, this.delayDispatchEvent(e, "pointerover", t), o && this.delayDispatchEvent(e, "mouseover", t)), o && null === this.cursor && (this.cursor = e.cursor)) : s.over && (s.over = !1, this.dispatchEvent(e, "pointerout", this.eventData), o && this.dispatchEvent(e, "mouseout", t), s.none && delete e.trackedPointers[n]))
            }, e.prototype.onPointerOver = function(t) {
                var e = this.normalizeToPointerData(t)[0],
                    i = this.getInteractionDataForPointerId(e),
                    r = this.configureInteractionEventForDOMEvent(this.eventData, e, i);
                r.data.originalEvent = e, "mouse" === e.pointerType && (this.mouseOverRenderer = !0), this.emit("pointerover", r), "mouse" !== e.pointerType && "pen" !== e.pointerType || this.emit("mouseover", r)
            }, e.prototype.getInteractionDataForPointerId = function(t) {
                var e, i = t.pointerId;
                return i === _n || "mouse" === t.pointerType ? e = this.mouse : this.activeInteractionData[i] ? e = this.activeInteractionData[i] : ((e = this.interactionDataPool.pop() || new pn).identifier = i, this.activeInteractionData[i] = e), e.copyEvent(t), e
            }, e.prototype.releaseInteractionDataForPointerId = function(t) {
                var e = this.activeInteractionData[t];
                e && (delete this.activeInteractionData[t], e.reset(), this.interactionDataPool.push(e))
            }, e.prototype.configureInteractionEventForDOMEvent = function(t, e, i) {
                return t.data = i, this.mapPositionToPoint(i.global, e.clientX, e.clientY), "touch" === e.pointerType && (e.globalX = i.global.x, e.globalY = i.global.y), i.originalEvent = e, t.reset(), t
            }, e.prototype.normalizeToPointerData = function(t) {
                var e = [];
                if (this.supportsTouchEvents && t instanceof TouchEvent)
                    for (var i = 0, r = t.changedTouches.length; i < r; i++) {
                        var n = t.changedTouches[i];
                        void 0 === n.button && (n.button = t.touches.length ? 1 : 0), void 0 === n.buttons && (n.buttons = t.touches.length ? 1 : 0), void 0 === n.isPrimary && (n.isPrimary = 1 === t.touches.length && "touchstart" === t.type), void 0 === n.width && (n.width = n.radiusX || 1), void 0 === n.height && (n.height = n.radiusY || 1), void 0 === n.tiltX && (n.tiltX = 0), void 0 === n.tiltY && (n.tiltY = 0), void 0 === n.pointerType && (n.pointerType = "touch"), void 0 === n.pointerId && (n.pointerId = n.identifier || 0), void 0 === n.pressure && (n.pressure = n.force || .5), void 0 === n.twist && (n.twist = 0), void 0 === n.tangentialPressure && (n.tangentialPressure = 0), void 0 === n.layerX && (n.layerX = n.offsetX = n.clientX), void 0 === n.layerY && (n.layerY = n.offsetY = n.clientY), n.isNormalized = !0, e.push(n)
                    } else !(t instanceof MouseEvent) || this.supportsPointerEvents && t instanceof window.PointerEvent ? e.push(t) : (void 0 === t.isPrimary && (t.isPrimary = !0), void 0 === t.width && (t.width = 1), void 0 === t.height && (t.height = 1), void 0 === t.tiltX && (t.tiltX = 0), void 0 === t.tiltY && (t.tiltY = 0), void 0 === t.pointerType && (t.pointerType = "mouse"), void 0 === t.pointerId && (t.pointerId = _n), void 0 === t.pressure && (t.pressure = .5), void 0 === t.twist && (t.twist = 0), void 0 === t.tangentialPressure && (t.tangentialPressure = 0), t.isNormalized = !0, e.push(t));
                return e
            }, e.prototype.destroy = function() {
                this.removeEvents(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this._tempPoint = null
            }, e
        }(v),
        wn = {
            InteractionData: pn,
            InteractionEvent: mn,
            InteractionManager: xn,
            InteractionTrackingData: gn,
            interactiveTarget: yn
        },
        Tn = {
            adaptive: !0,
            maxLength: 10,
            minSegments: 8,
            maxSegments: 2048,
            _segmentsCount: function(t, e) {
                if (void 0 === e && (e = 20), !this.adaptive) return e;
                var i = Math.ceil(t / this.maxLength);
                return i < this.minSegments ? i = this.minSegments : i > this.maxSegments && (i = this.maxSegments), i
            }
        },
        Sn = function() {
            this.reset()
        };
    Sn.prototype.clone = function() {
        var t = new Sn;
        return t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.matrix = this.matrix, t.visible = this.visible, t
    }, Sn.prototype.reset = function() {
        this.color = 16777215, this.alpha = 1, this.texture = _i.WHITE, this.matrix = null, this.visible = !1
    }, Sn.prototype.destroy = function() {
        this.texture = null, this.matrix = null
    };
    var En = function(t, e, i, r) {
        void 0 === e && (e = null), void 0 === i && (i = null), void 0 === r && (r = null), this.shape = t, this.lineStyle = i, this.fillStyle = e, this.matrix = r, this.type = t.type, this.points = [], this.holes = []
    };
    En.prototype.clone = function() {
        return new En(this.shape, this.fillStyle, this.lineStyle, this.matrix)
    }, En.prototype.destroy = function() {
        this.shape = null, this.holes.length = 0, this.holes = null, this.points.length = 0, this.points = null, this.lineStyle = null, this.fillStyle = null
    };
    var Pn = {
        build: function(t) {
            var e, i, r = t.shape,
                n = t.points,
                o = r.x,
                s = r.y;
            if (n.length = 0, t.type === me.CIRC ? (e = r.radius, i = r.radius) : (e = r.width, i = r.height), 0 !== e && 0 !== i) {
                var a = Math.floor(30 * Math.sqrt(r.radius)) || Math.floor(15 * Math.sqrt(r.width + r.height));
                a /= 2.3;
                for (var h = 2 * Math.PI / a, u = 0; u < a; u++) n.push(o + Math.sin(-h * u) * e, s + Math.cos(-h * u) * i);
                n.push(n[0], n[1])
            }
        },
        triangulate: function(t, e) {
            var i = t.points,
                r = e.points,
                n = e.indices,
                o = r.length / 2,
                s = o;
            r.push(t.shape.x, t.shape.y);
            for (var a = 0; a < i.length; a += 2) r.push(i[a], i[a + 1]), n.push(o++, s, o)
        }
    };

    function In(t, e) {
        t.lineStyle.native ? function(t, e) {
            var i = 0,
                r = t.shape,
                n = t.points || r.points,
                o = r.type !== me.POLY || r.closeStroke;
            if (0 !== n.length) {
                var s = e.points,
                    a = e.indices,
                    h = n.length / 2,
                    u = s.length / 2,
                    l = u;
                for (s.push(n[0], n[1]), i = 1; i < h; i++) s.push(n[2 * i], n[2 * i + 1]), a.push(l, l + 1), l++;
                o && a.push(l, u)
            }
        }(t, e) : function(t, e) {
            var i = t.shape,
                r = t.points || i.points.slice(),
                n = e.closePointEps;
            if (0 !== r.length) {
                var o = t.lineStyle,
                    s = new ue(r[0], r[1]),
                    a = new ue(r[r.length - 2], r[r.length - 1]),
                    h = i.type !== me.POLY || i.closeStroke,
                    u = Math.abs(s.x - a.x) < n && Math.abs(s.y - a.y) < n;
                if (h) {
                    r = r.slice(), u && (r.pop(), r.pop(), a.set(r[r.length - 2], r[r.length - 1]));
                    var l = a.x + .5 * (s.x - a.x),
                        c = a.y + .5 * (s.y - a.y);
                    r.unshift(l, c), r.push(l, c)
                }
                var d = e.points,
                    p = r.length / 2,
                    f = r.length,
                    m = d.length / 2,
                    g = o.width / 2,
                    v = r[0],
                    y = r[1],
                    _ = r[2],
                    b = r[3],
                    x = 0,
                    w = 0,
                    T = -(y - b),
                    S = v - _,
                    E = 0,
                    P = 0,
                    I = 0,
                    C = 0,
                    A = Math.sqrt(T * T + S * S);
                T /= A, S /= A, T *= g, S *= g;
                var M = o.alignment,
                    O = 2 * (1 - M),
                    R = 2 * M;
                d.push(v - T * O, y - S * O), d.push(v + T * R, y + S * R);
                for (var D = 1; D < p - 1; ++D) {
                    v = r[2 * (D - 1)], y = r[2 * (D - 1) + 1], _ = r[2 * D], b = r[2 * D + 1], x = r[2 * (D + 1)], w = r[2 * (D + 1) + 1], T = -(y - b), S = v - _, T /= A = Math.sqrt(T * T + S * S), S /= A, T *= g, S *= g, E = -(b - w), P = _ - x, E /= A = Math.sqrt(E * E + P * P), P /= A;
                    var F = -S + y - (-S + b),
                        L = -T + _ - (-T + v),
                        B = (-T + v) * (-S + b) - (-T + _) * (-S + y),
                        k = -(P *= g) + w - (-P + b),
                        N = -(E *= g) + _ - (-E + x),
                        U = (-E + x) * (-P + b) - (-E + _) * (-P + w),
                        j = F * N - k * L;
                    if (Math.abs(j) < .1) j += 10.1, d.push(_ - T * O, b - S * O), d.push(_ + T * R, b + S * R);
                    else {
                        var X = (L * U - N * B) / j,
                            G = (k * B - F * U) / j;
                        (X - _) * (X - _) + (G - b) * (G - b) > 196 * g * g ? (I = T - E, C = S - P, I /= A = Math.sqrt(I * I + C * C), C /= A, I *= g, C *= g, d.push(_ - I * O, b - C * O), d.push(_ + I * R, b + C * R), d.push(_ - I * R * O, b - C * O), f++) : (d.push(_ + (X - _) * O, b + (G - b) * O), d.push(_ - (X - _) * R, b - (G - b) * R))
                    }
                }
                v = r[2 * (p - 2)], y = r[2 * (p - 2) + 1], _ = r[2 * (p - 1)], T = -(y - (b = r[2 * (p - 1) + 1])), S = v - _, T /= A = Math.sqrt(T * T + S * S), S /= A, T *= g, S *= g, d.push(_ - T * O, b - S * O), d.push(_ + T * R, b + S * R);
                for (var V = e.indices, H = 0; H < f - 2; ++H) V.push(m, m + 1, m + 2), m++
            }
        }(t, e)
    }
    var Cn = {
            build: function(t) {
                t.points = t.shape.points.slice()
            },
            triangulate: function(t, e) {
                var i = t.points,
                    r = t.holes,
                    n = e.points,
                    o = e.indices;
                if (i.length >= 6) {
                    for (var s = [], a = 0; a < r.length; a++) {
                        var h = r[a];
                        s.push(i.length / 2), i = i.concat(h.points)
                    }
                    var u = y(i, s, 2);
                    if (!u) return;
                    for (var l = n.length / 2, c = 0; c < u.length; c += 3) o.push(u[c] + l), o.push(u[c + 1] + l), o.push(u[c + 2] + l);
                    for (var d = 0; d < i.length; d++) n.push(i[d])
                }
            }
        },
        An = {
            build: function(t) {
                var e = t.shape,
                    i = t.points,
                    r = e.x,
                    n = e.y,
                    o = e.width,
                    s = e.height,
                    a = e.radius;
                i.length = 0, On(r, n + a, r, n, r + a, n, i), On(r + o - a, n, r + o, n, r + o, n + a, i), On(r + o, n + s - a, r + o, n + s, r + o - a, n + s, i), On(r + a, n + s, r, n + s, r, n + s - a, i)
            },
            triangulate: function(t, e) {
                for (var i = t.points, r = e.points, n = e.indices, o = r.length / 2, s = y(i, null, 2), a = 0, h = s.length; a < h; a += 3) n.push(s[a] + o), n.push(s[a + 1] + o), n.push(s[a + 2] + o);
                for (var u = 0, l = i.length; u < l; u++) r.push(i[u], i[++u])
            }
        };

    function Mn(t, e, i) {
        return t + (e - t) * i
    }

    function On(t, e, i, r, n, o, s) {
        void 0 === s && (s = []);
        for (var a = s, h = 0, u = 0, l = 0, c = 0, d = 0, p = 0, f = 0, m = 0; f <= 20; ++f) h = Mn(t, i, m = f / 20), u = Mn(e, r, m), l = Mn(i, n, m), c = Mn(r, o, m), d = Mn(h, l, m), p = Mn(u, c, m), a.push(d, p);
        return a
    }
    var Rn = [],
        Dn = [],
        Fn = new ue,
        Ln = {};
    Ln[me.POLY] = Cn, Ln[me.CIRC] = Pn, Ln[me.ELIP] = Pn, Ln[me.RECT] = {
        build: function(t) {
            var e = t.shape,
                i = e.x,
                r = e.y,
                n = e.width,
                o = e.height,
                s = t.points;
            s.length = 0, s.push(i, r, i + n, r, i + n, r + o, i, r + o)
        },
        triangulate: function(t, e) {
            var i = t.points,
                r = e.points,
                n = r.length / 2;
            r.push(i[0], i[1], i[2], i[3], i[6], i[7], i[4], i[5]), e.indices.push(n, n + 1, n + 2, n + 1, n + 2, n + 3)
        }
    }, Ln[me.RREC] = An;
    var Bn = function() {
            this.style = null, this.size = 0, this.start = 0, this.attribStart = 0, this.attribSize = 0
        },
        kn = function(t) {
            function e() {
                t.call(this), this.points = [], this.colors = [], this.uvs = [], this.indices = [], this.textureIds = [], this.graphicsData = [], this.dirty = 0, this.batchDirty = -1, this.cacheDirty = -1, this.clearDirty = 0, this.drawCalls = [], this.batches = [], this.shapeIndex = 0, this._bounds = new Le, this.boundsDirty = -1, this.boundsPadding = 0, this.batchable = !1, this.indicesUint16 = null, this.uvsFloat32 = null, this.closePointEps = 1e-4
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                bounds: {
                    configurable: !0
                }
            };
            return i.bounds.get = function() {
                return this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.calculateBounds()), this._bounds
            }, e.prototype.invalidate = function() {
                this.boundsDirty = -1, this.dirty++, this.batchDirty++, this.shapeIndex = 0, this.points.length = 0, this.colors.length = 0, this.uvs.length = 0, this.indices.length = 0, this.textureIds.length = 0;
                for (var t = 0; t < this.drawCalls.length; t++) this.drawCalls[t].textures.length = 0, Dn.push(this.drawCalls[t]);
                this.drawCalls.length = 0;
                for (var e = 0; e < this.batches.length; e++) {
                    var i = this.batches[e];
                    i.start = 0, i.attribStart = 0, i.style = null, Rn.push(i)
                }
                this.batches.length = 0
            }, e.prototype.clear = function() {
                return this.graphicsData.length > 0 && (this.invalidate(), this.clearDirty++, this.graphicsData.length = 0), this
            }, e.prototype.drawShape = function(t, e, i, r) {
                var n = new En(t, e, i, r);
                return this.graphicsData.push(n), this.dirty++, this
            }, e.prototype.drawHole = function(t, e) {
                if (!this.graphicsData.length) return null;
                var i = new En(t, null, null, e),
                    r = this.graphicsData[this.graphicsData.length - 1];
                return i.lineStyle = r.lineStyle, r.holes.push(i), this.dirty++, this
            }, e.prototype.destroy = function(e) {
                t.prototype.destroy.call(this, e);
                for (var i = 0; i < this.graphicsData.length; ++i) this.graphicsData[i].destroy();
                this.points.length = 0, this.points = null, this.colors.length = 0, this.colors = null, this.uvs.length = 0, this.uvs = null, this.indices.length = 0, this.indices = null, this.indexBuffer.destroy(), this.indexBuffer = null, this.graphicsData.length = 0, this.graphicsData = null, this.drawCalls.length = 0, this.drawCalls = null, this.batches.length = 0, this.batches = null, this._bounds = null
            }, e.prototype.containsPoint = function(t) {
                for (var e = this.graphicsData, i = 0; i < e.length; ++i) {
                    var r = e[i];
                    if (r.fillStyle.visible && r.shape && (r.matrix ? r.matrix.applyInverse(t, Fn) : Fn.copyFrom(t), r.shape.contains(Fn.x, Fn.y))) {
                        if (r.holes)
                            for (var n = 0; n < r.holes.length; n++)
                                if (r.holes[n].shape.contains(Fn.x, Fn.y)) return !1;
                        return !0
                    }
                }
                return !1
            }, e.prototype.updateBatches = function() {
                if (this.dirty !== this.cacheDirty)
                    if (0 !== this.graphicsData.length) {
                        if (this.dirty !== this.cacheDirty)
                            for (var t = 0; t < this.graphicsData.length; t++) {
                                var e = this.graphicsData[t];
                                if (e.fillStyle && !e.fillStyle.texture.baseTexture.valid) return;
                                if (e.lineStyle && !e.lineStyle.texture.baseTexture.valid) return
                            }
                        this.cacheDirty = this.dirty;
                        var i = this.uvs,
                            r = null,
                            n = null,
                            o = 0,
                            s = !1;
                        if (this.batches.length > 0) {
                            var a = (r = this.batches[this.batches.length - 1]).style;
                            n = a.texture.baseTexture, o = a.color + a.alpha, s = !!a.native
                        }
                        for (var h = this.shapeIndex; h < this.graphicsData.length; h++) {
                            this.shapeIndex++;
                            var u = this.graphicsData[h],
                                l = Ln[u.type],
                                c = u.fillStyle,
                                d = u.lineStyle;
                            l.build(u), u.matrix && this.transformPoints(u.points, u.matrix);
                            for (var p = 0; p < 2; p++) {
                                var f = 0 === p ? c : d;
                                if (f.visible) {
                                    var m = f.texture.baseTexture,
                                        g = this.indices.length,
                                        v = this.points.length / 2;
                                    !r || n === m && o === f.color + f.alpha && s === !!f.native || (r.size = g - r.start, r.attribSize = v - r.attribStart, r.size > 0 && (r = null)), r || (r = Rn.pop() || new Bn, this.batches.push(r), m.wrapMode = St.REPEAT, n = m, o = f.color + f.alpha, s = f.native, r.style = f, r.start = g, r.attribStart = v);
                                    var y = this.points.length / 2;
                                    if (0 === p) u.holes.length ? (this.processHoles(u.holes), Cn.triangulate(u, this)) : l.triangulate(u, this);
                                    else {
                                        In(u, this);
                                        for (var _ = 0; _ < u.holes.length; _++) In(u.holes[_], this)
                                    }
                                    var b = this.points.length / 2 - y;
                                    this.addUvs(this.points, i, f.texture, y, b, f.matrix)
                                }
                            }
                        }
                        var x = this.indices.length,
                            w = this.points.length / 2;
                        if (r)
                            if (r.size = x - r.start, r.attribSize = w - r.attribStart, this.indicesUint16 = new Uint16Array(this.indices), this.batchable = this.isBatchable(), this.batchable) {
                                this.batchDirty++, this.uvsFloat32 = new Float32Array(this.uvs);
                                for (var T = 0; T < this.batches.length; T++)
                                    for (var S = this.batches[T], E = 0; E < S.size; E++) {
                                        var P = S.start + E;
                                        this.indicesUint16[P] = this.indicesUint16[P] - S.attribStart
                                    }
                            } else this.buildDrawCalls();
                        else this.batchable = !0
                    } else this.batchable = !0
            }, e.prototype.isBatchable = function() {
                for (var t = this.batches, i = 0; i < t.length; i++)
                    if (t[i].style.native) return !1;
                return this.points.length < 2 * e.BATCHABLE_SIZE
            }, e.prototype.buildDrawCalls = function() {
                for (var t = ++ni._globalBatch, e = 0; e < this.drawCalls.length; e++) this.drawCalls[e].textures.length = 0, Dn.push(this.drawCalls[e]);
                this.drawCalls.length = 0;
                var i = this.uvs,
                    r = this.colors,
                    n = this.textureIds,
                    o = Dn.pop() || new Qr;
                o.textureCount = 0, o.start = 0, o.size = 0, o.type = _t.TRIANGLES;
                var s = 0,
                    a = null,
                    h = 0,
                    u = !1,
                    l = _t.TRIANGLES,
                    c = 0;
                this.drawCalls.push(o);
                for (var d = 0; d < this.batches.length; d++) {
                    var p = this.batches[d],
                        f = p.style,
                        m = f.texture.baseTexture;
                    u !== !!f.native && (l = (u = f.native) ? _t.LINES : _t.TRIANGLES, a = null, s = 8, t++), a !== m && (a = m, m._batchEnabled !== t && (8 === s && (t++, s = 0, o.size > 0 && (o = Dn.pop() || new Qr, this.drawCalls.push(o)), o.start = c, o.size = 0, o.textureCount = 0, o.type = l), m.touched = 1, m._batchEnabled = t, m._id = s, m.wrapMode = 10497, o.textures[o.textureCount++] = m, s++)), o.size += p.size, c += p.size, h = m._id, this.addColors(r, f.color, f.alpha, p.attribSize), this.addTextureIds(n, h, p.attribSize)
                }
                ni._globalBatch = t;
                for (var g = this.points, v = new ArrayBuffer(3 * g.length * 4), y = new Float32Array(v), _ = new Uint32Array(v), b = 0, x = 0; x < g.length / 2; x++) y[b++] = g[2 * x], y[b++] = g[2 * x + 1], y[b++] = i[2 * x], y[b++] = i[2 * x + 1], _[b++] = r[x], y[b++] = n[x];
                this._buffer.update(v), this._indexBuffer.update(this.indicesUint16)
            }, e.prototype.processHoles = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    Ln[i.type].build(i), i.matrix && this.transformPoints(i.points, i.matrix)
                }
            }, e.prototype.calculateBounds = function() {
                var t = 1 / 0,
                    e = -1 / 0,
                    i = 1 / 0,
                    r = -1 / 0;
                if (this.graphicsData.length)
                    for (var n = null, o = 0, s = 0, a = 0, h = 0, u = 0; u < this.graphicsData.length; u++) {
                        var l = this.graphicsData[u],
                            c = l.type,
                            d = l.lineStyle ? l.lineStyle.width : 0;
                        if (n = l.shape, c === me.RECT || c === me.RREC) o = n.x - d / 2, s = n.y - d / 2, t = o < t ? o : t, e = o + (a = n.width + d) > e ? o + a : e, i = s < i ? s : i, r = s + (h = n.height + d) > r ? s + h : r;
                        else if (c === me.CIRC) o = n.x, s = n.y, t = o - (a = n.radius + d / 2) < t ? o - a : t, e = o + a > e ? o + a : e, i = s - (h = n.radius + d / 2) < i ? s - h : i, r = s + h > r ? s + h : r;
                        else if (c === me.ELIP) o = n.x, s = n.y, t = o - (a = n.width + d / 2) < t ? o - a : t, e = o + a > e ? o + a : e, i = s - (h = n.height + d / 2) < i ? s - h : i, r = s + h > r ? s + h : r;
                        else
                            for (var p = n.points, f = 0, m = 0, g = 0, v = 0, y = 0, _ = 0, b = 0, x = 0, w = 0; w + 2 < p.length; w += 2) o = p[w], s = p[w + 1], f = p[w + 2], m = p[w + 3], g = Math.abs(f - o), v = Math.abs(m - s), h = d, (a = Math.sqrt(g * g + v * v)) < 1e-9 || (t = (b = (f + o) / 2) - (y = (h / a * v + g) / 2) < t ? b - y : t, e = b + y > e ? b + y : e, i = (x = (m + s) / 2) - (_ = (h / a * g + v) / 2) < i ? x - _ : i, r = x + _ > r ? x + _ : r)
                    } else t = 0, e = 0, i = 0, r = 0;
                var T = this.boundsPadding;
                this._bounds.minX = t - T, this._bounds.maxX = e + T, this._bounds.minY = i - T, this._bounds.maxY = r + T
            }, e.prototype.transformPoints = function(t, e) {
                for (var i = 0; i < t.length / 2; i++) {
                    var r = t[2 * i],
                        n = t[2 * i + 1];
                    t[2 * i] = e.a * r + e.c * n + e.tx, t[2 * i + 1] = e.b * r + e.d * n + e.ty
                }
            }, e.prototype.addColors = function(t, e, i, r) {
                for (var n = jt((e >> 16) + (65280 & e) + ((255 & e) << 16), i); r-- > 0;) t.push(n)
            }, e.prototype.addTextureIds = function(t, e, i) {
                for (; i-- > 0;) t.push(e)
            }, e.prototype.addUvs = function(t, e, i, r, n, o) {
                for (var s = 0, a = e.length, h = i.frame; s < n;) {
                    var u = t[2 * (r + s)],
                        l = t[2 * (r + s) + 1];
                    if (o) {
                        var c = o.a * u + o.c * l + o.tx;
                        l = o.b * u + o.d * l + o.ty, u = c
                    }
                    s++, e.push(u / h.width, l / h.height)
                }
                var d = i.baseTexture;
                (h.width < d.width || h.height < d.height) && this.adjustUvs(e, i, a, n)
            }, e.prototype.adjustUvs = function(t, e, i, r) {
                for (var n = e.baseTexture, o = i + 2 * r, s = e.frame, a = s.width / n.width, h = s.height / n.height, u = s.x / s.width, l = s.y / s.height, c = Math.floor(t[i] + 1e-6), d = Math.floor(t[i + 1] + 1e-6), p = i + 2; p < o; p += 2) c = Math.min(c, Math.floor(t[p] + 1e-6)), d = Math.min(d, Math.floor(t[p + 1] + 1e-6));
                u -= c, l -= d;
                for (var f = i; f < o; f += 2) t[f] = (t[f] + u) * a, t[f + 1] = (t[f + 1] + l) * h
            }, Object.defineProperties(e.prototype, i), e
        }(nn);
    kn.BATCHABLE_SIZE = 100;
    var Nn = function(t) {
            function e() {
                t.apply(this, arguments)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clone = function() {
                var t = new e;
                return t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.matrix = this.matrix, t.visible = this.visible, t.width = this.width, t.alignment = this.alignment, t.native = this.native, t
            }, e.prototype.reset = function() {
                t.prototype.reset.call(this), this.color = 0, this.width = 0, this.alignment = .5, this.native = !1
            }, e
        }(Sn),
        Un = function() {};
    Un.curveLength = function(t, e, i, r, n, o, s, a) {
        for (var h = 0, u = 0, l = 0, c = 0, d = 0, p = 0, f = 0, m = 0, g = 0, v = 0, y = 0, _ = t, b = e, x = 1; x <= 10; ++x) v = _ - (m = (f = (p = (d = 1 - (u = x / 10)) * d) * d) * t + 3 * p * u * i + 3 * d * (l = u * u) * n + (c = l * u) * s), y = b - (g = f * e + 3 * p * u * r + 3 * d * l * o + c * a), _ = m, b = g, h += Math.sqrt(v * v + y * y);
        return h
    }, Un.curveTo = function(t, e, i, r, n, o, s) {
        var a = s[s.length - 2],
            h = s[s.length - 1];
        s.length -= 2;
        var u = Tn._segmentsCount(Un.curveLength(a, h, t, e, i, r, n, o)),
            l = 0,
            c = 0,
            d = 0,
            p = 0,
            f = 0;
        s.push(a, h);
        for (var m = 1, g = 0; m <= u; ++m) d = (c = (l = 1 - (g = m / u)) * l) * l, f = (p = g * g) * g, s.push(d * a + 3 * c * g * t + 3 * l * p * i + f * n, d * h + 3 * c * g * e + 3 * l * p * r + f * o)
    };
    var jn = function() {};
    jn.curveLength = function(t, e, i, r, n, o) {
        var s = t - 2 * i + n,
            a = e - 2 * r + o,
            h = 2 * i - 2 * t,
            u = 2 * r - 2 * e,
            l = 4 * (s * s + a * a),
            c = 4 * (s * h + a * u),
            d = h * h + u * u,
            p = 2 * Math.sqrt(l + c + d),
            f = Math.sqrt(l),
            m = 2 * l * f,
            g = 2 * Math.sqrt(d),
            v = c / f;
        return (m * p + f * c * (p - g) + (4 * d * l - c * c) * Math.log((2 * f + v + p) / (v + g))) / (4 * m)
    }, jn.curveTo = function(t, e, i, r, n) {
        for (var o = n[n.length - 2], s = n[n.length - 1], a = Tn._segmentsCount(jn.curveLength(o, s, t, e, i, r)), h = 0, u = 0, l = 1; l <= a; ++l) {
            var c = l / a;
            h = o + (t - o) * c, u = s + (e - s) * c, n.push(h + (t + (i - t) * c - h) * c, u + (e + (r - e) * c - u) * c)
        }
    };
    var Xn = function() {};
    Xn.curveTo = function(t, e, i, r, n, o) {
        var s = o[o.length - 2],
            a = o[o.length - 1] - e,
            h = s - t,
            u = r - e,
            l = i - t,
            c = Math.abs(a * l - h * u);
        if (c < 1e-8 || 0 === n) return o[o.length - 2] === t && o[o.length - 1] === e || o.push(t, e), null;
        var d = a * a + h * h,
            p = u * u + l * l,
            f = a * u + h * l,
            m = n * Math.sqrt(d) / c,
            g = n * Math.sqrt(p) / c,
            v = m * f / d,
            y = g * f / p,
            _ = m * l + g * h,
            b = m * u + g * a,
            x = h * (g + v),
            w = a * (g + v),
            T = l * (m + y),
            S = u * (m + y);
        return {
            cx: _ + t,
            cy: b + e,
            radius: n,
            startAngle: Math.atan2(w - b, x - _),
            endAngle: Math.atan2(S - b, T - _),
            anticlockwise: h * u > l * a
        }
    }, Xn.arc = function(t, e, i, r, n, o, s, a, h) {
        for (var u = s - o, l = Tn._segmentsCount(Math.abs(u) * n, 40 * Math.ceil(Math.abs(u) / de)), c = u / (2 * l), d = 2 * c, p = Math.cos(c), f = Math.sin(c), m = l - 1, g = m % 1 / m, v = 0; v <= m; ++v) {
            var y = c + o + d * (v + g * v),
                _ = Math.cos(y),
                b = -Math.sin(y);
            h.push((p * _ + f * b) * n + i, (p * -b + f * _) * n + r)
        }
    };
    var Gn = function(t) {
            function e(e, i, r, n, o, s) {
                o = o || n / 2;
                for (var a = -1 * Math.PI / 2 + s, h = 2 * r, u = de / h, l = [], c = 0; c < h; c++) {
                    var d = c % 2 ? o : n,
                        p = c * u + a;
                    l.push(e + d * Math.cos(p), i + d * Math.sin(p))
                }
                t.call(this, l)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
        }(De),
        Vn = new Float32Array(3),
        Hn = {},
        zn = function(t) {
            function e(e) {
                void 0 === e && (e = null), t.call(this), this.geometry = e || new kn, this.geometry.refCount++, this.shader = null, this.state = yr.for2d(), this._fillStyle = new Sn, this._lineStyle = new Nn, this._matrix = null, this._holeMode = !1, this.currentPath = null, this.batches = [], this.batchTint = -1, this.vertexData = null, this._transformID = -1, this.batchDirty = -1, this.pluginName = "batch", this.tint = 16777215, this.blendMode = yt.NORMAL
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                blendMode: {
                    configurable: !0
                },
                tint: {
                    configurable: !0
                },
                fill: {
                    configurable: !0
                },
                line: {
                    configurable: !0
                }
            };
            return e.prototype.clone = function() {
                return this.finishPoly(), new e(this.geometry)
            }, i.blendMode.set = function(t) {
                this.state.blendMode = t
            }, i.blendMode.get = function() {
                return this.state.blendMode
            }, i.tint.get = function() {
                return this._tint
            }, i.tint.set = function(t) {
                this._tint = t
            }, i.fill.get = function() {
                return this._fillStyle
            }, i.line.get = function() {
                return this._lineStyle
            }, e.prototype.lineStyle = function(t, e, i, r, n) {
                return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 1), void 0 === r && (r = .5), void 0 === n && (n = !1), this.lineTextureStyle(t, _i.WHITE, e, i, null, r, n), this
            }, e.prototype.lineTextureStyle = function(t, e, i, r, n, o, s) {
                void 0 === t && (t = 0), void 0 === e && (e = _i.WHITE), void 0 === i && (i = 16777215), void 0 === r && (r = 1), void 0 === n && (n = null), void 0 === o && (o = .5), void 0 === s && (s = !1), this.currentPath && this.startPoly();
                var a = t > 0 && r > 0;
                return a ? (n && (n = n.clone()).invert(), Object.assign(this._lineStyle, {
                    color: i,
                    width: t,
                    alpha: r,
                    matrix: n,
                    texture: e,
                    alignment: o,
                    native: s,
                    visible: a
                })) : this._lineStyle.reset(), this
            }, e.prototype.startPoly = function() {
                if (this.currentPath) {
                    var t = this.currentPath.points,
                        e = this.currentPath.points.length;
                    e > 2 && (this.drawShape(this.currentPath), this.currentPath = new De, this.currentPath.closeStroke = !1, this.currentPath.points.push(t[e - 2], t[e - 1]))
                } else this.currentPath = new De, this.currentPath.closeStroke = !1
            }, e.prototype.finishPoly = function() {
                this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath), this.currentPath = null) : this.currentPath.points.length = 0)
            }, e.prototype.moveTo = function(t, e) {
                return this.startPoly(), this.currentPath.points[0] = t, this.currentPath.points[1] = e, this
            }, e.prototype.lineTo = function(t, e) {
                this.currentPath || this.moveTo(0, 0);
                var i = this.currentPath.points,
                    r = i[i.length - 2],
                    n = i[i.length - 1];
                return r === t && n === e || i.push(t, e), this
            }, e.prototype._initCurve = function(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = 0), this.currentPath ? 0 === this.currentPath.points.length && (this.currentPath.points = [t, e]) : this.moveTo(t, e)
            }, e.prototype.quadraticCurveTo = function(t, e, i, r) {
                this._initCurve();
                var n = this.currentPath.points;
                return 0 === n.length && this.moveTo(0, 0), jn.curveTo(t, e, i, r, n), this
            }, e.prototype.bezierCurveTo = function(t, e, i, r, n, o) {
                return this._initCurve(), Un.curveTo(t, e, i, r, n, o, this.currentPath.points), this
            }, e.prototype.arcTo = function(t, e, i, r, n) {
                this._initCurve(t, e);
                var o = this.currentPath.points,
                    s = Xn.curveTo(t, e, i, r, n, o);
                if (s) {
                    var a = s.cx,
                        h = s.cy,
                        u = s.radius,
                        l = s.startAngle,
                        c = s.endAngle,
                        d = s.anticlockwise;
                    this.arc(a, h, u, l, c, d)
                }
                return this
            }, e.prototype.arc = function(t, e, i, r, n, o) {
                if (void 0 === o && (o = !1), r === n) return this;
                if (!o && n <= r ? n += de : o && r <= n && (r += de), 0 == n - r) return this;
                var s = t + Math.cos(r) * i,
                    a = e + Math.sin(r) * i,
                    h = this.geometry.closePointEps,
                    u = this.currentPath ? this.currentPath.points : null;
                if (u) {
                    var l = Math.abs(u[u.length - 2] - s),
                        c = Math.abs(u[u.length - 1] - a);
                    l < h && c < h || u.push(s, a)
                } else this.moveTo(s, a), u = this.currentPath.points;
                return Xn.arc(s, a, t, e, i, r, n, o, u), this
            }, e.prototype.beginFill = function(t, e) {
                return void 0 === t && (t = 0), void 0 === e && (e = 1), this.beginTextureFill(_i.WHITE, t, e)
            }, e.prototype.beginTextureFill = function(t, e, i, r) {
                void 0 === t && (t = _i.WHITE), void 0 === e && (e = 16777215), void 0 === i && (i = 1), void 0 === r && (r = null), this.currentPath && this.startPoly();
                var n = i > 0;
                return n ? (r && (r = r.clone()).invert(), Object.assign(this._fillStyle, {
                    color: e,
                    alpha: i,
                    texture: t,
                    matrix: r,
                    visible: n
                })) : this._fillStyle.reset(), this
            }, e.prototype.endFill = function() {
                return this.finishPoly(), this._fillStyle.reset(), this
            }, e.prototype.drawRect = function(t, e, i, r) {
                return this.drawShape(new Ce(t, e, i, r))
            }, e.prototype.drawRoundedRect = function(t, e, i, r, n) {
                return this.drawShape(new Fe(t, e, i, r, n))
            }, e.prototype.drawCircle = function(t, e, i) {
                return this.drawShape(new Oe(t, e, i))
            }, e.prototype.drawEllipse = function(t, e, i, r) {
                return this.drawShape(new Re(t, e, i, r))
            }, e.prototype.drawPolygon = function(t) {
                var e = arguments,
                    i = t,
                    r = !0;
                if (i.points && (r = i.closeStroke, i = i.points), !Array.isArray(i)) {
                    i = new Array(arguments.length);
                    for (var n = 0; n < i.length; ++n) i[n] = e[n]
                }
                var o = new De(i);
                return o.closeStroke = r, this.drawShape(o), this
            }, e.prototype.drawShape = function(t) {
                return this._holeMode ? this.geometry.drawHole(t, this._matrix) : this.geometry.drawShape(t, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix), this
            }, e.prototype.drawStar = function(t, e, i, r, n, o) {
                return void 0 === o && (o = 0), this.drawPolygon(new Gn(t, e, i, r, n, o))
            }, e.prototype.clear = function() {
                return this.geometry.clear(), this._lineStyle.reset(), this._fillStyle.reset(), this._matrix = null, this._holeMode = !1, this.currentPath = null, this
            }, e.prototype.isFastRect = function() {
                return !1
            }, e.prototype._render = function(t) {
                this.finishPoly();
                var e = this.geometry;
                e.updateBatches(), e.batchable ? (this.batchDirty !== e.batchDirty && this._populateBatches(), this._renderBatched(t)) : (t.batch.flush(), this._renderDirect(t))
            }, e.prototype._populateBatches = function() {
                var t = this.geometry,
                    e = this.blendMode;
                this.batches = [], this.batchTint = -1, this._transformID = -1, this.batchDirty = t.batchDirty, this.vertexData = new Float32Array(t.points);
                for (var i = 0, r = t.batches.length; i < r; i++) {
                    var n = t.batches[i],
                        o = n.style.color,
                        s = new Float32Array(this.vertexData.buffer, 4 * n.attribStart * 2, 2 * n.attribSize),
                        a = new Float32Array(t.uvsFloat32.buffer, 4 * n.attribStart * 2, 2 * n.attribSize),
                        h = {
                            vertexData: s,
                            blendMode: e,
                            indices: new Uint16Array(t.indicesUint16.buffer, 2 * n.start, n.size),
                            uvs: a,
                            _batchRGB: Dt(o),
                            _tintRGB: o,
                            _texture: n.style.texture,
                            alpha: n.style.alpha,
                            worldAlpha: 1
                        };
                    this.batches[i] = h
                }
            }, e.prototype._renderBatched = function(t) {
                if (this.batches.length) {
                    t.batch.setObjectRenderer(t.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
                    for (var e = 0, i = this.batches.length; e < i; e++) {
                        var r = this.batches[e];
                        r.worldAlpha = this.worldAlpha * r.alpha, t.plugins[this.pluginName].render(r)
                    }
                }
            }, e.prototype._renderDirect = function(t) {
                var e = this._resolveDirectShader(t),
                    i = this.geometry,
                    r = this.tint,
                    n = this.worldAlpha,
                    o = e.uniforms,
                    s = i.drawCalls;
                o.translationMatrix = this.transform.worldTransform, o.tint[0] = (r >> 16 & 255) / 255 * n, o.tint[1] = (r >> 8 & 255) / 255 * n, o.tint[2] = (255 & r) / 255 * n, o.tint[3] = n, t.shader.bind(e), t.geometry.bind(i, e), t.state.set(this.state);
                for (var a = 0, h = s.length; a < h; a++) this._renderDrawCallDirect(t, i.drawCalls[a])
            }, e.prototype._renderDrawCallDirect = function(t, e) {
                for (var i = e.textureCount, r = 0; r < i; r++) t.texture.bind(e.textures[r], r);
                t.geometry.draw(e.type, e.size, e.start)
            }, e.prototype._resolveDirectShader = function(t) {
                var e = this.shader,
                    i = this.pluginName;
                if (!e) {
                    if (!Hn[i]) {
                        for (var r = new Int32Array(16), n = 0; n < 16; n++) r[n] = n;
                        var o = {
                                tint: new Float32Array([1, 1, 1, 1]),
                                translationMatrix: new ge,
                                default: Li.from({
                                    uSamplers: r
                                }, !0)
                            },
                            s = t.plugins[i]._shader.program;
                        Hn[i] = new gr(s, o)
                    }
                    e = Hn[i]
                }
                return e
            }, e.prototype._calculateBounds = function() {
                this.finishPoly();
                var t = this.geometry.bounds;
                this._bounds.addFrame(this.transform, t.minX, t.minY, t.maxX, t.maxY)
            }, e.prototype.containsPoint = function(t) {
                return this.worldTransform.applyInverse(t, e._TEMP_POINT), this.geometry.containsPoint(e._TEMP_POINT)
            }, e.prototype.calculateTints = function() {
                if (this.batchTint !== this.tint) {
                    this.batchTint = this.tint;
                    for (var t = Dt(this.tint, Vn), e = 0; e < this.batches.length; e++) {
                        var i = this.batches[e],
                            r = i._batchRGB,
                            n = (t[0] * r[0] * 255 << 16) + (t[1] * r[1] * 255 << 8) + (0 | t[2] * r[2] * 255);
                        i._tintRGB = (n >> 16) + (65280 & n) + ((255 & n) << 16)
                    }
                }
            }, e.prototype.calculateVertices = function() {
                if (this._transformID !== this.transform._worldID) {
                    this._transformID = this.transform._worldID;
                    for (var t = this.transform.worldTransform, e = t.a, i = t.b, r = t.c, n = t.d, o = t.tx, s = t.ty, a = this.geometry.points, h = this.vertexData, u = 0, l = 0; l < a.length; l += 2) {
                        var c = a[l],
                            d = a[l + 1];
                        h[u++] = e * c + r * d + o, h[u++] = n * d + i * c + s
                    }
                }
            }, e.prototype.closePath = function() {
                var t = this.currentPath;
                return t && (t.closeStroke = !0), this
            }, e.prototype.setMatrix = function(t) {
                return this._matrix = t, this
            }, e.prototype.beginHole = function() {
                return this.finishPoly(), this._holeMode = !0, this
            }, e.prototype.endHole = function() {
                return this.finishPoly(), this._holeMode = !1, this
            }, e.prototype.destroy = function(e) {
                t.prototype.destroy.call(this, e), this.geometry.refCount--, 0 === this.geometry.refCount && this.geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this.geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, t.prototype.destroy.call(this, e)
            }, Object.defineProperties(e.prototype, i), e
        }(Ne);
    zn._TEMP_POINT = new ue;
    var Wn = new ue,
        Yn = new Uint16Array([0, 1, 2, 0, 2, 3]),
        qn = function(t) {
            function e(e) {
                t.call(this), this._anchor = new le(this._onAnchorUpdate, this, e ? e.defaultAnchor.x : 0, e ? e.defaultAnchor.y : 0), this._texture = null, this._width = 0, this._height = 0, this._tint = null, this._tintRGB = null, this.tint = 16777215, this.blendMode = yt.NORMAL, this.shader = null, this._cachedTint = 16777215, this.uvs = null, this.texture = e || _i.EMPTY, this.vertexData = new Float32Array(8), this.vertexTrimmedData = null, this._transformID = -1, this._textureID = -1, this._transformTrimmedID = -1, this._textureTrimmedID = -1, this.indices = Yn, this.size = 4, this.start = 0, this.pluginName = "batch", this.isSprite = !0, this._roundPixels = g.ROUND_PIXELS
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                roundPixels: {
                    configurable: !0
                },
                width: {
                    configurable: !0
                },
                height: {
                    configurable: !0
                },
                anchor: {
                    configurable: !0
                },
                tint: {
                    configurable: !0
                },
                texture: {
                    configurable: !0
                }
            };
            return e.prototype._onTextureUpdate = function() {
                this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this._width && (this.scale.x = Wt(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = Wt(this.scale.y) * this._height / this._texture.orig.height)
            }, e.prototype._onAnchorUpdate = function() {
                this._transformID = -1, this._transformTrimmedID = -1
            }, e.prototype.calculateVertices = function() {
                var t = this._texture;
                if (this._transformID !== this.transform._worldID || this._textureID !== t._updateID) {
                    this._textureID !== t._updateID && (this.uvs = this._texture._uvs.uvsFloat32), this._transformID = this.transform._worldID, this._textureID = t._updateID;
                    var e = this.transform.worldTransform,
                        i = e.a,
                        r = e.b,
                        n = e.c,
                        o = e.d,
                        s = e.tx,
                        a = e.ty,
                        h = this.vertexData,
                        u = t.trim,
                        l = t.orig,
                        c = this._anchor,
                        d = 0,
                        p = 0,
                        f = 0,
                        m = 0;
                    if (u ? (d = (p = u.x - c._x * l.width) + u.width, f = (m = u.y - c._y * l.height) + u.height) : (d = (p = -c._x * l.width) + l.width, f = (m = -c._y * l.height) + l.height), h[0] = i * p + n * m + s, h[1] = o * m + r * p + a, h[2] = i * d + n * m + s, h[3] = o * m + r * d + a, h[4] = i * d + n * f + s, h[5] = o * f + r * d + a, h[6] = i * p + n * f + s, h[7] = o * f + r * p + a, this._roundPixels)
                        for (var g = 0; g < 8; g++) h[g] = Math.round(h[g])
                }
            }, e.prototype.calculateTrimmedVertices = function() {
                if (this.vertexTrimmedData) {
                    if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) return
                } else this.vertexTrimmedData = new Float32Array(8);
                this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
                var t = this._texture,
                    e = this.vertexTrimmedData,
                    i = t.orig,
                    r = this._anchor,
                    n = this.transform.worldTransform,
                    o = n.a,
                    s = n.b,
                    a = n.c,
                    h = n.d,
                    u = n.tx,
                    l = n.ty,
                    c = -r._x * i.width,
                    d = c + i.width,
                    p = -r._y * i.height,
                    f = p + i.height;
                e[0] = o * c + a * p + u, e[1] = h * p + s * c + l, e[2] = o * d + a * p + u, e[3] = h * p + s * d + l, e[4] = o * d + a * f + u, e[5] = h * f + s * d + l, e[6] = o * c + a * f + u, e[7] = h * f + s * c + l
            }, e.prototype._render = function(t) {
                this.calculateVertices(), t.batch.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this)
            }, e.prototype._calculateBounds = function() {
                var t = this._texture.trim,
                    e = this._texture.orig;
                !t || t.width === e.width && t.height === e.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData))
            }, e.prototype.getLocalBounds = function(e) {
                return 0 === this.children.length ? (this._bounds.minX = this._texture.orig.width * -this._anchor._x, this._bounds.minY = this._texture.orig.height * -this._anchor._y, this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new Ce), e = this._localBoundsRect), this._bounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e)
            }, e.prototype.containsPoint = function(t) {
                this.worldTransform.applyInverse(t, Wn);
                var e = this._texture.orig.width,
                    i = this._texture.orig.height,
                    r = -e * this.anchor.x,
                    n = 0;
                return Wn.x >= r && Wn.x < r + e && (n = -i * this.anchor.y, Wn.y >= n && Wn.y < n + i)
            }, e.prototype.destroy = function(e) {
                if (t.prototype.destroy.call(this, e), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null, "boolean" == typeof e ? e : e && e.texture) {
                    var i = "boolean" == typeof e ? e : e && e.baseTexture;
                    this._texture.destroy(!!i)
                }
                this._texture = null, this.shader = null
            }, e.from = function(t, i) {
                return new e(t instanceof _i ? t : _i.from(t, i))
            }, i.roundPixels.set = function(t) {
                this._roundPixels !== t && (this._transformID = -1), this._roundPixels = t
            }, i.roundPixels.get = function() {
                return this._roundPixels
            }, i.width.get = function() {
                return Math.abs(this.scale.x) * this._texture.orig.width
            }, i.width.set = function(t) {
                var e = Wt(this.scale.x) || 1;
                this.scale.x = e * t / this._texture.orig.width, this._width = t
            }, i.height.get = function() {
                return Math.abs(this.scale.y) * this._texture.orig.height
            }, i.height.set = function(t) {
                var e = Wt(this.scale.y) || 1;
                this.scale.y = e * t / this._texture.orig.height, this._height = t
            }, i.anchor.get = function() {
                return this._anchor
            }, i.anchor.set = function(t) {
                this._anchor.copyFrom(t)
            }, i.tint.get = function() {
                return this._tint
            }, i.tint.set = function(t) {
                this._tint = t, this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16)
            }, i.texture.get = function() {
                return this._texture
            }, i.texture.set = function(t) {
                this._texture !== t && (this._texture = t || _i.EMPTY, this._cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, t && (t.baseTexture.valid ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)))
            }, Object.defineProperties(e.prototype, i), e
        }(Ne),
        Kn = {
            LINEAR_VERTICAL: 0,
            LINEAR_HORIZONTAL: 1
        },
        Zn = {
            align: "left",
            breakWords: !1,
            dropShadow: !1,
            dropShadowAlpha: 1,
            dropShadowAngle: Math.PI / 6,
            dropShadowBlur: 0,
            dropShadowColor: "black",
            dropShadowDistance: 5,
            fill: "black",
            fillGradientType: Kn.LINEAR_VERTICAL,
            fillGradientStops: [],
            fontFamily: "Arial",
            fontSize: 26,
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "normal",
            letterSpacing: 0,
            lineHeight: 0,
            lineJoin: "miter",
            miterLimit: 10,
            padding: 0,
            stroke: "black",
            strokeThickness: 0,
            textBaseline: "alphabetic",
            trim: !1,
            whiteSpace: "pre",
            wordWrap: !1,
            wordWrapWidth: 100,
            leading: 0
        },
        Jn = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"],
        Qn = function(t) {
            this.styleID = 0, this.reset(), io(this, t, t)
        },
        $n = {
            align: {
                configurable: !0
            },
            breakWords: {
                configurable: !0
            },
            dropShadow: {
                configurable: !0
            },
            dropShadowAlpha: {
                configurable: !0
            },
            dropShadowAngle: {
                configurable: !0
            },
            dropShadowBlur: {
                configurable: !0
            },
            dropShadowColor: {
                configurable: !0
            },
            dropShadowDistance: {
                configurable: !0
            },
            fill: {
                configurable: !0
            },
            fillGradientType: {
                configurable: !0
            },
            fillGradientStops: {
                configurable: !0
            },
            fontFamily: {
                configurable: !0
            },
            fontSize: {
                configurable: !0
            },
            fontStyle: {
                configurable: !0
            },
            fontVariant: {
                configurable: !0
            },
            fontWeight: {
                configurable: !0
            },
            letterSpacing: {
                configurable: !0
            },
            lineHeight: {
                configurable: !0
            },
            leading: {
                configurable: !0
            },
            lineJoin: {
                configurable: !0
            },
            miterLimit: {
                configurable: !0
            },
            padding: {
                configurable: !0
            },
            stroke: {
                configurable: !0
            },
            strokeThickness: {
                configurable: !0
            },
            textBaseline: {
                configurable: !0
            },
            trim: {
                configurable: !0
            },
            whiteSpace: {
                configurable: !0
            },
            wordWrap: {
                configurable: !0
            },
            wordWrapWidth: {
                configurable: !0
            }
        };

    function to(t) {
        return "number" == typeof t ? Ft(t) : ("string" == typeof t && 0 === t.indexOf("0x") && (t = t.replace("0x", "#")), t)
    }

    function eo(t) {
        if (Array.isArray(t)) {
            for (var e = 0; e < t.length; ++e) t[e] = to(t[e]);
            return t
        }
        return to(t)
    }

    function io(t, e, i) {
        for (var r in i) Array.isArray(e[r]) ? t[r] = e[r].slice() : t[r] = e[r]
    }
    Qn.prototype.clone = function() {
        var t = {};
        return io(t, this, Zn), new Qn(t)
    }, Qn.prototype.reset = function() {
        io(this, Zn, Zn)
    }, $n.align.get = function() {
        return this._align
    }, $n.align.set = function(t) {
        this._align !== t && (this._align = t, this.styleID++)
    }, $n.breakWords.get = function() {
        return this._breakWords
    }, $n.breakWords.set = function(t) {
        this._breakWords !== t && (this._breakWords = t, this.styleID++)
    }, $n.dropShadow.get = function() {
        return this._dropShadow
    }, $n.dropShadow.set = function(t) {
        this._dropShadow !== t && (this._dropShadow = t, this.styleID++)
    }, $n.dropShadowAlpha.get = function() {
        return this._dropShadowAlpha
    }, $n.dropShadowAlpha.set = function(t) {
        this._dropShadowAlpha !== t && (this._dropShadowAlpha = t, this.styleID++)
    }, $n.dropShadowAngle.get = function() {
        return this._dropShadowAngle
    }, $n.dropShadowAngle.set = function(t) {
        this._dropShadowAngle !== t && (this._dropShadowAngle = t, this.styleID++)
    }, $n.dropShadowBlur.get = function() {
        return this._dropShadowBlur
    }, $n.dropShadowBlur.set = function(t) {
        this._dropShadowBlur !== t && (this._dropShadowBlur = t, this.styleID++)
    }, $n.dropShadowColor.get = function() {
        return this._dropShadowColor
    }, $n.dropShadowColor.set = function(t) {
        var e = eo(t);
        this._dropShadowColor !== e && (this._dropShadowColor = e, this.styleID++)
    }, $n.dropShadowDistance.get = function() {
        return this._dropShadowDistance
    }, $n.dropShadowDistance.set = function(t) {
        this._dropShadowDistance !== t && (this._dropShadowDistance = t, this.styleID++)
    }, $n.fill.get = function() {
        return this._fill
    }, $n.fill.set = function(t) {
        var e = eo(t);
        this._fill !== e && (this._fill = e, this.styleID++)
    }, $n.fillGradientType.get = function() {
        return this._fillGradientType
    }, $n.fillGradientType.set = function(t) {
        this._fillGradientType !== t && (this._fillGradientType = t, this.styleID++)
    }, $n.fillGradientStops.get = function() {
        return this._fillGradientStops
    }, $n.fillGradientStops.set = function(t) {
        (function(t, e) {
            if (!Array.isArray(t) || !Array.isArray(e)) return !1;
            if (t.length !== e.length) return !1;
            for (var i = 0; i < t.length; ++i)
                if (t[i] !== e[i]) return !1;
            return !0
        })(this._fillGradientStops, t) || (this._fillGradientStops = t, this.styleID++)
    }, $n.fontFamily.get = function() {
        return this._fontFamily
    }, $n.fontFamily.set = function(t) {
        this.fontFamily !== t && (this._fontFamily = t, this.styleID++)
    }, $n.fontSize.get = function() {
        return this._fontSize
    }, $n.fontSize.set = function(t) {
        this._fontSize !== t && (this._fontSize = t, this.styleID++)
    }, $n.fontStyle.get = function() {
        return this._fontStyle
    }, $n.fontStyle.set = function(t) {
        this._fontStyle !== t && (this._fontStyle = t, this.styleID++)
    }, $n.fontVariant.get = function() {
        return this._fontVariant
    }, $n.fontVariant.set = function(t) {
        this._fontVariant !== t && (this._fontVariant = t, this.styleID++)
    }, $n.fontWeight.get = function() {
        return this._fontWeight
    }, $n.fontWeight.set = function(t) {
        this._fontWeight !== t && (this._fontWeight = t, this.styleID++)
    }, $n.letterSpacing.get = function() {
        return this._letterSpacing
    }, $n.letterSpacing.set = function(t) {
        this._letterSpacing !== t && (this._letterSpacing = t, this.styleID++)
    }, $n.lineHeight.get = function() {
        return this._lineHeight
    }, $n.lineHeight.set = function(t) {
        this._lineHeight !== t && (this._lineHeight = t, this.styleID++)
    }, $n.leading.get = function() {
        return this._leading
    }, $n.leading.set = function(t) {
        this._leading !== t && (this._leading = t, this.styleID++)
    }, $n.lineJoin.get = function() {
        return this._lineJoin
    }, $n.lineJoin.set = function(t) {
        this._lineJoin !== t && (this._lineJoin = t, this.styleID++)
    }, $n.miterLimit.get = function() {
        return this._miterLimit
    }, $n.miterLimit.set = function(t) {
        this._miterLimit !== t && (this._miterLimit = t, this.styleID++)
    }, $n.padding.get = function() {
        return this._padding
    }, $n.padding.set = function(t) {
        this._padding !== t && (this._padding = t, this.styleID++)
    }, $n.stroke.get = function() {
        return this._stroke
    }, $n.stroke.set = function(t) {
        var e = eo(t);
        this._stroke !== e && (this._stroke = e, this.styleID++)
    }, $n.strokeThickness.get = function() {
        return this._strokeThickness
    }, $n.strokeThickness.set = function(t) {
        this._strokeThickness !== t && (this._strokeThickness = t, this.styleID++)
    }, $n.textBaseline.get = function() {
        return this._textBaseline
    }, $n.textBaseline.set = function(t) {
        this._textBaseline !== t && (this._textBaseline = t, this.styleID++)
    }, $n.trim.get = function() {
        return this._trim
    }, $n.trim.set = function(t) {
        this._trim !== t && (this._trim = t, this.styleID++)
    }, $n.whiteSpace.get = function() {
        return this._whiteSpace
    }, $n.whiteSpace.set = function(t) {
        this._whiteSpace !== t && (this._whiteSpace = t, this.styleID++)
    }, $n.wordWrap.get = function() {
        return this._wordWrap
    }, $n.wordWrap.set = function(t) {
        this._wordWrap !== t && (this._wordWrap = t, this.styleID++)
    }, $n.wordWrapWidth.get = function() {
        return this._wordWrapWidth
    }, $n.wordWrapWidth.set = function(t) {
        this._wordWrapWidth !== t && (this._wordWrapWidth = t, this.styleID++)
    }, Qn.prototype.toFontString = function() {
        var t = "number" == typeof this.fontSize ? this.fontSize + "px" : this.fontSize,
            e = this.fontFamily;
        Array.isArray(this.fontFamily) || (e = this.fontFamily.split(","));
        for (var i = e.length - 1; i >= 0; i--) {
            var r = e[i].trim();
            !/([\"\'])[^\'\"]+\1/.test(r) && Jn.indexOf(r) < 0 && (r = '"' + r + '"'), e[i] = r
        }
        return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + t + " " + e.join(",")
    }, Object.defineProperties(Qn.prototype, $n);
    var ro = function(t, e, i, r, n, o, s, a, h) {
        this.text = t, this.style = e, this.width = i, this.height = r, this.lines = n, this.lineWidths = o, this.lineHeight = s, this.maxLineWidth = a, this.fontProperties = h
    };
    ro.measureText = function(t, e, i, r) {
        void 0 === r && (r = ro._canvas), i = null == i ? e.wordWrap : i;
        var n = e.toFontString(),
            o = ro.measureFont(n);
        0 === o.fontSize && (o.fontSize = e.fontSize, o.ascent = e.fontSize);
        var s = r.getContext("2d");
        s.font = n;
        for (var a = (i ? ro.wordWrap(t, e, r) : t).split(/(?:\r\n|\r|\n)/), h = new Array(a.length), u = 0, l = 0; l < a.length; l++) {
            var c = s.measureText(a[l]).width + (a[l].length - 1) * e.letterSpacing;
            h[l] = c, u = Math.max(u, c)
        }
        var d = u + e.strokeThickness;
        e.dropShadow && (d += e.dropShadowDistance);
        var p = e.lineHeight || o.fontSize + e.strokeThickness,
            f = Math.max(p, o.fontSize + e.strokeThickness) + (a.length - 1) * (p + e.leading);
        return e.dropShadow && (f += e.dropShadowDistance), new ro(t, e, d, f, a, h, p + e.leading, u, o)
    }, ro.wordWrap = function(t, e, i) {
        void 0 === i && (i = ro._canvas);
        for (var r = i.getContext("2d"), n = 0, o = "", s = "", a = {}, h = e.letterSpacing, u = e.whiteSpace, l = ro.collapseSpaces(u), c = ro.collapseNewlines(u), d = !l, p = e.wordWrapWidth + h, f = ro.tokenize(t), m = 0; m < f.length; m++) {
            var g = f[m];
            if (ro.isNewline(g)) {
                if (!c) {
                    s += ro.addLine(o), d = !l, o = "", n = 0;
                    continue
                }
                g = " "
            }
            if (l) {
                var v = ro.isBreakingSpace(g),
                    y = ro.isBreakingSpace(o[o.length - 1]);
                if (v && y) continue
            }
            var _ = ro.getFromCache(g, h, a, r);
            if (_ > p)
                if ("" !== o && (s += ro.addLine(o), o = "", n = 0), ro.canBreakWords(g, e.breakWords))
                    for (var b = g.split(""), x = 0; x < b.length; x++) {
                        for (var w = b[x], T = 1; b[x + T];) {
                            var S = b[x + T],
                                E = w[w.length - 1];
                            if (ro.canBreakChars(E, S, g, x, e.breakWords)) break;
                            w += S, T++
                        }
                        x += w.length - 1;
                        var P = ro.getFromCache(w, h, a, r);
                        P + n > p && (s += ro.addLine(o), d = !1, o = "", n = 0), o += w, n += P
                    } else {
                        o.length > 0 && (s += ro.addLine(o), o = "", n = 0);
                        var I = m === f.length - 1;
                        s += ro.addLine(g, !I), d = !1, o = "", n = 0
                    } else _ + n > p && (d = !1, s += ro.addLine(o), o = "", n = 0), (o.length > 0 || !ro.isBreakingSpace(g) || d) && (o += g, n += _)
        }
        return s + ro.addLine(o, !1)
    }, ro.addLine = function(t, e) {
        return void 0 === e && (e = !0), t = ro.trimRight(t), e ? t + "\n" : t
    }, ro.getFromCache = function(t, e, i, r) {
        var n = i[t];
        if (void 0 === n) {
            var o = t.length * e;
            n = r.measureText(t).width + o, i[t] = n
        }
        return n
    }, ro.collapseSpaces = function(t) {
        return "normal" === t || "pre-line" === t
    }, ro.collapseNewlines = function(t) {
        return "normal" === t
    }, ro.trimRight = function(t) {
        if ("string" != typeof t) return "";
        for (var e = t.length - 1; e >= 0; e--) {
            var i = t[e];
            if (!ro.isBreakingSpace(i)) break;
            t = t.slice(0, -1)
        }
        return t
    }, ro.isNewline = function(t) {
        return "string" == typeof t && ro._newlines.indexOf(t.charCodeAt(0)) >= 0
    }, ro.isBreakingSpace = function(t) {
        return "string" == typeof t && ro._breakingSpaces.indexOf(t.charCodeAt(0)) >= 0
    }, ro.tokenize = function(t) {
        var e = [],
            i = "";
        if ("string" != typeof t) return e;
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            ro.isBreakingSpace(n) || ro.isNewline(n) ? ("" !== i && (e.push(i), i = ""), e.push(n)) : i += n
        }
        return "" !== i && e.push(i), e
    }, ro.canBreakWords = function(t, e) {
        return e
    }, ro.canBreakChars = function(t, e, i, r, n) {
        return !0
    }, ro.measureFont = function(t) {
        if (ro._fonts[t]) return ro._fonts[t];
        var e = {},
            i = ro._canvas,
            r = ro._context;
        r.font = t;
        var n = ro.METRICS_STRING + ro.BASELINE_SYMBOL,
            o = Math.ceil(r.measureText(n).width),
            s = Math.ceil(r.measureText(ro.BASELINE_SYMBOL).width),
            a = 2 * s;
        s = s * ro.BASELINE_MULTIPLIER | 0, i.width = o, i.height = a, r.fillStyle = "#f00", r.fillRect(0, 0, o, a), r.font = t, r.textBaseline = "alphabetic", r.fillStyle = "#000", r.fillText(n, 0, s);
        var h = r.getImageData(0, 0, o, a).data,
            u = h.length,
            l = 4 * o,
            c = 0,
            d = 0,
            p = !1;
        for (c = 0; c < s; ++c) {
            for (var f = 0; f < l; f += 4)
                if (255 !== h[d + f]) {
                    p = !0;
                    break
                }
            if (p) break;
            d += l
        }
        for (e.ascent = s - c, d = u - l, p = !1, c = a; c > s; --c) {
            for (var m = 0; m < l; m += 4)
                if (255 !== h[d + m]) {
                    p = !0;
                    break
                }
            if (p) break;
            d -= l
        }
        return e.descent = c - s, e.fontSize = e.ascent + e.descent, ro._fonts[t] = e, e
    }, ro.clearMetrics = function(t) {
        void 0 === t && (t = ""), t ? delete ro._fonts[t] : ro._fonts = {}
    };
    var no = function() {
        try {
            var t = new OffscreenCanvas(0, 0);
            return t.getContext("2d") ? t : document.createElement("canvas")
        } catch (t) {
            return document.createElement("canvas")
        }
    }();
    no.width = no.height = 10, ro._canvas = no, ro._context = no.getContext("2d"), ro._fonts = {}, ro.METRICS_STRING = "|ÉqÅ", ro.BASELINE_SYMBOL = "M", ro.BASELINE_MULTIPLIER = 1.4, ro._newlines = [10, 13], ro._breakingSpaces = [9, 32, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8200, 8201, 8202, 8287, 12288];
    var oo = {
            texture: !0,
            children: !1,
            baseTexture: !0
        },
        so = function(t) {
            function e(e, i, r) {
                (r = r || document.createElement("canvas")).width = 3, r.height = 3;
                var n = _i.from(r);
                n.orig = new Ce, n.trim = new Ce, t.call(this, n), this.canvas = r, this.context = this.canvas.getContext("2d"), this._resolution = g.RESOLUTION, this._autoResolution = !0, this._text = null, this._style = null, this._styleListener = null, this._font = "", this.text = e, this.style = i, this.localStyleID = -1
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                width: {
                    configurable: !0
                },
                height: {
                    configurable: !0
                },
                style: {
                    configurable: !0
                },
                text: {
                    configurable: !0
                },
                resolution: {
                    configurable: !0
                }
            };
            return e.prototype.updateText = function(t) {
                var e = this._style;
                if (this.localStyleID !== e.styleID && (this.dirty = !0, this.localStyleID = e.styleID), this.dirty || !t) {
                    this._font = this._style.toFontString();
                    var i, r, n = this.context,
                        o = ro.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas),
                        s = o.width,
                        a = o.height,
                        h = o.lines,
                        u = o.lineHeight,
                        l = o.lineWidths,
                        c = o.maxLineWidth,
                        d = o.fontProperties;
                    this.canvas.width = Math.ceil((Math.max(1, s) + 2 * e.padding) * this._resolution), this.canvas.height = Math.ceil((Math.max(1, a) + 2 * e.padding) * this._resolution), n.scale(this._resolution, this._resolution), n.clearRect(0, 0, this.canvas.width, this.canvas.height), n.font = this._font, n.lineWidth = e.strokeThickness, n.textBaseline = e.textBaseline, n.lineJoin = e.lineJoin, n.miterLimit = e.miterLimit;
                    for (var p = e.dropShadow ? 2 : 1, f = 0; f < p; ++f) {
                        var m = e.dropShadow && 0 === f,
                            g = m ? 2 * a : 0,
                            v = g * this.resolution;
                        if (m) {
                            n.fillStyle = "black", n.strokeStyle = "black";
                            var y = e.dropShadowColor,
                                _ = Dt("number" == typeof y ? y : Lt(y));
                            n.shadowColor = "rgba(" + 255 * _[0] + "," + 255 * _[1] + "," + 255 * _[2] + "," + e.dropShadowAlpha + ")", n.shadowBlur = e.dropShadowBlur, n.shadowOffsetX = Math.cos(e.dropShadowAngle) * e.dropShadowDistance, n.shadowOffsetY = Math.sin(e.dropShadowAngle) * e.dropShadowDistance + v
                        } else n.fillStyle = this._generateFillStyle(e, h), n.strokeStyle = e.stroke, n.shadowColor = 0, n.shadowBlur = 0, n.shadowOffsetX = 0, n.shadowOffsetY = 0;
                        for (var b = 0; b < h.length; b++) i = e.strokeThickness / 2, r = e.strokeThickness / 2 + b * u + d.ascent, "right" === e.align ? i += c - l[b] : "center" === e.align && (i += (c - l[b]) / 2), e.stroke && e.strokeThickness && this.drawLetterSpacing(h[b], i + e.padding, r + e.padding - g, !0), e.fill && this.drawLetterSpacing(h[b], i + e.padding, r + e.padding - g)
                    }
                    this.updateTexture()
                }
            }, e.prototype.drawLetterSpacing = function(t, e, i, r) {
                void 0 === r && (r = !1);
                var n = this._style.letterSpacing;
                if (0 !== n)
                    for (var o = e, s = Array.from ? Array.from(t) : t.split(""), a = this.context.measureText(t).width, h = 0, u = 0; u < s.length; ++u) {
                        var l = s[u];
                        r ? this.context.strokeText(l, o, i) : this.context.fillText(l, o, i), o += a - (h = this.context.measureText(t.substring(u + 1)).width) + n, a = h
                    } else r ? this.context.strokeText(t, e, i) : this.context.fillText(t, e, i)
            }, e.prototype.updateTexture = function() {
                var t = this.canvas;
                if (this._style.trim) {
                    var e = $t(t);
                    e.data && (t.width = e.width, t.height = e.height, this.context.putImageData(e.data, 0, 0))
                }
                var i = this._texture,
                    r = this._style,
                    n = r.trim ? 0 : r.padding,
                    o = i.baseTexture;
                i.trim.width = i._frame.width = Math.ceil(t.width / this._resolution), i.trim.height = i._frame.height = Math.ceil(t.height / this._resolution), i.trim.x = -n, i.trim.y = -n, i.orig.width = i._frame.width - 2 * n, i.orig.height = i._frame.height - 2 * n, this._onTextureUpdate(), o.setRealSize(t.width, t.height, this._resolution), this.dirty = !1
            }, e.prototype._render = function(e) {
                this._autoResolution && this._resolution !== e.resolution && (this._resolution = e.resolution, this.dirty = !0), this.updateText(!0), t.prototype._render.call(this, e)
            }, e.prototype.getLocalBounds = function(e) {
                return this.updateText(!0), t.prototype.getLocalBounds.call(this, e)
            }, e.prototype._calculateBounds = function() {
                this.updateText(!0), this.calculateVertices(), this._bounds.addQuad(this.vertexData)
            }, e.prototype._onStyleChange = function() {
                this.dirty = !0
            }, e.prototype._generateFillStyle = function(t, e) {
                if (!Array.isArray(t.fill)) return t.fill;
                if (1 === t.fill.length) return t.fill[0];
                var i, r, n, o, s = Math.ceil(this.canvas.width / this._resolution),
                    a = Math.ceil(this.canvas.height / this._resolution),
                    h = t.fill.slice(),
                    u = t.fillGradientStops.slice();
                if (!u.length)
                    for (var l = h.length + 1, c = 1; c < l; ++c) u.push(c / l);
                if (h.unshift(t.fill[0]), u.unshift(0), h.push(t.fill[t.fill.length - 1]), u.push(1), t.fillGradientType === Kn.LINEAR_VERTICAL) {
                    i = this.context.createLinearGradient(s / 2, 0, s / 2, a), r = (h.length + 1) * e.length, n = 0;
                    for (var d = 0; d < e.length; d++) {
                        n += 1;
                        for (var p = 0; p < h.length; p++) o = "number" == typeof u[p] ? u[p] / e.length + d / e.length : n / r, i.addColorStop(o, h[p]), n++
                    }
                } else {
                    i = this.context.createLinearGradient(0, a / 2, s, a / 2), r = h.length + 1, n = 1;
                    for (var f = 0; f < h.length; f++) o = "number" == typeof u[f] ? u[f] : n / r, i.addColorStop(o, h[f]), n++
                }
                return i
            }, e.prototype.destroy = function(e) {
                "boolean" == typeof e && (e = {
                    children: e
                }), e = Object.assign({}, oo, e), t.prototype.destroy.call(this, e), this.context = null, this.canvas = null, this._style = null
            }, i.width.get = function() {
                return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width
            }, i.width.set = function(t) {
                this.updateText(!0);
                var e = Wt(this.scale.x) || 1;
                this.scale.x = e * t / this._texture.orig.width, this._width = t
            }, i.height.get = function() {
                return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height
            }, i.height.set = function(t) {
                this.updateText(!0);
                var e = Wt(this.scale.y) || 1;
                this.scale.y = e * t / this._texture.orig.height, this._height = t
            }, i.style.get = function() {
                return this._style
            }, i.style.set = function(t) {
                t = t || {}, this._style = t instanceof Qn ? t : new Qn(t), this.localStyleID = -1, this.dirty = !0
            }, i.text.get = function() {
                return this._text
            }, i.text.set = function(t) {
                t = String(null == t ? "" : t), this._text !== t && (this._text = t, this.dirty = !0)
            }, i.resolution.get = function() {
                return this._resolution
            }, i.resolution.set = function(t) {
                this._autoResolution = !1, this._resolution !== t && (this._resolution = t, this.dirty = !0)
            }, Object.defineProperties(e.prototype, i), e
        }(qn);
    g.UPLOADS_PER_FRAME = 4;
    var ao = function(t) {
        this.maxItemsPerFrame = t, this.itemsLeft = 0
    };
    ao.prototype.beginFrame = function() {
        this.itemsLeft = this.maxItemsPerFrame
    }, ao.prototype.allowedToUpload = function() {
        return this.itemsLeft-- > 0
    };
    var ho = function(t) {
        var e = this;
        this.limiter = new ao(g.UPLOADS_PER_FRAME), this.renderer = t, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function() {
            e.queue && e.prepareItems()
        }, this.registerFindHook(mo), this.registerFindHook(go), this.registerFindHook(uo), this.registerFindHook(lo), this.registerFindHook(co), this.registerUploadHook(po), this.registerUploadHook(fo)
    };

    function uo(t, e) {
        var i = !1;
        if (t && t._textures && t._textures.length)
            for (var r = 0; r < t._textures.length; r++)
                if (t._textures[r] instanceof _i) {
                    var n = t._textures[r].baseTexture; - 1 === e.indexOf(n) && (e.push(n), i = !0)
                }
        return i
    }

    function lo(t, e) {
        return t instanceof ni && (-1 === e.indexOf(t) && e.push(t), !0)
    }

    function co(t, e) {
        if (t._texture && t._texture instanceof _i) {
            var i = t._texture.baseTexture;
            return -1 === e.indexOf(i) && e.push(i), !0
        }
        return !1
    }

    function po(t, e) {
        return e instanceof so && (e.updateText(!0), !0)
    }

    function fo(t, e) {
        if (e instanceof Qn) {
            var i = e.toFontString();
            return ro.measureFont(i), !0
        }
        return !1
    }

    function mo(t, e) {
        if (t instanceof so) {
            -1 === e.indexOf(t.style) && e.push(t.style), -1 === e.indexOf(t) && e.push(t);
            var i = t._texture.baseTexture;
            return -1 === e.indexOf(i) && e.push(i), !0
        }
        return !1
    }

    function go(t, e) {
        return t instanceof Qn && (-1 === e.indexOf(t) && e.push(t), !0)
    }
    ho.prototype.upload = function(t, e) {
        "function" == typeof t && (e = t, t = null), t && this.add(t), this.queue.length ? (e && this.completes.push(e), this.ticking || (this.ticking = !0, We.system.addOnce(this.tick, this, He.UTILITY))) : e && e()
    }, ho.prototype.tick = function() {
        setTimeout(this.delayedTick, 0)
    }, ho.prototype.prepareItems = function() {
        for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload();) {
            var t = this.queue[0],
                e = !1;
            if (t && !t._destroyed)
                for (var i = 0, r = this.uploadHooks.length; i < r; i++)
                    if (this.uploadHooks[i](this.uploadHookHelper, t)) {
                        this.queue.shift(), e = !0;
                        break
                    }
            e || this.queue.shift()
        }
        if (this.queue.length) We.system.addOnce(this.tick, this, He.UTILITY);
        else {
            this.ticking = !1;
            var n = this.completes.slice(0);
            this.completes.length = 0;
            for (var o = 0, s = n.length; o < s; o++) n[o]()
        }
    }, ho.prototype.registerFindHook = function(t) {
        return t && this.addHooks.push(t), this
    }, ho.prototype.registerUploadHook = function(t) {
        return t && this.uploadHooks.push(t), this
    }, ho.prototype.add = function(t) {
        for (var e = 0, i = this.addHooks.length; e < i && !this.addHooks[e](t, this.queue); e++);
        if (t instanceof Ne)
            for (var r = t.children.length - 1; r >= 0; r--) this.add(t.children[r]);
        return this
    }, ho.prototype.destroy = function() {
        this.ticking && We.system.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null
    };
    var vo = function(t) {
        function e(e) {
            t.call(this, e), this.uploadHookHelper = this.renderer, this.registerFindHook(bo), this.registerUploadHook(yo), this.registerUploadHook(_o)
        }
        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
    }(ho);

    function yo(t, e) {
        return e instanceof ni && (e._glTextures[t.CONTEXT_UID] || t.texture.bind(e), !0)
    }

    function _o(t, e) {
        return e instanceof zn && ((e.dirty || e.clearDirty || !e._webGL[t.plugins.graphics.CONTEXT_UID]) && t.plugins.graphics.updateGraphics(e), !0)
    }

    function bo(t, e) {
        return t instanceof zn && (e.push(t), !0)
    }
    var xo = function(t) {
        this.maxMilliseconds = t, this.frameStart = 0
    };
    xo.prototype.beginFrame = function() {
        this.frameStart = Date.now()
    }, xo.prototype.allowedToUpload = function() {
        return Date.now() - this.frameStart < this.maxMilliseconds
    };
    var wo = {
            BasePrepare: ho,
            CountLimiter: ao,
            Prepare: vo,
            TimeLimiter: xo
        },
        To = function t(e) {
            var i = this;
            e = Object.assign({
                forceCanvas: !1
            }, e), this.renderer = qr(e), this.stage = new Ne, t._plugins.forEach(function(t) {
                t.init.call(i, e)
            })
        },
        So = {
            view: {
                configurable: !0
            },
            screen: {
                configurable: !0
            }
        };
    To.registerPlugin = function(t) {
        To._plugins.push(t)
    }, To.prototype.render = function() {
        this.renderer.render(this.stage)
    }, So.view.get = function() {
        return this.renderer.view
    }, So.screen.get = function() {
        return this.renderer.screen
    }, To.prototype.destroy = function(t, e) {
        var i = this,
            r = To._plugins.slice(0);
        r.reverse(), r.forEach(function(t) {
            t.destroy.call(i)
        }), this.stage.destroy(e), this.stage = null, this.renderer.destroy(t), this.renderer = null, this._options = null
    }, Object.defineProperties(To.prototype, So), To._plugins = [];
    var Eo = function() {};
    Eo.init = function(t) {
        var e = this;
        Object.defineProperty(this, "resizeTo", {
            set: function(t) {
                window.removeEventListener("resize", this.resize), this._resizeTo = t, t && (window.addEventListener("resize", this.resize), this.resize())
            },
            get: function() {
                return this._resizeTo
            }
        }), this.resize = function() {
            e._resizeTo && (e._resizeTo === window ? e.renderer.resize(window.innerWidth, window.innerHeight) : e.renderer.resize(e._resizeTo.clientWidth, e._resizeTo.clientHeight))
        }, this._resizeTo = null, this.resizeTo = t.resizeTo || null
    }, Eo.destroy = function() {
        this.resizeTo = null, this.resize = null
    }, To.registerPlugin(Eo);
    var Po = function(t, e) {
            e = e || {};
            for (var i = {
                    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                    q: {
                        name: "queryKey",
                        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                    },
                    parser: {
                        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                    }
                }, r = i.parser[e.strictMode ? "strict" : "loose"].exec(t), n = {}, o = 14; o--;) n[i.key[o]] = r[o] || "";
            return n[i.q.name] = {}, n[i.key[12]].replace(i.q.parser, function(t, e, r) {
                e && (n[i.q.name][e] = r)
            }), n
        },
        Io = function(t) {
            return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
        }(i(function(t, e) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }();

            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }
            var n = function() {
                function t(e, i, n) {
                    void 0 === i && (i = !1), r(this, t), this._fn = e, this._once = i, this._thisArg = n, this._next = this._prev = this._owner = null
                }
                return i(t, [{
                    key: "detach",
                    value: function() {
                        return null !== this._owner && (this._owner.detach(this), !0)
                    }
                }]), t
            }();

            function o(t, e) {
                return t._head ? (t._tail._next = e, e._prev = t._tail, t._tail = e) : (t._head = e, t._tail = e), e._owner = t, e
            }
            var s = function() {
                function t() {
                    r(this, t), this._head = this._tail = void 0
                }
                return i(t, [{
                    key: "handlers",
                    value: function() {
                        var t = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0],
                            e = this._head;
                        if (t) return !!e;
                        for (var i = []; e;) i.push(e), e = e._next;
                        return i
                    }
                }, {
                    key: "has",
                    value: function(t) {
                        if (!(t instanceof n)) throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");
                        return t._owner === this
                    }
                }, {
                    key: "dispatch",
                    value: function() {
                        var t = arguments,
                            e = this._head;
                        if (!e) return !1;
                        for (; e;) e._once && this.detach(e), e._fn.apply(e._thisArg, t), e = e._next;
                        return !0
                    }
                }, {
                    key: "add",
                    value: function(t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                        if ("function" != typeof t) throw new Error("MiniSignal#add(): First arg must be a Function.");
                        return o(this, new n(t, !1, e))
                    }
                }, {
                    key: "once",
                    value: function(t) {
                        var e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                        if ("function" != typeof t) throw new Error("MiniSignal#once(): First arg must be a Function.");
                        return o(this, new n(t, !0, e))
                    }
                }, {
                    key: "detach",
                    value: function(t) {
                        if (!(t instanceof n)) throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");
                        return t._owner !== this ? this : (t._prev && (t._prev._next = t._next), t._next && (t._next._prev = t._prev), t === this._head ? (this._head = t._next, null === t._next && (this._tail = null)) : t === this._tail && (this._tail = t._prev, this._tail._next = null), t._owner = null, this)
                    }
                }, {
                    key: "detachAll",
                    value: function() {
                        var t = this._head;
                        if (!t) return this;
                        for (this._head = this._tail = null; t;) t._owner = null, t = t._next;
                        return this
                    }
                }]), t
            }();
            s.MiniSignalBinding = n, e.default = s, t.exports = e.default
        }));

    function Co() {}

    function Ao(t, e, i, r) {
        var n = 0,
            o = t.length;
        ! function s(a) {
            a || n === o ? i && i(a) : r ? setTimeout(function() {
                e(t[n++], s)
            }, 1) : e(t[n++], s)
        }()
    }

    function Mo(t) {
        return function() {
            if (null === t) throw new Error("Callback was already called.");
            var e = t;
            t = null, e.apply(this, arguments)
        }
    }
    var Oo = {};

    function Ro(t, e) {
        for (var i = 0; i < e.length; i++) {
            var r = e[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    function Do(t, e, i) {
        return e && Ro(t.prototype, e), i && Ro(t, i), t
    }
    var Fo = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest),
        Lo = null;

    function Bo() {}
    var ko = function() {
        function t(e, i, r) {
            if ("string" != typeof e || "string" != typeof i) throw new Error("Both name and url are required for constructing a resource.");
            r = r || {}, this._flags = 0, this._setFlag(t.STATUS_FLAGS.DATA_URL, 0 === i.indexOf("data:")), this.name = e, this.url = i, this.extension = this._getExtension(), this.data = null, this.crossOrigin = !0 === r.crossOrigin ? "anonymous" : r.crossOrigin, this.timeout = r.timeout || 0, this.loadType = r.loadType || this._determineLoadType(), this.xhrType = r.xhrType, this.metadata = r.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = t.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = Bo, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundOnTimeout = this._onTimeout.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this.onStart = new Io, this.onProgress = new Io, this.onComplete = new Io, this.onAfterMiddleware = new Io
        }
        t.setExtensionLoadType = function(e, i) {
            No(t._loadTypeMap, e, i)
        }, t.setExtensionXhrType = function(e, i) {
            No(t._xhrTypeMap, e, i)
        };
        var e = t.prototype;
        return e.complete = function() {
            this._clearEvents(), this._finish()
        }, e.abort = function(e) {
            if (!this.error) {
                if (this.error = new Error(e), this._clearEvents(), this.xhr) this.xhr.abort();
                else if (this.xdr) this.xdr.abort();
                else if (this.data)
                    if (this.data.src) this.data.src = t.EMPTY_GIF;
                    else
                        for (; this.data.firstChild;) this.data.removeChild(this.data.firstChild);
                this._finish()
            }
        }, e.load = function(e) {
            var i = this;
            if (!this.isLoading)
                if (this.isComplete) e && setTimeout(function() {
                    return e(i)
                }, 1);
                else switch (e && this.onComplete.once(e), this._setFlag(t.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
                    case t.LOAD_TYPE.IMAGE:
                        this.type = t.TYPE.IMAGE, this._loadElement("image");
                        break;
                    case t.LOAD_TYPE.AUDIO:
                        this.type = t.TYPE.AUDIO, this._loadSourceElement("audio");
                        break;
                    case t.LOAD_TYPE.VIDEO:
                        this.type = t.TYPE.VIDEO, this._loadSourceElement("video");
                        break;
                    case t.LOAD_TYPE.XHR:
                    default:
                        Fo && this.crossOrigin ? this._loadXdr() : this._loadXhr()
                }
        }, e._hasFlag = function(t) {
            return 0 != (this._flags & t)
        }, e._setFlag = function(t, e) {
            this._flags = e ? this._flags | t : this._flags & ~t
        }, e._clearEvents = function() {
            clearTimeout(this._elementTimer), this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null))
        }, e._finish = function() {
            if (this.isComplete) throw new Error("Complete called again for an already completed resource.");
            this._setFlag(t.STATUS_FLAGS.COMPLETE, !0), this._setFlag(t.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this)
        }, e._loadElement = function(t) {
            this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === t && void 0 !== window.Image ? this.data = new Image : this.data = document.createElement(t), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout))
        }, e._loadSourceElement = function(t) {
            if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === t && void 0 !== window.Audio ? this.data = new Audio : this.data = document.createElement(t), null !== this.data) {
                if (this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), !this.metadata.skipSource)
                    if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
                    else if (Array.isArray(this.url))
                    for (var e = this.metadata.mimeType, i = 0; i < this.url.length; ++i) this.data.appendChild(this._createSource(t, this.url[i], Array.isArray(e) ? e[i] : e));
                else {
                    var r = this.metadata.mimeType;
                    this.data.appendChild(this._createSource(t, this.url, Array.isArray(r) ? r[0] : r))
                }
                this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load(), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout))
            } else this.abort("Unsupported element: " + t)
        }, e._loadXhr = function() {
            "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
            var e = this.xhr = new XMLHttpRequest;
            e.open("GET", this.url, !0), e.timeout = this.timeout, this.xhrType === t.XHR_RESPONSE_TYPE.JSON || this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT ? e.responseType = t.XHR_RESPONSE_TYPE.TEXT : e.responseType = this.xhrType, e.addEventListener("error", this._boundXhrOnError, !1), e.addEventListener("timeout", this._boundXhrOnTimeout, !1), e.addEventListener("abort", this._boundXhrOnAbort, !1), e.addEventListener("progress", this._boundOnProgress, !1), e.addEventListener("load", this._boundXhrOnLoad, !1), e.send()
        }, e._loadXdr = function() {
            "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
            var t = this.xhr = new XDomainRequest;
            t.timeout = this.timeout || 5e3, t.onerror = this._boundXhrOnError, t.ontimeout = this._boundXhrOnTimeout, t.onprogress = this._boundOnProgress, t.onload = this._boundXhrOnLoad, t.open("GET", this.url, !0), setTimeout(function() {
                return t.send()
            }, 1)
        }, e._createSource = function(t, e, i) {
            i || (i = t + "/" + this._getExtension(e));
            var r = document.createElement("source");
            return r.src = e, r.type = i, r
        }, e._onError = function(t) {
            this.abort("Failed to load element using: " + t.target.nodeName)
        }, e._onProgress = function(t) {
            t && t.lengthComputable && this.onProgress.dispatch(this, t.loaded / t.total)
        }, e._onTimeout = function() {
            this.abort("Load timed out.")
        }, e._xhrOnError = function() {
            var t = this.xhr;
            this.abort(Uo(t) + " Request failed. Status: " + t.status + ', text: "' + t.statusText + '"')
        }, e._xhrOnTimeout = function() {
            var t = this.xhr;
            this.abort(Uo(t) + " Request timed out.")
        }, e._xhrOnAbort = function() {
            var t = this.xhr;
            this.abort(Uo(t) + " Request was aborted by the user.")
        }, e._xhrOnLoad = function() {
            var e = this.xhr,
                i = "",
                r = void 0 === e.status ? 200 : e.status;
            if ("" !== e.responseType && "text" !== e.responseType && void 0 !== e.responseType || (i = e.responseText), 0 === r && (i.length > 0 || e.responseType === t.XHR_RESPONSE_TYPE.BUFFER) ? r = 200 : 1223 === r && (r = 204), 2 == (r / 100 | 0)) {
                if (this.xhrType === t.XHR_RESPONSE_TYPE.TEXT) this.data = i, this.type = t.TYPE.TEXT;
                else if (this.xhrType === t.XHR_RESPONSE_TYPE.JSON) try {
                        this.data = JSON.parse(i), this.type = t.TYPE.JSON
                    } catch (t) {
                        return void this.abort("Error trying to parse loaded json: " + t)
                    } else if (this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT) try {
                        if (window.DOMParser) {
                            var n = new DOMParser;
                            this.data = n.parseFromString(i, "text/xml")
                        } else {
                            var o = document.createElement("div");
                            o.innerHTML = i, this.data = o
                        }
                        this.type = t.TYPE.XML
                    } catch (t) {
                        return void this.abort("Error trying to parse loaded xml: " + t)
                    } else this.data = e.response || i;
                this.complete()
            } else this.abort("[" + e.status + "] " + e.statusText + ": " + e.responseURL)
        }, e._determineCrossOrigin = function(t, e) {
            if (0 === t.indexOf("data:")) return "";
            if (window.origin !== window.location.origin) return "anonymous";
            e = e || window.location, Lo || (Lo = document.createElement("a")), Lo.href = t;
            var i = !(t = Po(Lo.href, {
                    strictMode: !0
                })).port && "" === e.port || t.port === e.port,
                r = t.protocol ? t.protocol + ":" : "";
            return t.host === e.hostname && i && r === e.protocol ? "" : "anonymous"
        }, e._determineXhrType = function() {
            return t._xhrTypeMap[this.extension] || t.XHR_RESPONSE_TYPE.TEXT
        }, e._determineLoadType = function() {
            return t._loadTypeMap[this.extension] || t.LOAD_TYPE.XHR
        }, e._getExtension = function() {
            var t = this.url,
                e = "";
            if (this.isDataUrl) {
                var i = t.indexOf("/");
                e = t.substring(i + 1, t.indexOf(";", i))
            } else {
                var r = t.indexOf("?"),
                    n = t.indexOf("#"),
                    o = Math.min(r > -1 ? r : t.length, n > -1 ? n : t.length);
                e = (t = t.substring(0, o)).substring(t.lastIndexOf(".") + 1)
            }
            return e.toLowerCase()
        }, e._getMimeFromXhrType = function(e) {
            switch (e) {
                case t.XHR_RESPONSE_TYPE.BUFFER:
                    return "application/octet-binary";
                case t.XHR_RESPONSE_TYPE.BLOB:
                    return "application/blob";
                case t.XHR_RESPONSE_TYPE.DOCUMENT:
                    return "application/xml";
                case t.XHR_RESPONSE_TYPE.JSON:
                    return "application/json";
                case t.XHR_RESPONSE_TYPE.DEFAULT:
                case t.XHR_RESPONSE_TYPE.TEXT:
                default:
                    return "text/plain"
            }
        }, Do(t, [{
            key: "isDataUrl",
            get: function() {
                return this._hasFlag(t.STATUS_FLAGS.DATA_URL)
            }
        }, {
            key: "isComplete",
            get: function() {
                return this._hasFlag(t.STATUS_FLAGS.COMPLETE)
            }
        }, {
            key: "isLoading",
            get: function() {
                return this._hasFlag(t.STATUS_FLAGS.LOADING)
            }
        }]), t
    }();

    function No(t, e, i) {
        e && 0 === e.indexOf(".") && (e = e.substring(1)), e && (t[e] = i)
    }

    function Uo(t) {
        return t.toString().replace("object ", "")
    }
    ko.STATUS_FLAGS = {
        NONE: 0,
        DATA_URL: 1,
        COMPLETE: 2,
        LOADING: 4
    }, ko.TYPE = {
        UNKNOWN: 0,
        JSON: 1,
        XML: 2,
        IMAGE: 3,
        AUDIO: 4,
        VIDEO: 5,
        TEXT: 6
    }, ko.LOAD_TYPE = {
        XHR: 1,
        IMAGE: 2,
        AUDIO: 3,
        VIDEO: 4
    }, ko.XHR_RESPONSE_TYPE = {
        DEFAULT: "text",
        BUFFER: "arraybuffer",
        BLOB: "blob",
        DOCUMENT: "document",
        JSON: "json",
        TEXT: "text"
    }, ko._loadTypeMap = {
        gif: ko.LOAD_TYPE.IMAGE,
        png: ko.LOAD_TYPE.IMAGE,
        bmp: ko.LOAD_TYPE.IMAGE,
        jpg: ko.LOAD_TYPE.IMAGE,
        jpeg: ko.LOAD_TYPE.IMAGE,
        tif: ko.LOAD_TYPE.IMAGE,
        tiff: ko.LOAD_TYPE.IMAGE,
        webp: ko.LOAD_TYPE.IMAGE,
        tga: ko.LOAD_TYPE.IMAGE,
        svg: ko.LOAD_TYPE.IMAGE,
        "svg+xml": ko.LOAD_TYPE.IMAGE,
        mp3: ko.LOAD_TYPE.AUDIO,
        ogg: ko.LOAD_TYPE.AUDIO,
        wav: ko.LOAD_TYPE.AUDIO,
        mp4: ko.LOAD_TYPE.VIDEO,
        webm: ko.LOAD_TYPE.VIDEO
    }, ko._xhrTypeMap = {
        xhtml: ko.XHR_RESPONSE_TYPE.DOCUMENT,
        html: ko.XHR_RESPONSE_TYPE.DOCUMENT,
        htm: ko.XHR_RESPONSE_TYPE.DOCUMENT,
        xml: ko.XHR_RESPONSE_TYPE.DOCUMENT,
        tmx: ko.XHR_RESPONSE_TYPE.DOCUMENT,
        svg: ko.XHR_RESPONSE_TYPE.DOCUMENT,
        tsx: ko.XHR_RESPONSE_TYPE.DOCUMENT,
        gif: ko.XHR_RESPONSE_TYPE.BLOB,
        png: ko.XHR_RESPONSE_TYPE.BLOB,
        bmp: ko.XHR_RESPONSE_TYPE.BLOB,
        jpg: ko.XHR_RESPONSE_TYPE.BLOB,
        jpeg: ko.XHR_RESPONSE_TYPE.BLOB,
        tif: ko.XHR_RESPONSE_TYPE.BLOB,
        tiff: ko.XHR_RESPONSE_TYPE.BLOB,
        webp: ko.XHR_RESPONSE_TYPE.BLOB,
        tga: ko.XHR_RESPONSE_TYPE.BLOB,
        json: ko.XHR_RESPONSE_TYPE.JSON,
        text: ko.XHR_RESPONSE_TYPE.TEXT,
        txt: ko.XHR_RESPONSE_TYPE.TEXT,
        ttf: ko.XHR_RESPONSE_TYPE.BUFFER,
        otf: ko.XHR_RESPONSE_TYPE.BUFFER
    }, ko.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    var jo = window.URL || window.webkitURL,
        Xo = {
            caching: function(t, e) {
                var i = this;
                Oo[t.url] ? (t.data = Oo[t.url], t.complete()) : t.onComplete.once(function() {
                    return Oo[i.url] = i.data
                }), e()
            },
            parsing: function(t, e) {
                if (t.data) {
                    if (t.xhr && t.xhrType === ko.XHR_RESPONSE_TYPE.BLOB)
                        if (window.Blob && "string" != typeof t.data) {
                            if (0 === t.data.type.indexOf("image")) {
                                var i = jo.createObjectURL(t.data);
                                return t.blob = t.data, t.data = new Image, t.data.src = i, t.type = ko.TYPE.IMAGE, void(t.data.onload = function() {
                                    jo.revokeObjectURL(i), t.data.onload = null, e()
                                })
                            }
                        } else {
                            var r = t.xhr.getResponseHeader("content-type");
                            if (r && 0 === r.indexOf("image")) return t.data = new Image, t.data.src = "data:" + r + ";base64," + function(t) {
                                for (var e = "", i = 0; i < t.length;) {
                                    for (var r = [0, 0, 0], n = [0, 0, 0, 0], o = 0; o < r.length; ++o) i < t.length ? r[o] = 255 & t.charCodeAt(i++) : r[o] = 0;
                                    switch (n[0] = r[0] >> 2, n[1] = (3 & r[0]) << 4 | r[1] >> 4, n[2] = (15 & r[1]) << 2 | r[2] >> 6, n[3] = 63 & r[2], i - (t.length - 1)) {
                                        case 2:
                                            n[3] = 64, n[2] = 64;
                                            break;
                                        case 1:
                                            n[3] = 64
                                    }
                                    for (var s = 0; s < n.length; ++s) e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(n[s])
                                }
                                return e
                            }(t.xhr.responseText), t.type = ko.TYPE.IMAGE, void(t.data.onload = function() {
                                t.data.onload = null, e()
                            })
                        }
                    e()
                } else e()
            }
        },
        Go = /(#[\w-]+)?$/,
        Vo = function() {
            function t(e, i) {
                var r = this;
                void 0 === e && (e = ""), void 0 === i && (i = 10), this.baseUrl = e, this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(t, e) {
                    return r._loadResource(t, e)
                }, this._queue = function(t, e) {
                    if (null == e) e = 1;
                    else if (0 === e) throw new Error("Concurrency must not be zero");
                    var i = 0,
                        r = {
                            _tasks: [],
                            concurrency: e,
                            saturated: Co,
                            unsaturated: Co,
                            buffer: e / 4,
                            empty: Co,
                            drain: Co,
                            error: Co,
                            started: !1,
                            paused: !1,
                            push: function(t, e) {
                                n(t, !1, e)
                            },
                            kill: function() {
                                i = 0, r.drain = Co, r.started = !1, r._tasks = []
                            },
                            unshift: function(t, e) {
                                n(t, !0, e)
                            },
                            process: function() {
                                for (; !r.paused && i < r.concurrency && r._tasks.length;) {
                                    var e = r._tasks.shift();
                                    0 === r._tasks.length && r.empty(), (i += 1) === r.concurrency && r.saturated(), t(e.data, Mo(o(e)))
                                }
                            },
                            length: function() {
                                return r._tasks.length
                            },
                            running: function() {
                                return i
                            },
                            idle: function() {
                                return r._tasks.length + i === 0
                            },
                            pause: function() {
                                !0 !== r.paused && (r.paused = !0)
                            },
                            resume: function() {
                                if (!1 !== r.paused) {
                                    r.paused = !1;
                                    for (var t = 1; t <= r.concurrency; t++) r.process()
                                }
                            }
                        };

                    function n(t, e, i) {
                        if (null != i && "function" != typeof i) throw new Error("task callback must be a function");
                        if (r.started = !0, null == t && r.idle()) setTimeout(function() {
                            return r.drain()
                        }, 1);
                        else {
                            var n = {
                                data: t,
                                callback: "function" == typeof i ? i : Co
                            };
                            e ? r._tasks.unshift(n) : r._tasks.push(n), setTimeout(function() {
                                return r.process()
                            }, 1)
                        }
                    }

                    function o(t) {
                        return function() {
                            i -= 1, t.callback.apply(t, arguments), null != arguments[0] && r.error(arguments[0], t.data), i <= r.concurrency - r.buffer && r.unsaturated(), r.idle() && r.drain(), r.process()
                        }
                    }
                    return r
                }(this._boundLoadResource, i), this._queue.pause(), this.resources = {}, this.onProgress = new Io, this.onError = new Io, this.onLoad = new Io, this.onStart = new Io, this.onComplete = new Io;
                for (var n = 0; n < t._defaultBeforeMiddleware.length; ++n) this.pre(t._defaultBeforeMiddleware[n]);
                for (var o = 0; o < t._defaultAfterMiddleware.length; ++o) this.use(t._defaultAfterMiddleware[o])
            }
            var e = t.prototype;
            return e.add = function(t, e, i, r) {
                if (Array.isArray(t)) {
                    for (var n = 0; n < t.length; ++n) this.add(t[n]);
                    return this
                }
                if ("object" == typeof t && (r = e || t.callback || t.onComplete, i = t, e = t.url, t = t.name || t.key || t.url), "string" != typeof e && (r = i, i = e, e = t), "string" != typeof e) throw new Error("No url passed to add resource to loader.");
                if ("function" == typeof i && (r = i, i = null), this.loading && (!i || !i.parentResource)) throw new Error("Cannot add resources while the loader is running.");
                if (this.resources[t]) throw new Error('Resource named "' + t + '" already exists.');
                if (e = this._prepareUrl(e), this.resources[t] = new ko(t, e, i), "function" == typeof r && this.resources[t].onAfterMiddleware.once(r), this.loading) {
                    for (var o = i.parentResource, s = [], a = 0; a < o.children.length; ++a) o.children[a].isComplete || s.push(o.children[a]);
                    var h = o.progressChunk * (s.length + 1) / (s.length + 2);
                    o.children.push(this.resources[t]), o.progressChunk = h;
                    for (var u = 0; u < s.length; ++u) s[u].progressChunk = h;
                    this.resources[t].progressChunk = h
                }
                return this._queue.push(this.resources[t]), this
            }, e.pre = function(t) {
                return this._beforeMiddleware.push(t), this
            }, e.use = function(t) {
                return this._afterMiddleware.push(t), this
            }, e.reset = function() {
                for (var t in this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause(), this.resources) {
                    var e = this.resources[t];
                    e._onLoadBinding && e._onLoadBinding.detach(), e.isLoading && e.abort()
                }
                return this.resources = {}, this
            }, e.load = function(t) {
                if ("function" == typeof t && this.onComplete.once(t), this.loading) return this;
                if (this._queue.idle()) this._onStart(), this._onComplete();
                else {
                    for (var e = 100 / this._queue._tasks.length, i = 0; i < this._queue._tasks.length; ++i) this._queue._tasks[i].data.progressChunk = e;
                    this._onStart(), this._queue.resume()
                }
                return this
            }, e._prepareUrl = function(t) {
                var e, i = Po(t, {
                    strictMode: !0
                });
                if (e = i.protocol || !i.path || 0 === t.indexOf("//") ? t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== t.charAt(0) ? this.baseUrl + "/" + t : this.baseUrl + t, this.defaultQueryString) {
                    var r = Go.exec(e)[0]; - 1 !== (e = e.substr(0, e.length - r.length)).indexOf("?") ? e += "&" + this.defaultQueryString : e += "?" + this.defaultQueryString, e += r
                }
                return e
            }, e._loadResource = function(t, e) {
                var i = this;
                t._dequeue = e, Ao(this._beforeMiddleware, function(e, r) {
                    e.call(i, t, function() {
                        r(t.isComplete ? {} : null)
                    })
                }, function() {
                    t.isComplete ? i._onLoad(t) : (t._onLoadBinding = t.onComplete.once(i._onLoad, i), t.load())
                }, !0)
            }, e._onStart = function() {
                this.progress = 0, this.loading = !0, this.onStart.dispatch(this)
            }, e._onComplete = function() {
                this.progress = 100, this.loading = !1, this.onComplete.dispatch(this, this.resources)
            }, e._onLoad = function(t) {
                var e = this;
                t._onLoadBinding = null, this._resourcesParsing.push(t), t._dequeue(), Ao(this._afterMiddleware, function(i, r) {
                    i.call(e, t, r)
                }, function() {
                    t.onAfterMiddleware.dispatch(t), e.progress = Math.min(100, e.progress + t.progressChunk), e.onProgress.dispatch(e, t), t.error ? e.onError.dispatch(t.error, e, t) : e.onLoad.dispatch(e, t), e._resourcesParsing.splice(e._resourcesParsing.indexOf(t), 1), e._queue.idle() && 0 === e._resourcesParsing.length && e._onComplete()
                }, !0)
            }, Do(t, [{
                key: "concurrency",
                get: function() {
                    return this._queue.concurrency
                },
                set: function(t) {
                    this._queue.concurrency = t
                }
            }]), t
        }();
    Vo._defaultBeforeMiddleware = [], Vo._defaultAfterMiddleware = [], Vo.pre = function(t) {
        return Vo._defaultBeforeMiddleware.push(t), Vo
    }, Vo.use = function(t) {
        return Vo._defaultAfterMiddleware.push(t), Vo
    };
    var Ho = function() {};
    Ho.use = function(t, e) {
        t.data && t.type === ko.TYPE.IMAGE && (t.texture = _i.fromLoader(t.data, t.url, t.name)), e()
    };
    var zo = function(t) {
        function e(i, r) {
            var n = this;
            t.call(this, i, r), v.call(this);
            for (var o = 0; o < e._plugins.length; ++o) {
                var s = e._plugins[o],
                    a = s.pre,
                    h = s.use;
                a && this.pre(a), h && this.use(h)
            }
            this.onStart.add(function(t) {
                return n.emit("start", t)
            }), this.onProgress.add(function(t, e) {
                return n.emit("progress", t, e)
            }), this.onError.add(function(t, e, i) {
                return n.emit("error", t, e, i)
            }), this.onLoad.add(function(t, e) {
                return n.emit("load", t, e)
            }), this.onComplete.add(function(t, e) {
                return n.emit("complete", t, e)
            }), this._protected = !1
        }
        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var i = {
            shared: {
                configurable: !0
            }
        };
        return e.prototype.destroy = function() {
            this._protected || (this.removeAllListeners(), this.reset())
        }, i.shared.get = function() {
            var t = e._shared;
            return t || ((t = new e)._protected = !0, e._shared = t), t
        }, Object.defineProperties(e, i), e
    }(Vo);
    Object.assign(zo.prototype, v.prototype), zo._plugins = [], zo.registerPlugin = function(t) {
        return zo._plugins.push(t), t.add && t.add(), zo
    }, zo.registerPlugin({
        use: Xo.parsing
    }), zo.registerPlugin(Ho);
    var Wo = function() {};
    Wo.init = function(t) {
        t = Object.assign({
            sharedLoader: !1
        }, t), this.loader = t.sharedLoader ? zo.shared : new zo
    }, Wo.destroy = function() {
        this.loader && (this.loader.destroy(), this.loader = null)
    };
    var Yo = ko,
        qo = function(t) {
            function e(e, i, r, n) {
                void 0 === e && (e = 1500), void 0 === r && (r = 16384), void 0 === n && (n = !1), t.call(this), r > 16384 && (r = 16384), this._properties = [!1, !0, !1, !1, !1], this._maxSize = e, this._batchSize = r, this._buffers = null, this._bufferUpdateIDs = [], this._updateID = 0, this.interactiveChildren = !1, this.blendMode = yt.NORMAL, this.autoResize = n, this.roundPixels = !0, this.baseTexture = null, this.setProperties(i), this._tint = 0, this.tintRgb = new Float32Array(4), this.tint = 16777215
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                tint: {
                    configurable: !0
                }
            };
            return e.prototype.setProperties = function(t) {
                t && (this._properties[0] = "vertices" in t || "scale" in t ? !!t.vertices || !!t.scale : this._properties[0], this._properties[1] = "position" in t ? !!t.position : this._properties[1], this._properties[2] = "rotation" in t ? !!t.rotation : this._properties[2], this._properties[3] = "uvs" in t ? !!t.uvs : this._properties[3], this._properties[4] = "tint" in t || "alpha" in t ? !!t.tint || !!t.alpha : this._properties[4])
            }, e.prototype.updateTransform = function() {
                this.displayObjectUpdateTransform()
            }, i.tint.get = function() {
                return this._tint
            }, i.tint.set = function(t) {
                this._tint = t, Dt(t, this.tintRgb)
            }, e.prototype.render = function(t) {
                var e = this;
                this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.valid || this.baseTexture.once("update", function() {
                    return e.onChildrenChange(0)
                })), t.batch.setObjectRenderer(t.plugins.particle), t.plugins.particle.render(this))
            }, e.prototype.onChildrenChange = function(t) {
                for (var e = Math.floor(t / this._batchSize); this._bufferUpdateIDs.length < e;) this._bufferUpdateIDs.push(0);
                this._bufferUpdateIDs[e] = ++this._updateID
            }, e.prototype.dispose = function() {
                if (this._buffers) {
                    for (var t = 0; t < this._buffers.length; ++t) this._buffers[t].destroy();
                    this._buffers = null
                }
            }, e.prototype.destroy = function(e) {
                t.prototype.destroy.call(this, e), this.dispose(), this._properties = null, this._buffers = null, this._bufferUpdateIDs = null
            }, Object.defineProperties(e.prototype, i), e
        }(Ne),
        Ko = function(t, e, i) {
            this.geometry = new Oi, this.indexBuffer = null, this.size = i, this.dynamicProperties = [], this.staticProperties = [];
            for (var r = 0; r < t.length; ++r) {
                var n = t[r];
                n = {
                    attributeName: n.attributeName,
                    size: n.size,
                    uploadFunction: n.uploadFunction,
                    type: n.type || wt.FLOAT,
                    offset: n.offset
                }, e[r] ? this.dynamicProperties.push(n) : this.staticProperties.push(n)
            }
            this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers()
        };
    Ko.prototype.initBuffers = function() {
        var t = this.geometry,
            e = 0;
        this.indexBuffer = new Ei(Gt(this.size), !0, !0), t.addIndex(this.indexBuffer), this.dynamicStride = 0;
        for (var i = 0; i < this.dynamicProperties.length; ++i) {
            var r = this.dynamicProperties[i];
            r.offset = e, e += r.size, this.dynamicStride += r.size
        }
        var n = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
        this.dynamicData = new Float32Array(n), this.dynamicDataUint32 = new Uint32Array(n), this.dynamicBuffer = new Ei(this.dynamicData, !1, !1);
        var o = 0;
        this.staticStride = 0;
        for (var s = 0; s < this.staticProperties.length; ++s) {
            var a = this.staticProperties[s];
            a.offset = o, o += a.size, this.staticStride += a.size
        }
        var h = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
        this.staticData = new Float32Array(h), this.staticDataUint32 = new Uint32Array(h), this.staticBuffer = new Ei(this.staticData, !0, !1);
        for (var u = 0; u < this.dynamicProperties.length; ++u) {
            var l = this.dynamicProperties[u];
            t.addAttribute(l.attributeName, this.dynamicBuffer, 0, l.type === wt.UNSIGNED_BYTE, l.type, 4 * this.dynamicStride, 4 * l.offset)
        }
        for (var c = 0; c < this.staticProperties.length; ++c) {
            var d = this.staticProperties[c];
            t.addAttribute(d.attributeName, this.staticBuffer, 0, d.type === wt.UNSIGNED_BYTE, d.type, 4 * this.staticStride, 4 * d.offset)
        }
    }, Ko.prototype.uploadDynamic = function(t, e, i) {
        for (var r = 0; r < this.dynamicProperties.length; r++) {
            var n = this.dynamicProperties[r];
            n.uploadFunction(t, e, i, n.type === wt.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, n.offset)
        }
        this.dynamicBuffer._updateID++
    }, Ko.prototype.uploadStatic = function(t, e, i) {
        for (var r = 0; r < this.staticProperties.length; r++) {
            var n = this.staticProperties[r];
            n.uploadFunction(t, e, i, n.type === wt.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData, this.staticStride, n.offset)
        }
        this.staticBuffer._updateID++
    }, Ko.prototype.destroy = function() {
        this.indexBuffer = null, this.dynamicProperties = null, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.geometry.destroy()
    };
    var Zo = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nattribute vec2 aPositionCoord;\nattribute float aRotation;\n\nuniform mat3 translationMatrix;\nuniform vec4 uColor;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void){\n    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);\n    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);\n\n    vec2 v = vec2(x, y);\n    v = v + aPositionCoord;\n\n    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vColor = aColor * uColor;\n}\n",
        Jo = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n    gl_FragColor = color;\n}",
        Qo = function(t) {
            function e(e) {
                t.call(this, e), this.shader = null, this.properties = null, this.tempMatrix = new ge, this.properties = [{
                    attributeName: "aVertexPosition",
                    size: 2,
                    uploadFunction: this.uploadVertices,
                    offset: 0
                }, {
                    attributeName: "aPositionCoord",
                    size: 2,
                    uploadFunction: this.uploadPosition,
                    offset: 0
                }, {
                    attributeName: "aRotation",
                    size: 1,
                    uploadFunction: this.uploadRotation,
                    offset: 0
                }, {
                    attributeName: "aTextureCoord",
                    size: 2,
                    uploadFunction: this.uploadUvs,
                    offset: 0
                }, {
                    attributeName: "aColor",
                    size: 1,
                    type: wt.UNSIGNED_BYTE,
                    uploadFunction: this.uploadTint,
                    offset: 0
                }], this.shader = gr.from(Zo, Jo, {})
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.render = function(t) {
                var e = t.children,
                    i = t._maxSize,
                    r = t._batchSize,
                    n = this.renderer,
                    o = e.length;
                if (0 !== o) {
                    o > i && !t.autoResize && (o = i);
                    var s = t._buffers;
                    s || (s = t._buffers = this.generateBuffers(t));
                    var a = e[0]._texture.baseTexture;
                    this.renderer.state.setBlendMode(Nt(t.blendMode, a.premultiplyAlpha));
                    var h = n.gl,
                        u = t.worldTransform.copyTo(this.tempMatrix);
                    u.prepend(n.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = u.toArray(!0), this.shader.uniforms.uColor = Ut(t.tintRgb, t.worldAlpha, this.shader.uniforms.uColor, a.premultiplyAlpha), this.shader.uniforms.uSampler = a, this.renderer.shader.bind(this.shader);
                    for (var l = !1, c = 0, d = 0; c < o; c += r, d += 1) {
                        var p = o - c;
                        p > r && (p = r), d >= s.length && s.push(this._generateOneMoreBuffer(t));
                        var f = s[d];
                        f.uploadDynamic(e, c, p);
                        var m = t._bufferUpdateIDs[d] || 0;
                        (l = l || f._updateID < m) && (f._updateID = t._updateID, f.uploadStatic(e, c, p)), n.geometry.bind(f.geometry), h.drawElements(h.TRIANGLES, 6 * p, h.UNSIGNED_SHORT, 0)
                    }
                }
            }, e.prototype.generateBuffers = function(t) {
                for (var e = [], i = t._maxSize, r = t._batchSize, n = t._properties, o = 0; o < i; o += r) e.push(new Ko(this.properties, n, r));
                return e
            }, e.prototype._generateOneMoreBuffer = function(t) {
                var e = t._batchSize,
                    i = t._properties;
                return new Ko(this.properties, i, e)
            }, e.prototype.uploadVertices = function(t, e, i, r, n, o) {
                for (var s = 0, a = 0, h = 0, u = 0, l = 0; l < i; ++l) {
                    var c = t[e + l],
                        d = c._texture,
                        p = c.scale.x,
                        f = c.scale.y,
                        m = d.trim,
                        g = d.orig;
                    m ? (s = (a = m.x - c.anchor.x * g.width) + m.width, h = (u = m.y - c.anchor.y * g.height) + m.height) : (s = g.width * (1 - c.anchor.x), a = g.width * -c.anchor.x, h = g.height * (1 - c.anchor.y), u = g.height * -c.anchor.y), r[o] = a * p, r[o + 1] = u * f, r[o + n] = s * p, r[o + n + 1] = u * f, r[o + 2 * n] = s * p, r[o + 2 * n + 1] = h * f, r[o + 3 * n] = a * p, r[o + 3 * n + 1] = h * f, o += 4 * n
                }
            }, e.prototype.uploadPosition = function(t, e, i, r, n, o) {
                for (var s = 0; s < i; s++) {
                    var a = t[e + s].position;
                    r[o] = a.x, r[o + 1] = a.y, r[o + n] = a.x, r[o + n + 1] = a.y, r[o + 2 * n] = a.x, r[o + 2 * n + 1] = a.y, r[o + 3 * n] = a.x, r[o + 3 * n + 1] = a.y, o += 4 * n
                }
            }, e.prototype.uploadRotation = function(t, e, i, r, n, o) {
                for (var s = 0; s < i; s++) {
                    var a = t[e + s].rotation;
                    r[o] = a, r[o + n] = a, r[o + 2 * n] = a, r[o + 3 * n] = a, o += 4 * n
                }
            }, e.prototype.uploadUvs = function(t, e, i, r, n, o) {
                for (var s = 0; s < i; ++s) {
                    var a = t[e + s]._texture._uvs;
                    a ? (r[o] = a.x0, r[o + 1] = a.y0, r[o + n] = a.x1, r[o + n + 1] = a.y1, r[o + 2 * n] = a.x2, r[o + 2 * n + 1] = a.y2, r[o + 3 * n] = a.x3, r[o + 3 * n + 1] = a.y3, o += 4 * n) : (r[o] = 0, r[o + 1] = 0, r[o + n] = 0, r[o + n + 1] = 0, r[o + 2 * n] = 0, r[o + 2 * n + 1] = 0, r[o + 3 * n] = 0, r[o + 3 * n + 1] = 0, o += 4 * n)
                }
            }, e.prototype.uploadTint = function(t, e, i, r, n, o) {
                for (var s = 0; s < i; ++s) {
                    var a = t[e + s],
                        h = a._texture.baseTexture.premultiplyAlpha,
                        u = a.alpha,
                        l = u < 1 && h ? jt(a._tintRGB, u) : a._tintRGB + (255 * u << 24);
                    r[o] = l, r[o + n] = l, r[o + 2 * n] = l, r[o + 3 * n] = l, o += 4 * n
                }
            }, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), this.shader && (this.shader.destroy(), this.shader = null), this.tempMatrix = null
            }, e
        }(Ni),
        $o = function(t, e, i) {
            void 0 === i && (i = null), this.baseTexture = t, this.textures = {}, this.animations = {}, this.data = e, this.resolution = this._updateResolution(i || (this.baseTexture.resource ? this.baseTexture.resource.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null
        },
        ts = {
            BATCH_SIZE: {
                configurable: !0
            }
        };
    ts.BATCH_SIZE.get = function() {
        return 1e3
    }, $o.prototype._updateResolution = function(t) {
        var e = this.data.meta.scale,
            i = oe(t, null);
        return null === i && (i = void 0 !== e ? parseFloat(e) : 1), 1 !== i && this.baseTexture.setResolution(i), i
    }, $o.prototype.parse = function(t) {
        this._batchIndex = 0, this._callback = t, this._frameKeys.length <= $o.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch()
    }, $o.prototype._processFrames = function(t) {
        for (var e = t, i = $o.BATCH_SIZE; e - t < i && e < this._frameKeys.length;) {
            var r = this._frameKeys[e],
                n = this._frames[r],
                o = n.frame;
            if (o) {
                var s, a = null,
                    h = !1 !== n.trimmed && n.sourceSize ? n.sourceSize : n.frame,
                    u = new Ce(0, 0, Math.floor(h.w) / this.resolution, Math.floor(h.h) / this.resolution);
                s = n.rotated ? new Ce(Math.floor(o.x) / this.resolution, Math.floor(o.y) / this.resolution, Math.floor(o.h) / this.resolution, Math.floor(o.w) / this.resolution) : new Ce(Math.floor(o.x) / this.resolution, Math.floor(o.y) / this.resolution, Math.floor(o.w) / this.resolution, Math.floor(o.h) / this.resolution), !1 !== n.trimmed && n.spriteSourceSize && (a = new Ce(Math.floor(n.spriteSourceSize.x) / this.resolution, Math.floor(n.spriteSourceSize.y) / this.resolution, Math.floor(o.w) / this.resolution, Math.floor(o.h) / this.resolution)), this.textures[r] = new _i(this.baseTexture, s, u, a, n.rotated ? 2 : 0, n.anchor), _i.addToCache(this.textures[r], r)
            }
            e++
        }
    }, $o.prototype._processAnimations = function() {
        var t = this.data.animations || {};
        for (var e in t) {
            this.animations[e] = [];
            for (var i = 0; i < t[e].length; i++) {
                var r = t[e][i];
                this.animations[e].push(this.textures[r])
            }
        }
    }, $o.prototype._parseComplete = function() {
        var t = this._callback;
        this._callback = null, this._batchIndex = 0, t.call(this, this.textures)
    }, $o.prototype._nextBatch = function() {
        var t = this;
        this._processFrames(this._batchIndex * $o.BATCH_SIZE), this._batchIndex++, setTimeout(function() {
            t._batchIndex * $o.BATCH_SIZE < t._frameKeys.length ? t._nextBatch() : (t._processAnimations(), t._parseComplete())
        }, 0)
    }, $o.prototype.destroy = function(t) {
        for (var e in void 0 === t && (t = !1), this.textures) this.textures[e].destroy();
        this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && this.baseTexture.destroy(), this.baseTexture = null
    }, Object.defineProperties($o, ts);
    var es = function() {};
    es.use = function(t, e) {
        var i = t.name + "_image";
        if (t.data && t.type === Yo.TYPE.JSON && t.data.frames && !this.resources[i]) {
            var r = {
                    crossOrigin: t.crossOrigin,
                    metadata: t.metadata.imageMetadata,
                    parentResource: t
                },
                n = es.getResourcePath(t, this.baseUrl);
            this.add(i, n, r, function(i) {
                if (i.error) e(i.error);
                else {
                    var r = new $o(i.texture.baseTexture, t.data, t.url);
                    r.parse(function() {
                        t.spritesheet = r, t.textures = r.textures, e()
                    })
                }
            })
        } else e()
    }, es.getResourcePath = function(t, e) {
        return t.isDataUrl ? t.data.meta.image : mt.resolve(t.url.replace(e, ""), t.data.meta.image)
    };
    var is = new ue,
        rs = function(t) {
            function e(e, i, r) {
                void 0 === i && (i = 100), void 0 === r && (r = 100), t.call(this, e), this.tileTransform = new Pe, this._width = i, this._height = r, this._canvasPattern = null, this.uvMatrix = e.uvMatrix || new Sr(e), this.pluginName = "tilingSprite", this.uvRespectAnchor = !1
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                clampMargin: {
                    configurable: !0
                },
                tileScale: {
                    configurable: !0
                },
                tilePosition: {
                    configurable: !0
                },
                width: {
                    configurable: !0
                },
                height: {
                    configurable: !0
                }
            };
            return i.clampMargin.get = function() {
                return this.uvMatrix.clampMargin
            }, i.clampMargin.set = function(t) {
                this.uvMatrix.clampMargin = t, this.uvMatrix.update(!0)
            }, i.tileScale.get = function() {
                return this.tileTransform.scale
            }, i.tileScale.set = function(t) {
                this.tileTransform.scale.copyFrom(t)
            }, i.tilePosition.get = function() {
                return this.tileTransform.position
            }, i.tilePosition.set = function(t) {
                this.tileTransform.position.copyFrom(t)
            }, e.prototype._onTextureUpdate = function() {
                this.uvMatrix && (this.uvMatrix.texture = this._texture), this._cachedTint = 16777215
            }, e.prototype._render = function(t) {
                var e = this._texture;
                e && e.valid && (this.tileTransform.updateLocalTransform(), this.uvMatrix.update(), t.batch.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this))
            }, e.prototype._calculateBounds = function() {
                var t = this._width * -this._anchor._x,
                    e = this._height * -this._anchor._y,
                    i = this._width * (1 - this._anchor._x),
                    r = this._height * (1 - this._anchor._y);
                this._bounds.addFrame(this.transform, t, e, i, r)
            }, e.prototype.getLocalBounds = function(e) {
                return 0 === this.children.length ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new Ce), e = this._localBoundsRect), this._bounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e)
            }, e.prototype.containsPoint = function(t) {
                this.worldTransform.applyInverse(t, is);
                var e = this._width,
                    i = this._height,
                    r = -e * this.anchor._x;
                if (is.x >= r && is.x < r + e) {
                    var n = -i * this.anchor._y;
                    if (is.y >= n && is.y < n + i) return !0
                }
                return !1
            }, e.prototype.destroy = function(e) {
                t.prototype.destroy.call(this, e), this.tileTransform = null, this.uvMatrix = null
            }, e.from = function(t, i, r) {
                return new e(_i.from(t), i, r)
            }, e.fromFrame = function(t, i, r) {
                var n = Jt[t];
                if (!n) throw new Error('The frameId "' + t + '" does not exist in the texture cache ' + this);
                return new e(n, i, r)
            }, e.fromImage = function(t, i, r, n) {
                return n && "object" != typeof n && (n = {
                    scaleMode: arguments[4],
                    resourceOptions: {
                        crossorigin: arguments[3]
                    }
                }), new e(_i.from(t, n), i, r)
            }, i.width.get = function() {
                return this._width
            }, i.width.set = function(t) {
                this._width = t
            }, i.height.get = function() {
                return this._height
            }, i.height.set = function(t) {
                this._height = t
            }, Object.defineProperties(e.prototype, i), e
        }(qn),
        ns = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n",
        os = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = mod(vTextureCoord - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 sample = texture2D(uSampler, coord);\n    gl_FragColor = sample * uColor;\n}\n",
        ss = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = sample * uColor;\n}\n",
        as = new ge,
        hs = function(t) {
            function e(e) {
                t.call(this, e);
                var i = {
                    globals: this.renderer.globalUniforms
                };
                this.shader = gr.from(ns, os, i), this.simpleShader = gr.from(ns, ss, i), this.quad = new Di
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.render = function(t) {
                var e = this.renderer,
                    i = this.quad,
                    r = i.vertices;
                r[0] = r[6] = t._width * -t.anchor.x, r[1] = r[3] = t._height * -t.anchor.y, r[2] = r[4] = t._width * (1 - t.anchor.x), r[5] = r[7] = t._height * (1 - t.anchor.y), t.uvRespectAnchor && ((r = i.uvs)[0] = r[6] = -t.anchor.x, r[1] = r[3] = -t.anchor.y, r[2] = r[4] = 1 - t.anchor.x, r[5] = r[7] = 1 - t.anchor.y), i.invalidate();
                var n = t._texture,
                    o = n.baseTexture,
                    s = t.tileTransform.localTransform,
                    a = t.uvMatrix,
                    h = o.isPowerOfTwo && n.frame.width === o.width && n.frame.height === o.height;
                h && (o._glTextures[e.CONTEXT_UID] ? h = o.wrapMode !== St.CLAMP : o.wrapMode === St.CLAMP && (o.wrapMode = St.REPEAT));
                var u = h ? this.simpleShader : this.shader,
                    l = n.width,
                    c = n.height,
                    d = t._width,
                    p = t._height;
                as.set(s.a * l / d, s.b * l / p, s.c * c / d, s.d * c / p, s.tx / d, s.ty / p), as.invert(), h ? as.prepend(a.mapCoord) : (u.uniforms.uMapCoord = a.mapCoord.toArray(!0), u.uniforms.uClampFrame = a.uClampFrame, u.uniforms.uClampOffset = a.uClampOffset), u.uniforms.uTransform = as.toArray(!0), u.uniforms.uColor = Xt(t.tint, t.worldAlpha, u.uniforms.uColor, o.premultiplyAlpha), u.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0), u.uniforms.uSampler = n, e.shader.bind(u), e.geometry.bind(i), e.state.setBlendMode(Nt(t.blendMode, o.premultiplyAlpha)), e.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0)
            }, e
        }(Ni),
        us = function(t) {
            function e(e, i) {
                var r = this;
                void 0 === i && (i = {}), t.call(this), this._textWidth = 0, this._textHeight = 0, this._glyphs = [], this._font = {
                    tint: void 0 !== i.tint ? i.tint : 16777215,
                    align: i.align || "left",
                    name: null,
                    size: 0
                }, this.font = i.font, this._text = e, this._maxWidth = 0, this._maxLineHeight = 0, this._letterSpacing = 0, this._anchor = new le(function() {
                    r.dirty = !0
                }, this, 0, 0), this.dirty = !1, this.roundPixels = g.ROUND_PIXELS, this.updateText()
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                tint: {
                    configurable: !0
                },
                align: {
                    configurable: !0
                },
                anchor: {
                    configurable: !0
                },
                font: {
                    configurable: !0
                },
                text: {
                    configurable: !0
                },
                maxWidth: {
                    configurable: !0
                },
                maxLineHeight: {
                    configurable: !0
                },
                textWidth: {
                    configurable: !0
                },
                letterSpacing: {
                    configurable: !0
                },
                textHeight: {
                    configurable: !0
                }
            };
            return e.prototype.updateText = function() {
                for (var t = e.fonts[this._font.name], i = this._font.size / t.size, r = new ue, n = [], o = [], s = this._text.replace(/(?:\r\n|\r)/g, "\n") || " ", a = s.length, h = this._maxWidth * t.size / this._font.size, u = null, l = 0, c = 0, d = 0, p = -1, f = 0, m = 0, g = 0, v = 0; v < a; v++) {
                    var y = s.charCodeAt(v),
                        _ = s.charAt(v);
                    if (/(?:\s)/.test(_) && (p = v, f = l), "\r" !== _ && "\n" !== _) {
                        var b = t.chars[y];
                        b && (u && b.kerning[u] && (r.x += b.kerning[u]), n.push({
                            texture: b.texture,
                            line: d,
                            charCode: y,
                            position: new ue(r.x + b.xOffset + this._letterSpacing / 2, r.y + b.yOffset)
                        }), r.x += b.xAdvance + this._letterSpacing, l = r.x, g = Math.max(g, b.yOffset + b.texture.height), u = y, -1 !== p && h > 0 && r.x > h && (Vt(n, 1 + p - ++m, 1 + v - p), v = p, p = -1, o.push(f), c = Math.max(c, f), d++, r.x = 0, r.y += t.lineHeight, u = null))
                    } else o.push(l), c = Math.max(c, l), ++d, ++m, r.x = 0, r.y += t.lineHeight, u = null
                }
                var x = s.charAt(s.length - 1);
                "\r" !== x && "\n" !== x && (/(?:\s)/.test(x) && (l = f), o.push(l), c = Math.max(c, l));
                for (var w = [], T = 0; T <= d; T++) {
                    var S = 0;
                    "right" === this._font.align ? S = c - o[T] : "center" === this._font.align && (S = (c - o[T]) / 2), w.push(S)
                }
                for (var E = n.length, P = this.tint, I = 0; I < E; I++) {
                    var C = this._glyphs[I];
                    C ? C.texture = n[I].texture : ((C = new qn(n[I].texture)).roundPixels = this.roundPixels, this._glyphs.push(C)), C.position.x = (n[I].position.x + w[n[I].line]) * i, C.position.y = n[I].position.y * i, C.scale.x = C.scale.y = i, C.tint = P, C.parent || this.addChild(C)
                }
                for (var A = E; A < this._glyphs.length; ++A) this.removeChild(this._glyphs[A]);
                if (this._textWidth = c * i, this._textHeight = (r.y + t.lineHeight) * i, 0 !== this.anchor.x || 0 !== this.anchor.y)
                    for (var M = 0; M < E; M++) this._glyphs[M].x -= this._textWidth * this.anchor.x, this._glyphs[M].y -= this._textHeight * this.anchor.y;
                this._maxLineHeight = g * i
            }, e.prototype.updateTransform = function() {
                this.validate(), this.containerUpdateTransform()
            }, e.prototype.getLocalBounds = function() {
                return this.validate(), t.prototype.getLocalBounds.call(this)
            }, e.prototype.validate = function() {
                this.dirty && (this.updateText(), this.dirty = !1)
            }, i.tint.get = function() {
                return this._font.tint
            }, i.tint.set = function(t) {
                this._font.tint = "number" == typeof t && t >= 0 ? t : 16777215, this.dirty = !0
            }, i.align.get = function() {
                return this._font.align
            }, i.align.set = function(t) {
                this._font.align = t || "left", this.dirty = !0
            }, i.anchor.get = function() {
                return this._anchor
            }, i.anchor.set = function(t) {
                "number" == typeof t ? this._anchor.set(t) : this._anchor.copyFrom(t)
            }, i.font.get = function() {
                return this._font
            }, i.font.set = function(t) {
                t && ("string" == typeof t ? (t = t.split(" "), this._font.name = 1 === t.length ? t[0] : t.slice(1).join(" "), this._font.size = t.length >= 2 ? parseInt(t[0], 10) : e.fonts[this._font.name].size) : (this._font.name = t.name, this._font.size = "number" == typeof t.size ? t.size : parseInt(t.size, 10)), this.dirty = !0)
            }, i.text.get = function() {
                return this._text
            }, i.text.set = function(t) {
                t = String(null == t ? "" : t), this._text !== t && (this._text = t, this.dirty = !0)
            }, i.maxWidth.get = function() {
                return this._maxWidth
            }, i.maxWidth.set = function(t) {
                this._maxWidth !== t && (this._maxWidth = t, this.dirty = !0)
            }, i.maxLineHeight.get = function() {
                return this.validate(), this._maxLineHeight
            }, i.textWidth.get = function() {
                return this.validate(), this._textWidth
            }, i.letterSpacing.get = function() {
                return this._letterSpacing
            }, i.letterSpacing.set = function(t) {
                this._letterSpacing !== t && (this._letterSpacing = t, this.dirty = !0)
            }, i.textHeight.get = function() {
                return this.validate(), this._textHeight
            }, e.registerFont = function(t, i) {
                var r = {},
                    n = t.getElementsByTagName("info")[0],
                    o = t.getElementsByTagName("common")[0],
                    s = t.getElementsByTagName("page"),
                    a = oe(s[0].getAttribute("file"), g.RESOLUTION),
                    h = {};
                r.font = n.getAttribute("face"), r.size = parseInt(n.getAttribute("size"), 10), r.lineHeight = parseInt(o.getAttribute("lineHeight"), 10) / a, r.chars = {}, i instanceof _i && (i = [i]);
                for (var u = 0; u < s.length; u++) {
                    var l = s[u].getAttribute("id"),
                        c = s[u].getAttribute("file");
                    h[l] = i instanceof Array ? i[u] : i[c]
                }
                for (var d = t.getElementsByTagName("char"), p = 0; p < d.length; p++) {
                    var f = d[p],
                        m = parseInt(f.getAttribute("id"), 10),
                        v = f.getAttribute("page") || 0,
                        y = new Ce(parseInt(f.getAttribute("x"), 10) / a + h[v].frame.x / a, parseInt(f.getAttribute("y"), 10) / a + h[v].frame.y / a, parseInt(f.getAttribute("width"), 10) / a, parseInt(f.getAttribute("height"), 10) / a);
                    r.chars[m] = {
                        xOffset: parseInt(f.getAttribute("xoffset"), 10) / a,
                        yOffset: parseInt(f.getAttribute("yoffset"), 10) / a,
                        xAdvance: parseInt(f.getAttribute("xadvance"), 10) / a,
                        kerning: {},
                        texture: new _i(h[v].baseTexture, y),
                        page: v
                    }
                }
                for (var _ = t.getElementsByTagName("kerning"), b = 0; b < _.length; b++) {
                    var x = _[b],
                        w = parseInt(x.getAttribute("first"), 10) / a,
                        T = parseInt(x.getAttribute("second"), 10) / a,
                        S = parseInt(x.getAttribute("amount"), 10) / a;
                    r.chars[T] && (r.chars[T].kerning[w] = S)
                }
                return e.fonts[r.font] = r, r
            }, Object.defineProperties(e.prototype, i), e
        }(Ne);
    us.fonts = {};
    var ls = function() {};
    ls.parse = function(t, e) {
        t.bitmapFont = us.registerFont(t.data, e)
    }, ls.add = function() {
        Yo.setExtensionXhrType("fnt", Yo.XHR_RESPONSE_TYPE.DOCUMENT)
    }, ls.dirname = function(t) {
        var e = t.replace(/\/$/, "").replace(/\/[^\/]*$/, "");
        return e === t ? "." : "" === e ? "/" : e
    }, ls.use = function(t, e) {
        if (t.data && t.type === Yo.TYPE.XML)
            if (0 !== t.data.getElementsByTagName("page").length && 0 !== t.data.getElementsByTagName("info").length && null !== t.data.getElementsByTagName("info")[0].getAttribute("face")) {
                var i = t.isDataUrl ? "" : ls.dirname(t.url);
                t.isDataUrl && ("." === i && (i = ""), this.baseUrl && i && "/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (i += "/")), (i = i.replace(this.baseUrl, "")) && "/" !== i.charAt(i.length - 1) && (i += "/");
                for (var r = t.data.getElementsByTagName("page"), n = {}, o = function(i) {
                        n[i.metadata.pageFile] = i.texture, Object.keys(n).length === r.length && (ls.parse(t, n), e())
                    }, s = 0; s < r.length; ++s) {
                    var a = r[s].getAttribute("file"),
                        h = i + a,
                        u = !1;
                    for (var l in this.resources) {
                        var c = this.resources[l];
                        if (c.url === h) {
                            c.metadata.pageFile = a, c.texture ? o(c) : c.onAfterMiddleware.add(o), u = !0;
                            break
                        }
                    }
                    if (!u) {
                        var d = {
                            crossOrigin: t.crossOrigin,
                            loadType: Yo.LOAD_TYPE.IMAGE,
                            metadata: Object.assign({
                                pageFile: a
                            }, t.metadata.imageMetadata),
                            parentResource: t
                        };
                        this.add(h, d, o)
                    }
                }
            } else e();
        else e()
    };
    var cs = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n",
        ds = function(t) {
            function e(e) {
                void 0 === e && (e = 1), t.call(this, Kr, cs, {
                    uAlpha: 1
                }), this.alpha = e
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                alpha: {
                    configurable: !0
                }
            };
            return i.alpha.get = function() {
                return this.uniforms.uAlpha
            }, i.alpha.set = function(t) {
                this.uniforms.uAlpha = t
            }, Object.defineProperties(e.prototype, i), e
        }(br),
        ps = "\n    attribute vec2 aVertexPosition;\n\n    uniform mat3 projectionMatrix;\n\n    uniform float strength;\n\n    varying vec2 vBlurTexCoords[%size%];\n\n    uniform vec4 inputSize;\n    uniform vec4 outputFrame;\n    \n    vec4 filterVertexPosition( void )\n    {\n        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n    \n        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n    }\n    \n    vec2 filterTextureCoord( void )\n    {\n        return aVertexPosition * (outputFrame.zw * inputSize.zw);\n    }\n\n    void main(void)\n    {\n        gl_Position = filterVertexPosition();\n\n        vec2 textureCoord = filterTextureCoord();\n        %blur%\n    }",
        fs = {
            5: [.153388, .221461, .250301],
            7: [.071303, .131514, .189879, .214607],
            9: [.028532, .067234, .124009, .179044, .20236],
            11: [.0093, .028002, .065984, .121703, .175713, .198596],
            13: [.002406, .009255, .027867, .065666, .121117, .174868, .197641],
            15: [489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448]
        },
        ms = ["varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "    gl_FragColor = vec4(0.0);", "    %blur%", "}"].join("\n"),
        gs = function(t) {
            function e(e, i, r, n, o) {
                var s = function(t, e) {
                        var i, r = Math.ceil(t / 2),
                            n = ps,
                            o = "";
                        i = e ? "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";
                        for (var s = 0; s < t; s++) {
                            var a = i.replace("%index%", s);
                            o += a = a.replace("%sampleIndex%", s - (r - 1) + ".0"), o += "\n"
                        }
                        return (n = n.replace("%blur%", o)).replace("%size%", t)
                    }(o = o || 5, e),
                    a = function(t) {
                        for (var e, i = fs[t], r = i.length, n = ms, o = "", s = 0; s < t; s++) {
                            var a = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace("%index%", s);
                            e = s, s >= r && (e = t - s - 1), o += a = a.replace("%value%", i[e]), o += "\n"
                        }
                        return (n = n.replace("%blur%", o)).replace("%size%", t)
                    }(o);
                t.call(this, s, a), this.horizontal = e, this.resolution = n || g.RESOLUTION, this._quality = 0, this.quality = r || 4, this.blur = i || 8
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                blur: {
                    configurable: !0
                },
                quality: {
                    configurable: !0
                }
            };
            return e.prototype.apply = function(t, e, i, r) {
                if (i ? this.horizontal ? this.uniforms.strength = 1 / i.width * (i.width / e.width) : this.uniforms.strength = 1 / i.height * (i.height / e.height) : this.horizontal ? this.uniforms.strength = 1 / t.renderer.width * (t.renderer.width / e.width) : this.uniforms.strength = 1 / t.renderer.height * (t.renderer.height / e.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes) t.applyFilter(this, e, i, r);
                else {
                    var n = t.getFilterTexture(),
                        o = t.renderer,
                        s = e,
                        a = n;
                    this.state.blend = !1, t.applyFilter(this, s, a, !1);
                    for (var h = 1; h < this.passes - 1; h++) {
                        o.renderTexture.bind(s, s.filterFrame), this.uniforms.uSampler = a;
                        var u = a;
                        a = s, s = u, o.shader.bind(this), o.geometry.draw(5)
                    }
                    this.state.blend = !0, t.applyFilter(this, a, i, r), t.returnFilterTexture(n)
                }
            }, i.blur.get = function() {
                return this.strength
            }, i.blur.set = function(t) {
                this.padding = 1 + 2 * Math.abs(t), this.strength = t
            }, i.quality.get = function() {
                return this._quality
            }, i.quality.set = function(t) {
                this._quality = t, this.passes = t
            }, Object.defineProperties(e.prototype, i), e
        }(br),
        vs = function(t) {
            function e(e, i, r, n) {
                t.call(this), this.blurXFilter = new gs(!0, e, i, r, n), this.blurYFilter = new gs(!1, e, i, r, n), this.resolution = r || g.RESOLUTION, this.quality = i || 4, this.blur = e || 8, this.repeatEdgePixels = !1
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                blur: {
                    configurable: !0
                },
                quality: {
                    configurable: !0
                },
                blurX: {
                    configurable: !0
                },
                blurY: {
                    configurable: !0
                },
                blendMode: {
                    configurable: !0
                },
                repeatEdgePixels: {
                    configurable: !0
                }
            };
            return e.prototype.apply = function(t, e, i, r) {
                var n = Math.abs(this.blurXFilter.strength),
                    o = Math.abs(this.blurYFilter.strength);
                if (n && o) {
                    var s = t.getFilterTexture();
                    this.blurXFilter.apply(t, e, s, !0), this.blurYFilter.apply(t, s, i, r), t.returnFilterTexture(s)
                } else o ? this.blurYFilter.apply(t, e, i, r) : this.blurXFilter.apply(t, e, i, r)
            }, e.prototype.updatePadding = function() {
                this._repeatEdgePixels ? this.padding = 0 : this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
            }, i.blur.get = function() {
                return this.blurXFilter.blur
            }, i.blur.set = function(t) {
                this.blurXFilter.blur = this.blurYFilter.blur = t, this.updatePadding()
            }, i.quality.get = function() {
                return this.blurXFilter.quality
            }, i.quality.set = function(t) {
                this.blurXFilter.quality = this.blurYFilter.quality = t
            }, i.blurX.get = function() {
                return this.blurXFilter.blur
            }, i.blurX.set = function(t) {
                this.blurXFilter.blur = t, this.updatePadding()
            }, i.blurY.get = function() {
                return this.blurYFilter.blur
            }, i.blurY.set = function(t) {
                this.blurYFilter.blur = t, this.updatePadding()
            }, i.blendMode.get = function() {
                return this.blurYFilter.blendMode
            }, i.blendMode.set = function(t) {
                this.blurYFilter.blendMode = t
            }, i.repeatEdgePixels.get = function() {
                return this._repeatEdgePixels
            }, i.repeatEdgePixels.set = function(t) {
                this._repeatEdgePixels = t, this.updatePadding()
            }, Object.defineProperties(e.prototype, i), e
        }(br),
        ys = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n",
        _s = function(t) {
            function e() {
                var e = {
                    m: new Float32Array([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]),
                    uAlpha: 1
                };
                t.call(this, Zr, ys, e), this.alpha = 1
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                matrix: {
                    configurable: !0
                },
                alpha: {
                    configurable: !0
                }
            };
            return e.prototype._loadMatrix = function(t, e) {
                void 0 === e && (e = !1);
                var i = t;
                e && (this._multiply(i, this.uniforms.m, t), i = this._colorMatrix(i)), this.uniforms.m = i
            }, e.prototype._multiply = function(t, e, i) {
                return t[0] = e[0] * i[0] + e[1] * i[5] + e[2] * i[10] + e[3] * i[15], t[1] = e[0] * i[1] + e[1] * i[6] + e[2] * i[11] + e[3] * i[16], t[2] = e[0] * i[2] + e[1] * i[7] + e[2] * i[12] + e[3] * i[17], t[3] = e[0] * i[3] + e[1] * i[8] + e[2] * i[13] + e[3] * i[18], t[4] = e[0] * i[4] + e[1] * i[9] + e[2] * i[14] + e[3] * i[19] + e[4], t[5] = e[5] * i[0] + e[6] * i[5] + e[7] * i[10] + e[8] * i[15], t[6] = e[5] * i[1] + e[6] * i[6] + e[7] * i[11] + e[8] * i[16], t[7] = e[5] * i[2] + e[6] * i[7] + e[7] * i[12] + e[8] * i[17], t[8] = e[5] * i[3] + e[6] * i[8] + e[7] * i[13] + e[8] * i[18], t[9] = e[5] * i[4] + e[6] * i[9] + e[7] * i[14] + e[8] * i[19] + e[9], t[10] = e[10] * i[0] + e[11] * i[5] + e[12] * i[10] + e[13] * i[15], t[11] = e[10] * i[1] + e[11] * i[6] + e[12] * i[11] + e[13] * i[16], t[12] = e[10] * i[2] + e[11] * i[7] + e[12] * i[12] + e[13] * i[17], t[13] = e[10] * i[3] + e[11] * i[8] + e[12] * i[13] + e[13] * i[18], t[14] = e[10] * i[4] + e[11] * i[9] + e[12] * i[14] + e[13] * i[19] + e[14], t[15] = e[15] * i[0] + e[16] * i[5] + e[17] * i[10] + e[18] * i[15], t[16] = e[15] * i[1] + e[16] * i[6] + e[17] * i[11] + e[18] * i[16], t[17] = e[15] * i[2] + e[16] * i[7] + e[17] * i[12] + e[18] * i[17], t[18] = e[15] * i[3] + e[16] * i[8] + e[17] * i[13] + e[18] * i[18], t[19] = e[15] * i[4] + e[16] * i[9] + e[17] * i[14] + e[18] * i[19] + e[19], t
            }, e.prototype._colorMatrix = function(t) {
                var e = new Float32Array(t);
                return e[4] /= 255, e[9] /= 255, e[14] /= 255, e[19] /= 255, e
            }, e.prototype.brightness = function(t, e) {
                var i = [t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(i, e)
            }, e.prototype.greyscale = function(t, e) {
                var i = [t, t, t, 0, 0, t, t, t, 0, 0, t, t, t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(i, e)
            }, e.prototype.blackAndWhite = function(t) {
                this._loadMatrix([.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.hue = function(t, e) {
                t = (t || 0) / 180 * Math.PI;
                var i = Math.cos(t),
                    r = Math.sin(t),
                    n = 1 / 3,
                    o = (0, Math.sqrt)(n),
                    s = [i + (1 - i) * n, n * (1 - i) - o * r, n * (1 - i) + o * r, 0, 0, n * (1 - i) + o * r, i + n * (1 - i), n * (1 - i) - o * r, 0, 0, n * (1 - i) - o * r, n * (1 - i) + o * r, i + n * (1 - i), 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(s, e)
            }, e.prototype.contrast = function(t, e) {
                var i = (t || 0) + 1,
                    r = -.5 * (i - 1),
                    n = [i, 0, 0, 0, r, 0, i, 0, 0, r, 0, 0, i, 0, r, 0, 0, 0, 1, 0];
                this._loadMatrix(n, e)
            }, e.prototype.saturate = function(t, e) {
                void 0 === t && (t = 0);
                var i = 2 * t / 3 + 1,
                    r = -.5 * (i - 1),
                    n = [i, r, r, 0, 0, r, i, r, 0, 0, r, r, i, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(n, e)
            }, e.prototype.desaturate = function() {
                this.saturate(-1)
            }, e.prototype.negative = function(t) {
                this._loadMatrix([-1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.sepia = function(t) {
                this._loadMatrix([.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.technicolor = function(t) {
                this._loadMatrix([1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0], t)
            }, e.prototype.polaroid = function(t) {
                this._loadMatrix([1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.toBGR = function(t) {
                this._loadMatrix([0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.kodachrome = function(t) {
                this._loadMatrix([1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0], t)
            }, e.prototype.browni = function(t) {
                this._loadMatrix([.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0], t)
            }, e.prototype.vintage = function(t) {
                this._loadMatrix([.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0], t)
            }, e.prototype.colorTone = function(t, e, i, r, n) {
                var o = ((i = i || 16770432) >> 16 & 255) / 255,
                    s = (i >> 8 & 255) / 255,
                    a = (255 & i) / 255,
                    h = ((r = r || 3375104) >> 16 & 255) / 255,
                    u = (r >> 8 & 255) / 255,
                    l = (255 & r) / 255,
                    c = [.3, .59, .11, 0, 0, o, s, a, t = t || .2, 0, h, u, l, e = e || .15, 0, o - h, s - u, a - l, 0, 0];
                this._loadMatrix(c, n)
            }, e.prototype.night = function(t, e) {
                var i = [-2 * (t = t || .1), -t, 0, 0, 0, -t, 0, t, 0, 0, 0, t, 2 * t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(i, e)
            }, e.prototype.predator = function(t, e) {
                var i = [11.224130630493164 * t, -4.794486999511719 * t, -2.8746118545532227 * t, 0 * t, .40342438220977783 * t, -3.6330697536468506 * t, 9.193157196044922 * t, -2.951810836791992 * t, 0 * t, -1.316135048866272 * t, -3.2184197902679443 * t, -4.2375030517578125 * t, 7.476448059082031 * t, 0 * t, .8044459223747253 * t, 0, 0, 0, 1, 0];
                this._loadMatrix(i, e)
            }, e.prototype.lsd = function(t) {
                this._loadMatrix([2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0], t)
            }, e.prototype.reset = function() {
                this._loadMatrix([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], !1)
            }, i.matrix.get = function() {
                return this.uniforms.m
            }, i.matrix.set = function(t) {
                this.uniforms.m = t
            }, i.alpha.get = function() {
                return this.uniforms.uAlpha
            }, i.alpha.set = function(t) {
                this.uniforms.uAlpha = t
            }, Object.defineProperties(e.prototype, i), e
        }(br);
    _s.prototype.grayscale = _s.prototype.greyscale;
    var bs = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n\tgl_Position = filterVertexPosition();\n\tvTextureCoord = filterTextureCoord();\n\tvFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;\n}\n",
        xs = "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\nuniform mat2 rotation;\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform highp vec4 inputSize;\nuniform vec4 inputClamp;\n\nvoid main(void)\n{\n  vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n  map -= 0.5;\n  map.xy = scale * inputSize.zw * (rotation * map.xy);\n\n  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));\n}\n",
        ws = function(t) {
            function e(e, i) {
                var r = new ge;
                e.renderable = !1, t.call(this, bs, xs, {
                    mapSampler: e._texture,
                    filterMatrix: r,
                    scale: {
                        x: 1,
                        y: 1
                    },
                    rotation: new Float32Array([1, 0, 0, 1])
                }), this.maskSprite = e, this.maskMatrix = r, null == i && (i = 20), this.scale = new ue(i, i)
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                map: {
                    configurable: !0
                }
            };
            return e.prototype.apply = function(t, e, i, r) {
                this.uniforms.filterMatrix = t.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
                var n = this.maskSprite.transform.worldTransform,
                    o = Math.sqrt(n.a * n.a + n.b * n.b),
                    s = Math.sqrt(n.c * n.c + n.d * n.d);
                0 !== o && 0 !== s && (this.uniforms.rotation[0] = n.a / o, this.uniforms.rotation[1] = n.b / o, this.uniforms.rotation[2] = n.c / s, this.uniforms.rotation[3] = n.d / s), t.applyFilter(this, e, i, r)
            }, i.map.get = function() {
                return this.uniforms.mapSampler
            }, i.map.set = function(t) {
                this.uniforms.mapSampler = t
            }, Object.defineProperties(e.prototype, i), e
        }(br),
        Ts = "\nattribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\n\nuniform vec4 inputPixel;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvoid texcoords(vec2 fragCoord, vec2 inverseVP,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = filterVertexPosition();\n\n   vFragCoord = aVertexPosition * outputFrame.zw;\n\n   texcoords(vFragCoord, inputPixel.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n",
        Ss = 'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vFragCoord;\nuniform sampler2D uSampler;\nuniform highp vec4 inputPixel;\n\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n\n --\n\n From:\n https://github.com/mitsuhiko/webgl-meincraft\n\n Copyright (c) 2011 by Armin Ronacher.\n\n Some rights reserved.\n\n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n\n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n\n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n\n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec4 color;\n\n      color = fxaa(uSampler, vFragCoord, inputPixel.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n',
        Es = function(t) {
            function e() {
                t.call(this, Ts, Ss)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
        }(br),
        Ps = "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n",
        Is = function(t) {
            function e(e, i) {
                void 0 === e && (e = .5), void 0 === i && (i = Math.random()), t.call(this, Zr, Ps, {
                    uNoise: 0,
                    uSeed: 0
                }), this.noise = e, this.seed = i
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                noise: {
                    configurable: !0
                },
                seed: {
                    configurable: !0
                }
            };
            return i.noise.get = function() {
                return this.uniforms.uNoise
            }, i.noise.set = function(t) {
                this.uniforms.uNoise = t
            }, i.seed.get = function() {
                return this.uniforms.uSeed
            }, i.seed.set = function(t) {
                this.uniforms.uSeed = t
            }, Object.defineProperties(e.prototype, i), e
        }(br),
        Cs = new ge;
    Be.prototype._cacheAsBitmap = !1, Be.prototype._cacheData = !1;
    Object.defineProperties(Be.prototype, {
        cacheAsBitmap: {
            get: function() {
                return this._cacheAsBitmap
            },
            set: function(t) {
                var e;
                this._cacheAsBitmap !== t && (this._cacheAsBitmap = t, t ? (this._cacheData || (this._cacheData = new function() {
                    this.textureCacheId = null, this.originalRender = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalHitTest = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.sprite = null
                }), (e = this._cacheData).originalRender = this.render, e.originalRenderCanvas = this.renderCanvas, e.originalUpdateTransform = this.updateTransform, e.originalCalculateBounds = this.calculateBounds, e.originalGetLocalBounds = this.getLocalBounds, e.originalDestroy = this.destroy, e.originalContainsPoint = this.containsPoint, e.originalMask = this._mask, e.originalFilterArea = this.filterArea, this.render = this._renderCached, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : ((e = this._cacheData).sprite && this._destroyCachedDisplayObject(), this.render = e.originalRender, this.renderCanvas = e.originalRenderCanvas, this.calculateBounds = e.originalCalculateBounds, this.getLocalBounds = e.originalGetLocalBounds, this.destroy = e.originalDestroy, this.updateTransform = e.originalUpdateTransform, this.containsPoint = e.originalContainsPoint, this._mask = e.originalMask, this.filterArea = e.originalFilterArea))
            }
        }
    }), Be.prototype._renderCached = function(t) {
        !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._render(t))
    }, Be.prototype._initCachedDisplayObject = function(t) {
        if (!this._cacheData || !this._cacheData.sprite) {
            var e = this.alpha;
            this.alpha = 1, t.batch.flush();
            var i = this.getLocalBounds().clone();
            if (this.filters) {
                var r = this.filters[0].padding;
                i.pad(r)
            }
            i.ceil(g.RESOLUTION);
            var n = t.renderTexture.current,
                o = t.renderTexture.sourceFrame,
                s = t.projection.transform,
                a = xi.create(i.width, i.height),
                h = "cacheAsBitmap_" + zt();
            this._cacheData.textureCacheId = h, ni.addToCache(a.baseTexture, h), _i.addToCache(a, h);
            var u = Cs;
            u.tx = -i.x, u.ty = -i.y, this.transform.worldTransform.identity(), this.render = this._cacheData.originalRender, t.render(this, a, !0, u, !0), t.projection.transform = s, t.renderTexture.bind(n, o), this.render = this._renderCached, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null;
            var l = new qn(a);
            l.transform.worldTransform = this.transform.worldTransform, l.anchor.x = -i.x / i.width, l.anchor.y = -i.y / i.height, l.alpha = e, l._bounds = this._bounds, this._cacheData.sprite = l, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = l.containsPoint.bind(l)
        }
    }, Be.prototype._renderCachedCanvas = function(t) {
        !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderCanvas(t))
    }, Be.prototype._initCachedDisplayObjectCanvas = function(t) {
        if (!this._cacheData || !this._cacheData.sprite) {
            var e = this.getLocalBounds(),
                i = this.alpha;
            this.alpha = 1;
            var r = t.context;
            e.ceil(g.RESOLUTION);
            var n = xi.create(e.width, e.height),
                o = "cacheAsBitmap_" + zt();
            this._cacheData.textureCacheId = o, ni.addToCache(n.baseTexture, o), _i.addToCache(n, o);
            var s = Cs;
            this.transform.localTransform.copyTo(s), s.invert(), s.tx -= e.x, s.ty -= e.y, this.renderCanvas = this._cacheData.originalRenderCanvas, t.render(this, n, !0, s, !1), t.context = r, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._mask = null, this.filterArea = null;
            var a = new qn(n);
            a.transform.worldTransform = this.transform.worldTransform, a.anchor.x = -e.x / e.width, a.anchor.y = -e.y / e.height, a.alpha = i, a._bounds = this._bounds, this._cacheData.sprite = a, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = a.containsPoint.bind(a)
        }
    }, Be.prototype._calculateCachedBounds = function() {
        this._bounds.clear(), this._cacheData.sprite.transform._worldID = this.transform._worldID, this._cacheData.sprite._calculateBounds(), this._lastBoundsID = this._boundsID
    }, Be.prototype._getCachedLocalBounds = function() {
        return this._cacheData.sprite.getLocalBounds()
    }, Be.prototype._destroyCachedDisplayObject = function() {
        this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, ni.removeFromCache(this._cacheData.textureCacheId), _i.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null
    }, Be.prototype._cacheAsBitmapDestroy = function(t) {
        this.cacheAsBitmap = !1, this.destroy(t)
    }, Be.prototype.name = null, Ne.prototype.getChildByName = function(t) {
        for (var e = 0; e < this.children.length; e++)
            if (this.children[e].name === t) return this.children[e];
        return null
    }, Be.prototype.getGlobalPosition = function(t, e) {
        return void 0 === t && (t = new ue), void 0 === e && (e = !1), this.parent ? this.parent.toGlobal(this.position, t, e) : (t.x = this.position.x, t.y = this.position.y), t
    };
    var As = function(t, e) {
        this.uvBuffer = t, this.uvMatrix = e, this.data = null, this._bufferUpdateId = -1, this._textureUpdateId = -1, this._updateID = 0
    };
    As.prototype.update = function(t) {
        if (t || this._bufferUpdateId !== this.uvBuffer._updateID || this._textureUpdateId !== this.uvMatrix._updateID) {
            this._bufferUpdateId = this.uvBuffer._updateID, this._textureUpdateId = this.uvMatrix._updateID;
            var e = this.uvBuffer.data;
            this.data && this.data.length === e.length || (this.data = new Float32Array(e.length)), this.uvMatrix.multiplyUvs(e, this.data), this._updateID++
        }
    };
    var Ms = new ue,
        Os = new De,
        Rs = function(t) {
            function e(e, i, r, n) {
                void 0 === n && (n = _t.TRIANGLES), t.call(this), this.geometry = e, e.refCount++, this.shader = i, this.state = r || yr.for2d(), this.drawMode = n, this.start = 0, this.size = 0, this.uvs = null, this.indices = null, this.vertexData = new Float32Array(1), this.vertexDirty = 0, this._transformID = -1, this.tint = 16777215, this.blendMode = yt.NORMAL, this._roundPixels = g.ROUND_PIXELS, this.batchUvs = null
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                uvBuffer: {
                    configurable: !0
                },
                verticesBuffer: {
                    configurable: !0
                },
                material: {
                    configurable: !0
                },
                blendMode: {
                    configurable: !0
                },
                roundPixels: {
                    configurable: !0
                },
                tint: {
                    configurable: !0
                },
                texture: {
                    configurable: !0
                }
            };
            return i.uvBuffer.get = function() {
                return this.geometry.buffers[1]
            }, i.verticesBuffer.get = function() {
                return this.geometry.buffers[0]
            }, i.material.set = function(t) {
                this.shader = t
            }, i.material.get = function() {
                return this.shader
            }, i.blendMode.set = function(t) {
                this.state.blendMode = t
            }, i.blendMode.get = function() {
                return this.state.blendMode
            }, i.roundPixels.set = function(t) {
                this._roundPixels !== t && (this._transformID = -1), this._roundPixels = t
            }, i.roundPixels.get = function() {
                return this._roundPixels
            }, i.tint.get = function() {
                return this.shader.tint
            }, i.tint.set = function(t) {
                this.shader.tint = t
            }, i.texture.get = function() {
                return this.shader.texture
            }, i.texture.set = function(t) {
                this.shader.texture = t
            }, e.prototype._render = function(t) {
                var i = this.geometry.buffers[0].data;
                this.shader.batchable && this.drawMode === _t.TRIANGLES && i.length < 2 * e.BATCHABLE_SIZE ? this._renderToBatch(t) : this._renderDefault(t)
            }, e.prototype._renderDefault = function(t) {
                var e = this.shader;
                e.alpha = this.worldAlpha, e.update && e.update(), t.batch.flush(), e.program.uniformData.translationMatrix && (e.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0)), t.shader.bind(e), t.state.set(this.state), t.geometry.bind(this.geometry, e), t.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount)
            }, e.prototype._renderToBatch = function(t) {
                var e = this.geometry;
                this.shader.uvMatrix && (this.shader.uvMatrix.update(), this.calculateUvs()), this.calculateVertices(), this.indices = e.indexBuffer.data, this._tintRGB = this.shader._tintRGB, this._texture = this.shader.texture;
                var i = this.material.pluginName;
                t.batch.setObjectRenderer(t.plugins[i]), t.plugins[i].render(this)
            }, e.prototype.calculateVertices = function() {
                var t = this.geometry,
                    e = t.buffers[0].data;
                if (t.vertexDirtyId !== this.vertexDirty || this._transformID !== this.transform._worldID) {
                    this._transformID = this.transform._worldID, this.vertexData.length !== e.length && (this.vertexData = new Float32Array(e.length));
                    for (var i = this.transform.worldTransform, r = i.a, n = i.b, o = i.c, s = i.d, a = i.tx, h = i.ty, u = this.vertexData, l = 0; l < u.length / 2; l++) {
                        var c = e[2 * l],
                            d = e[2 * l + 1];
                        u[2 * l] = r * c + o * d + a, u[2 * l + 1] = n * c + s * d + h
                    }
                    if (this._roundPixels)
                        for (var p = 0; p < u.length; p++) u[p] = Math.round(u[p]);
                    this.vertexDirty = t.vertexDirtyId
                }
            }, e.prototype.calculateUvs = function() {
                var t = this.geometry.buffers[1];
                this.shader.uvMatrix.isSimple ? this.uvs = t.data : (this.batchUvs || (this.batchUvs = new As(t, this.shader.uvMatrix)), this.batchUvs.update(), this.uvs = this.batchUvs.data)
            }, e.prototype._calculateBounds = function() {
                this.calculateVertices(), this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length)
            }, e.prototype.containsPoint = function(t) {
                if (!this.getBounds().contains(t.x, t.y)) return !1;
                this.worldTransform.applyInverse(t, Ms);
                for (var e = this.geometry.getBuffer("aVertexPosition").data, i = Os.points, r = this.geometry.getIndex().data, n = r.length, o = 4 === this.drawMode ? 3 : 1, s = 0; s + 2 < n; s += o) {
                    var a = 2 * r[s],
                        h = 2 * r[s + 1],
                        u = 2 * r[s + 2];
                    if (i[0] = e[a], i[1] = e[a + 1], i[2] = e[h], i[3] = e[h + 1], i[4] = e[u], i[5] = e[u + 1], Os.contains(Ms.x, Ms.y)) return !0
                }
                return !1
            }, e.prototype.destroy = function(e) {
                t.prototype.destroy.call(this, e), this.geometry.refCount--, 0 === this.geometry.refCount && this.geometry.dispose(), this.geometry = null, this.shader = null, this.state = null, this.uvs = null, this.indices = null, this.vertexData = null
            }, Object.defineProperties(e.prototype, i), e
        }(Ne);
    Rs.BATCHABLE_SIZE = 100;
    var Ds = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTextureMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\n}\n",
        Fs = "varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n",
        Ls = function(t) {
            function e(e, i) {
                var r = {
                    uSampler: e,
                    alpha: 1,
                    uTextureMatrix: ge.IDENTITY,
                    uColor: new Float32Array([1, 1, 1, 1])
                };
                (i = Object.assign({
                    tint: 16777215,
                    alpha: 1,
                    pluginName: "batch"
                }, i)).uniforms && Object.assign(r, i.uniforms), t.call(this, i.program || fr.from(Ds, Fs), r), this._colorDirty = !1, this.uvMatrix = new Sr(e), this.batchable = void 0 === i.program, this.pluginName = i.pluginName, this.tint = i.tint, this.alpha = i.alpha
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                texture: {
                    configurable: !0
                },
                alpha: {
                    configurable: !0
                },
                tint: {
                    configurable: !0
                }
            };
            return i.texture.get = function() {
                return this.uniforms.uSampler
            }, i.texture.set = function(t) {
                this.uniforms.uSampler !== t && (this.uniforms.uSampler = t, this.uvMatrix.texture = t)
            }, i.alpha.set = function(t) {
                t !== this._alpha && (this._alpha = t, this._colorDirty = !0)
            }, i.alpha.get = function() {
                return this._alpha
            }, i.tint.set = function(t) {
                t !== this._tint && (this._tint = t, this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16), this._colorDirty = !0)
            }, i.tint.get = function() {
                return this._tint
            }, e.prototype.update = function() {
                if (this._colorDirty) {
                    this._colorDirty = !1;
                    var t = this.texture.baseTexture;
                    Xt(this._tint, this._alpha, this.uniforms.uColor, t.premultiplyAlpha)
                }
                this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord)
            }, Object.defineProperties(e.prototype, i), e
        }(gr),
        Bs = function(t) {
            function e(e, i, r) {
                t.call(this);
                var n = new Ei(e),
                    o = new Ei(i, !0),
                    s = new Ei(r, !0, !0);
                this.addAttribute("aVertexPosition", n, 2, !1, wt.FLOAT).addAttribute("aTextureCoord", o, 2, !1, wt.FLOAT).addIndex(s), this._updateId = -1
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                vertexDirtyId: {
                    configurable: !0
                }
            };
            return i.vertexDirtyId.get = function() {
                return this.buffers[0]._updateID
            }, Object.defineProperties(e.prototype, i), e
        }(Oi),
        ks = function(t) {
            function e(e, i, r, n) {
                void 0 === e && (e = 100), void 0 === i && (i = 100), void 0 === r && (r = 10), void 0 === n && (n = 10), t.call(this), this.segWidth = r, this.segHeight = n, this.width = e, this.height = i, this.build()
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.build = function() {
                for (var t = this.segWidth * this.segHeight, e = [], i = [], r = [], n = this.segWidth - 1, o = this.segHeight - 1, s = this.width / n, a = this.height / o, h = 0; h < t; h++) {
                    var u = h % this.segWidth,
                        l = h / this.segWidth | 0;
                    e.push(u * s, l * a), i.push(u / n, l / o)
                }
                for (var c = n * o, d = 0; d < c; d++) {
                    var p = d % n,
                        f = d / n | 0,
                        m = f * this.segWidth + p,
                        g = f * this.segWidth + p + 1,
                        v = (f + 1) * this.segWidth + p,
                        y = (f + 1) * this.segWidth + p + 1;
                    r.push(m, g, v, g, y, v)
                }
                this.buffers[0].data = new Float32Array(e), this.buffers[1].data = new Float32Array(i), this.indexBuffer.data = new Uint16Array(r), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update()
            }, e
        }(Bs),
        Ns = function(t) {
            function e(e, i) {
                void 0 === e && (e = 200), t.call(this, new Float32Array(4 * i.length), new Float32Array(4 * i.length), new Uint16Array(6 * (i.length - 1))), this.points = i, this.width = e, this.build()
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.build = function() {
                var t = this.points;
                if (t) {
                    var e = this.getBuffer("aVertexPosition"),
                        i = this.getBuffer("aTextureCoord"),
                        r = this.getIndex();
                    if (!(t.length < 1)) {
                        e.data.length / 4 !== t.length && (e.data = new Float32Array(4 * t.length), i.data = new Float32Array(4 * t.length), r.data = new Uint16Array(6 * (t.length - 1)));
                        var n = i.data,
                            o = r.data;
                        n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1;
                        for (var s = t.length, a = 0; a < s; a++) {
                            var h = 4 * a,
                                u = a / (s - 1);
                            n[h] = u, n[h + 1] = 0, n[h + 2] = u, n[h + 3] = 1
                        }
                        for (var l = 0, c = 0; c < s - 1; c++) {
                            var d = 2 * c;
                            o[l++] = d, o[l++] = d + 1, o[l++] = d + 2, o[l++] = d + 2, o[l++] = d + 1, o[l++] = d + 3
                        }
                        i.update(), r.update(), this.updateVertices()
                    }
                }
            }, e.prototype.updateVertices = function() {
                var t = this.points;
                if (!(t.length < 1)) {
                    for (var e, i = t[0], r = 0, n = 0, o = this.buffers[0].data, s = t.length, a = 0; a < s; a++) {
                        var h = t[a],
                            u = 4 * a;
                        n = -((e = a < t.length - 1 ? t[a + 1] : h).x - i.x), r = e.y - i.y;
                        var l = Math.sqrt(r * r + n * n),
                            c = this.width / 2;
                        r /= l, n /= l, r *= c, n *= c, o[u] = h.x + r, o[u + 1] = h.y + n, o[u + 2] = h.x - r, o[u + 3] = h.y - n, i = h
                    }
                    this.buffers[0].update()
                }
            }, e.prototype.update = function() {
                this.updateVertices()
            }, e
        }(Bs),
        Us = function(t) {
            function e(e, i) {
                var r = new Ns(e.height, i),
                    n = new Ls(e);
                t.call(this, r, n), this.autoUpdate = !0
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._render = function(e) {
                (this.autoUpdate || this.geometry.width !== this.shader.texture.height) && (this.geometry.width = this.shader.texture.height, this.geometry.update()), t.prototype._render.call(this, e)
            }, e
        }(Rs),
        js = function(t) {
            function e(e, i, r) {
                var n = new ks(e.width, e.height, i, r),
                    o = new Ls(_i.WHITE);
                t.call(this, n, o), this.texture = e
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                texture: {
                    configurable: !0
                }
            };
            return e.prototype.textureUpdated = function() {
                this._textureID = this.shader.texture._updateID, this.geometry.width = this.shader.texture.width, this.geometry.height = this.shader.texture.height, this.geometry.build()
            }, i.texture.set = function(t) {
                this.shader.texture !== t && (this.shader.texture = t, this._textureID = -1, t.baseTexture.valid ? this.textureUpdated() : t.once("update", this.textureUpdated, this))
            }, i.texture.get = function() {
                return this.shader.texture
            }, e.prototype._render = function(e) {
                this._textureID !== this.shader.texture._updateID && this.textureUpdated(), t.prototype._render.call(this, e)
            }, Object.defineProperties(e.prototype, i), e
        }(Rs),
        Xs = function(t) {
            function e(e, i, r, n, o) {
                void 0 === e && (e = _i.EMPTY);
                var s = new Bs(i, r, n);
                s.getBuffer("aVertexPosition").static = !1;
                var a = new Ls(e);
                t.call(this, s, a, null, o), this.autoUpdate = !0
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                vertices: {
                    configurable: !0
                }
            };
            return i.vertices.get = function() {
                return this.geometry.getBuffer("aVertexPosition").data
            }, i.vertices.set = function(t) {
                this.geometry.getBuffer("aVertexPosition").data = t
            }, e.prototype._render = function(e) {
                this.autoUpdate && this.geometry.getBuffer("aVertexPosition").update(), t.prototype._render.call(this, e)
            }, Object.defineProperties(e.prototype, i), e
        }(Rs),
        Gs = 10,
        Vs = function(t) {
            function e(e, i, r, n, o) {
                t.call(this, _i.WHITE, 4, 4), this._origWidth = e.orig.width, this._origHeight = e.orig.height, this._width = this._origWidth, this._height = this._origHeight, this._leftWidth = void 0 !== i ? i : Gs, this._rightWidth = void 0 !== n ? n : Gs, this._topHeight = void 0 !== r ? r : Gs, this._bottomHeight = void 0 !== o ? o : Gs, this.texture = e
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                vertices: {
                    configurable: !0
                },
                width: {
                    configurable: !0
                },
                height: {
                    configurable: !0
                },
                leftWidth: {
                    configurable: !0
                },
                rightWidth: {
                    configurable: !0
                },
                topHeight: {
                    configurable: !0
                },
                bottomHeight: {
                    configurable: !0
                }
            };
            return e.prototype.textureUpdated = function() {
                this._textureID = this.shader.texture._updateID, this._refresh()
            }, i.vertices.get = function() {
                return this.geometry.getBuffer("aVertexPosition").data
            }, i.vertices.set = function(t) {
                this.geometry.getBuffer("aVertexPosition").data = t
            }, e.prototype.updateHorizontalVertices = function() {
                var t = this.vertices,
                    e = this._topHeight + this._bottomHeight,
                    i = this._height > e ? 1 : this._height / e;
                t[9] = t[11] = t[13] = t[15] = this._topHeight * i, t[17] = t[19] = t[21] = t[23] = this._height - this._bottomHeight * i, t[25] = t[27] = t[29] = t[31] = this._height
            }, e.prototype.updateVerticalVertices = function() {
                var t = this.vertices,
                    e = this._leftWidth + this._rightWidth,
                    i = this._width > e ? 1 : this._width / e;
                t[2] = t[10] = t[18] = t[26] = this._leftWidth * i, t[4] = t[12] = t[20] = t[28] = this._width - this._rightWidth * i, t[6] = t[14] = t[22] = t[30] = this._width
            }, i.width.get = function() {
                return this._width
            }, i.width.set = function(t) {
                this._width = t, this._refresh()
            }, i.height.get = function() {
                return this._height
            }, i.height.set = function(t) {
                this._height = t, this._refresh()
            }, i.leftWidth.get = function() {
                return this._leftWidth
            }, i.leftWidth.set = function(t) {
                this._leftWidth = t, this._refresh()
            }, i.rightWidth.get = function() {
                return this._rightWidth
            }, i.rightWidth.set = function(t) {
                this._rightWidth = t, this._refresh()
            }, i.topHeight.get = function() {
                return this._topHeight
            }, i.topHeight.set = function(t) {
                this._topHeight = t, this._refresh()
            }, i.bottomHeight.get = function() {
                return this._bottomHeight
            }, i.bottomHeight.set = function(t) {
                this._bottomHeight = t, this._refresh()
            }, e.prototype._refresh = function() {
                var t = this.texture,
                    e = this.geometry.buffers[1].data;
                this._origWidth = t.orig.width, this._origHeight = t.orig.height;
                var i = 1 / this._origWidth,
                    r = 1 / this._origHeight;
                e[0] = e[8] = e[16] = e[24] = 0, e[1] = e[3] = e[5] = e[7] = 0, e[6] = e[14] = e[22] = e[30] = 1, e[25] = e[27] = e[29] = e[31] = 1, e[2] = e[10] = e[18] = e[26] = i * this._leftWidth, e[4] = e[12] = e[20] = e[28] = 1 - i * this._rightWidth, e[9] = e[11] = e[13] = e[15] = r * this._topHeight, e[17] = e[19] = e[21] = e[23] = 1 - r * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.geometry.buffers[0].update(), this.geometry.buffers[1].update()
            }, Object.defineProperties(e.prototype, i), e
        }(js),
        Hs = function(t) {
            function e(e, i) {
                t.call(this, e[0] instanceof _i ? e[0] : e[0].texture), this._textures = null, this._durations = null, this.textures = e, this._autoUpdate = !1 !== i, this.animationSpeed = 1, this.loop = !0, this.updateAnchor = !1, this.onComplete = null, this.onFrameChange = null, this.onLoop = null, this._currentTime = 0, this.playing = !1
            }
            t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
            var i = {
                totalFrames: {
                    configurable: !0
                },
                textures: {
                    configurable: !0
                },
                currentFrame: {
                    configurable: !0
                }
            };
            return e.prototype.stop = function() {
                this.playing && (this.playing = !1, this._autoUpdate && We.shared.remove(this.update, this))
            }, e.prototype.play = function() {
                this.playing || (this.playing = !0, this._autoUpdate && We.shared.add(this.update, this, He.HIGH))
            }, e.prototype.gotoAndStop = function(t) {
                this.stop();
                var e = this.currentFrame;
                this._currentTime = t, e !== this.currentFrame && this.updateTexture()
            }, e.prototype.gotoAndPlay = function(t) {
                var e = this.currentFrame;
                this._currentTime = t, e !== this.currentFrame && this.updateTexture(), this.play()
            }, e.prototype.update = function(t) {
                var e = this.animationSpeed * t,
                    i = this.currentFrame;
                if (null !== this._durations) {
                    var r = this._currentTime % 1 * this._durations[this.currentFrame];
                    for (r += e / 60 * 1e3; r < 0;) this._currentTime--, r += this._durations[this.currentFrame];
                    var n = Math.sign(this.animationSpeed * t);
                    for (this._currentTime = Math.floor(this._currentTime); r >= this._durations[this.currentFrame];) r -= this._durations[this.currentFrame] * n, this._currentTime += n;
                    this._currentTime += r / this._durations[this.currentFrame]
                } else this._currentTime += e;
                this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : i !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < i ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > i && this.onLoop()), this.updateTexture())
            }, e.prototype.updateTexture = function() {
                this._texture = this._textures[this.currentFrame], this._textureID = -1, this._textureTrimmedID = -1, this._cachedTint = 16777215, this.uvs = this._texture._uvs.uvsFloat32, this.updateAnchor && this._anchor.copyFrom(this._texture.defaultAnchor), this.onFrameChange && this.onFrameChange(this.currentFrame)
            }, e.prototype.destroy = function(e) {
                this.stop(), t.prototype.destroy.call(this, e), this.onComplete = null, this.onFrameChange = null, this.onLoop = null
            }, e.fromFrames = function(t) {
                for (var i = [], r = 0; r < t.length; ++r) i.push(_i.from(t[r]));
                return new e(i)
            }, e.fromImages = function(t) {
                for (var i = [], r = 0; r < t.length; ++r) i.push(_i.from(t[r]));
                return new e(i)
            }, i.totalFrames.get = function() {
                return this._textures.length
            }, i.textures.get = function() {
                return this._textures
            }, i.textures.set = function(t) {
                if (t[0] instanceof _i) this._textures = t, this._durations = null;
                else {
                    this._textures = [], this._durations = [];
                    for (var e = 0; e < t.length; e++) this._textures.push(t[e].texture), this._durations.push(t[e].time)
                }
                this.gotoAndStop(0), this.updateTexture()
            }, i.currentFrame.get = function() {
                var t = Math.floor(this._currentTime) % this._textures.length;
                return t < 0 && (t += this._textures.length), t
            }, Object.defineProperties(e.prototype, i), e
        }(qn),
        zs = "5.0.0";
    Yr.registerPlugin("accessibility", je), Yr.registerPlugin("extract", cn), Yr.registerPlugin("interaction", xn), Yr.registerPlugin("particle", Qo), Yr.registerPlugin("prepare", vo), Yr.registerPlugin("batch", un), Yr.registerPlugin("tilingSprite", hs), zo.registerPlugin(ls), zo.registerPlugin(es), To.registerPlugin(Ke), To.registerPlugin(Wo);
    var Ws = {
            AlphaFilter: ds,
            BlurFilter: vs,
            BlurFilterPass: gs,
            ColorMatrixFilter: _s,
            DisplacementFilter: ws,
            FXAAFilter: Es,
            NoiseFilter: Is
        },
        Ys = function(t) {
            this.renderer = t
        };

    function qs(t) {
        var e = document.createElement("canvas");
        e.width = 6, e.height = 1;
        var i = e.getContext("2d");
        return i.fillStyle = t, i.fillRect(0, 0, 6, 1), e
    }

    function Ks() {
        if ("undefined" == typeof document) return !1;
        var t = qs("#ff00ff"),
            e = qs("#ffff00"),
            i = document.createElement("canvas");
        i.width = 6, i.height = 1;
        var r = i.getContext("2d");
        r.globalCompositeOperation = "multiply", r.drawImage(t, 0, 0), r.drawImage(e, 2, 0);
        var n = r.getImageData(2, 0, 1, 1);
        if (!n) return !1;
        var o = n.data;
        return 255 === o[0] && 0 === o[1] && 0 === o[2]
    }
    Ys.prototype.pushMask = function(t) {
        var e = this.renderer;
        e.context.save();
        var i = t.alpha,
            r = t.transform.worldTransform,
            n = e.resolution;
        e.context.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n, r.ty * n), t._texture || (this.renderGraphicsShape(t), e.context.clip()), t.worldAlpha = i
    }, Ys.prototype.renderGraphicsShape = function(t) {
        var e = this.renderer.context,
            i = t.geometry.graphicsData,
            r = i.length;
        if (0 !== r) {
            e.beginPath();
            for (var n = 0; n < r; n++) {
                var o = i[n],
                    s = o.shape;
                if (o.type === me.POLY) {
                    var a = s.points;
                    e.moveTo(a[0], a[1]);
                    for (var h = 1; h < a.length / 2; h++) e.lineTo(a[2 * h], a[2 * h + 1]);
                    a[0] === a[a.length - 2] && a[1] === a[a.length - 1] && e.closePath()
                } else if (o.type === me.RECT) e.rect(s.x, s.y, s.width, s.height), e.closePath();
                else if (o.type === me.CIRC) e.arc(s.x, s.y, s.radius, 0, 2 * Math.PI), e.closePath();
                else if (o.type === me.ELIP) {
                    var u = 2 * s.width,
                        l = 2 * s.height,
                        c = s.x - u / 2,
                        d = s.y - l / 2,
                        p = u / 2 * .5522848,
                        f = l / 2 * .5522848,
                        m = c + u,
                        g = d + l,
                        v = c + u / 2,
                        y = d + l / 2;
                    e.moveTo(c, y), e.bezierCurveTo(c, y - f, v - p, d, v, d), e.bezierCurveTo(v + p, d, m, y - f, m, y), e.bezierCurveTo(m, y + f, v + p, g, v, g), e.bezierCurveTo(v - p, g, c, y + f, c, y), e.closePath()
                } else if (o.type === me.RREC) {
                    var _ = s.x,
                        b = s.y,
                        x = s.width,
                        w = s.height,
                        T = s.radius,
                        S = Math.min(x, w) / 2 | 0;
                    T = T > S ? S : T, e.moveTo(_, b + T), e.lineTo(_, b + w - T), e.quadraticCurveTo(_, b + w, _ + T, b + w), e.lineTo(_ + x - T, b + w), e.quadraticCurveTo(_ + x, b + w, _ + x, b + w - T), e.lineTo(_ + x, b + T), e.quadraticCurveTo(_ + x, b, _ + x - T, b), e.lineTo(_ + T, b), e.quadraticCurveTo(_, b, _, b + T), e.closePath()
                }
            }
        }
    }, Ys.prototype.popMask = function(t) {
        t.context.restore(), t.invalidateBlendMode()
    }, Ys.prototype.destroy = function() {};
    var Zs = function(t) {
            function e(i, r, n) {
                var o;
                t.call(this, "Canvas", i, r, n), this.type = vt.CANVAS, this.rootContext = this.view.getContext("2d", {
                    alpha: this.transparent
                }), this.context = this.rootContext, this.refresh = !0, this.maskManager = new Ys(this), this.smoothProperty = "imageSmoothingEnabled", this.rootContext.imageSmoothingEnabled || (this.rootContext.webkitImageSmoothingEnabled ? this.smoothProperty = "webkitImageSmoothingEnabled" : this.rootContext.mozImageSmoothingEnabled ? this.smoothProperty = "mozImageSmoothingEnabled" : this.rootContext.oImageSmoothingEnabled ? this.smoothProperty = "oImageSmoothingEnabled" : this.rootContext.msImageSmoothingEnabled && (this.smoothProperty = "msImageSmoothingEnabled")), this.initPlugins(e.__plugins), this.blendModes = (void 0 === o && (o = []), Ks() ? (o[yt.NORMAL] = "source-over", o[yt.ADD] = "lighter", o[yt.MULTIPLY] = "multiply", o[yt.SCREEN] = "screen", o[yt.OVERLAY] = "overlay", o[yt.DARKEN] = "darken", o[yt.LIGHTEN] = "lighten", o[yt.COLOR_DODGE] = "color-dodge", o[yt.COLOR_BURN] = "color-burn", o[yt.HARD_LIGHT] = "hard-light", o[yt.SOFT_LIGHT] = "soft-light", o[yt.DIFFERENCE] = "difference", o[yt.EXCLUSION] = "exclusion", o[yt.HUE] = "hue", o[yt.SATURATION] = "saturate", o[yt.COLOR] = "color", o[yt.LUMINOSITY] = "luminosity") : (o[yt.NORMAL] = "source-over", o[yt.ADD] = "lighter", o[yt.MULTIPLY] = "source-over", o[yt.SCREEN] = "source-over", o[yt.OVERLAY] = "source-over", o[yt.DARKEN] = "source-over", o[yt.LIGHTEN] = "source-over", o[yt.COLOR_DODGE] = "source-over", o[yt.COLOR_BURN] = "source-over", o[yt.HARD_LIGHT] = "source-over", o[yt.SOFT_LIGHT] = "source-over", o[yt.DIFFERENCE] = "source-over", o[yt.EXCLUSION] = "source-over", o[yt.HUE] = "source-over", o[yt.SATURATION] = "source-over", o[yt.COLOR] = "source-over", o[yt.LUMINOSITY] = "source-over"), o[yt.NORMAL_NPM] = o[yt.NORMAL], o[yt.ADD_NPM] = o[yt.ADD], o[yt.SCREEN_NPM] = o[yt.SCREEN], o[yt.SRC_IN] = "source-in", o[yt.SRC_OUT] = "source-out", o[yt.SRC_ATOP] = "source-atop", o[yt.DST_OVER] = "destination-over", o[yt.DST_IN] = "destination-in", o[yt.DST_OUT] = "destination-out", o[yt.DST_ATOP] = "destination-atop", o[yt.SUBTRACT] = "source-over", o), this._activeBlendMode = null, this._outerBlend = !1, this.renderingToScreen = !1, Ot("Canvas"), this.resize(this.options.width, this.options.height)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.render = function(t, e, i, r, n) {
                if (this.view) {
                    this.renderingToScreen = !e, this.emit("prerender");
                    var o = this.resolution;
                    e ? ((e = e.baseTexture || e)._canvasRenderTarget || (e._canvasRenderTarget = new te(e.width, e.height, e.resolution), e.resource = new ci.CanvasResource(e._canvasRenderTarget.canvas), e.valid = !0), this.context = e._canvasRenderTarget.context, this.resolution = e._canvasRenderTarget.resolution) : this.context = this.rootContext;
                    var s = this.context;
                    if (e || (this._lastObjectRendered = t), !n) {
                        var a = t.parent,
                            h = this._tempDisplayObjectParent.transform.worldTransform;
                        r ? (r.copyTo(h), this._tempDisplayObjectParent.transform._worldID = -1) : h.identity(), t.parent = this._tempDisplayObjectParent, t.updateTransform(), t.parent = a
                    }
                    s.save(), s.setTransform(1, 0, 0, 1, 0, 0), s.globalAlpha = 1, this._activeBlendMode = yt.NORMAL, this._outerBlend = !1, s.globalCompositeOperation = this.blendModes[yt.NORMAL], (void 0 !== i ? i : this.clearBeforeRender) && this.renderingToScreen && (this.transparent ? s.clearRect(0, 0, this.width, this.height) : (s.fillStyle = this._backgroundColorString, s.fillRect(0, 0, this.width, this.height)));
                    var u = this.context;
                    this.context = s, t.renderCanvas(this), this.context = u, s.restore(), this.resolution = o, this.emit("postrender")
                }
            }, e.prototype.clear = function(t) {
                var e = this.context;
                t = t || this._backgroundColorString, !this.transparent && t ? (e.fillStyle = t, e.fillRect(0, 0, this.width, this.height)) : e.clearRect(0, 0, this.width, this.height)
            }, e.prototype.setBlendMode = function(t, e) {
                var i = t === yt.SRC_IN || t === yt.SRC_OUT || t === yt.DST_IN || t === yt.DST_ATOP;
                !e && i && (t = yt.NORMAL), this._activeBlendMode !== t && (this._activeBlendMode = t, this._outerBlend = i, this.context.globalCompositeOperation = this.blendModes[t])
            }, e.prototype.destroy = function(e) {
                t.prototype.destroy.call(this, e), this.context = null, this.refresh = !0, this.maskManager.destroy(), this.maskManager = null, this.smoothProperty = null
            }, e.prototype.resize = function(e, i) {
                t.prototype.resize.call(this, e, i), this.smoothProperty && (this.rootContext[this.smoothProperty] = g.SCALE_MODE === Tt.LINEAR)
            }, e.prototype.invalidateBlendMode = function() {
                this._activeBlendMode = this.blendModes.indexOf(this.context.globalCompositeOperation)
            }, e.registerPlugin = function(t, i) {
                e.__plugins = e.__plugins || {}, e.__plugins[t] = i
            }, e
        }(Wr),
        Js = {
            getTintedCanvas: function(t, e) {
                var i = t.texture,
                    r = "#" + ("00000" + (0 | (e = Js.roundColor(e))).toString(16)).substr(-6);
                i.tintCache = i.tintCache || {};
                var n, o = i.tintCache[r];
                if (o) {
                    if (o.tintId === i._updateID) return i.tintCache[r];
                    n = i.tintCache[r]
                } else n = Js.canvas || document.createElement("canvas");
                if (Js.tintMethod(i, e, n), n.tintId = i._updateID, Js.convertTintToImage) {
                    var s = new Image;
                    s.src = n.toDataURL(), i.tintCache[r] = s
                } else i.tintCache[r] = n, Js.canvas = null;
                return n
            },
            tintWithMultiply: function(t, e, i) {
                var r = i.getContext("2d"),
                    n = t._frame.clone(),
                    o = t.baseTexture.resolution;
                n.x *= o, n.y *= o, n.width *= o, n.height *= o, i.width = Math.ceil(n.width), i.height = Math.ceil(n.height), r.save(), r.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6), r.fillRect(0, 0, n.width, n.height), r.globalCompositeOperation = "multiply";
                var s = t.baseTexture.getDrawableSource();
                r.drawImage(s, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height), r.globalCompositeOperation = "destination-atop", r.drawImage(s, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height), r.restore()
            },
            tintWithOverlay: function(t, e, i) {
                var r = i.getContext("2d"),
                    n = t._frame.clone(),
                    o = t.baseTexture.resolution;
                n.x *= o, n.y *= o, n.width *= o, n.height *= o, i.width = Math.ceil(n.width), i.height = Math.ceil(n.height), r.save(), r.globalCompositeOperation = "copy", r.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6), r.fillRect(0, 0, n.width, n.height), r.globalCompositeOperation = "destination-atop", r.drawImage(t.baseTexture.getDrawableSource(), n.x, n.y, n.width, n.height, 0, 0, n.width, n.height), r.restore()
            },
            tintWithPerPixel: function(t, e, i) {
                var r = i.getContext("2d"),
                    n = t._frame.clone(),
                    o = t.baseTexture.resolution;
                n.x *= o, n.y *= o, n.width *= o, n.height *= o, i.width = Math.ceil(n.width), i.height = Math.ceil(n.height), r.save(), r.globalCompositeOperation = "copy", r.drawImage(t.baseTexture.getDrawableSource(), n.x, n.y, n.width, n.height, 0, 0, n.width, n.height), r.restore();
                for (var s = Dt(e), a = s[0], h = s[1], u = s[2], l = r.getImageData(0, 0, n.width, n.height), c = l.data, d = 0; d < c.length; d += 4) c[d + 0] *= a, c[d + 1] *= h, c[d + 2] *= u;
                r.putImageData(l, 0, 0)
            },
            roundColor: function(t) {
                var e = Js.cacheStepsPerColorChannel,
                    i = Dt(t);
                return i[0] = Math.min(255, i[0] / e * e), i[1] = Math.min(255, i[1] / e * e), i[2] = Math.min(255, i[2] / e * e), Bt(i)
            },
            cacheStepsPerColorChannel: 8,
            convertTintToImage: !1,
            canUseMultiply: Ks(),
            tintMethod: function() {}
        };
    Js.tintMethod = Js.canUseMultiply ? Js.tintWithMultiply : Js.tintWithPerPixel;
    var Qs = Yr.create;
    Yr.create = function(t) {
        if (!t || !t.forceCanvas) try {
            return Qs(t)
        } catch (t) {}
        return new Zs(t)
    }, ni.prototype.getDrawableSource = function() {
        var t = this.resource;
        return t ? t.bitmap || t.source : this.source
    };
    var $s = function(t) {
        this.renderer = t
    };
    $s.prototype.render = function(t) {
        var e = this.renderer,
            i = e.context,
            r = t.worldTransform,
            n = e.resolution;
        t.roundPixels ? i.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n | 0, r.ty * n | 0) : i.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n, r.ty * n), e.context.globalAlpha = t.worldAlpha, e.setBlendMode(t.blendMode), t.drawMode !== _t.TRIANGLES ? this._renderTriangleMesh(t) : this._renderTriangles(t)
    }, $s.prototype._renderTriangleMesh = function(t) {
        for (var e = t.geometry.buffers[0].data.length, i = 0; i < e - 2; i++) {
            var r = 2 * i;
            this._renderDrawTriangle(t, r, r + 2, r + 4)
        }
    }, $s.prototype._renderTriangles = function(t) {
        for (var e = t.geometry.getIndex().data, i = e.length, r = 0; r < i; r += 3) {
            var n = 2 * e[r],
                o = 2 * e[r + 1],
                s = 2 * e[r + 2];
            this._renderDrawTriangle(t, n, o, s)
        }
    }, $s.prototype._renderDrawTriangle = function(t, e, i, r) {
        var n = this.renderer.context,
            o = t.geometry.buffers[0].data,
            s = t.uvs,
            a = t.texture;
        if (a.valid) {
            var h = a.baseTexture,
                u = h.getDrawableSource(),
                l = h.width,
                c = h.height,
                d = s[e] * h.width,
                p = s[i] * h.width,
                f = s[r] * h.width,
                m = s[e + 1] * h.height,
                g = s[i + 1] * h.height,
                v = s[r + 1] * h.height,
                y = o[e],
                _ = o[i],
                b = o[r],
                x = o[e + 1],
                w = o[i + 1],
                T = o[r + 1],
                S = t.canvasPadding / this.renderer.resolution;
            if (S > 0) {
                var E = S / Math.abs(t.worldTransform.a),
                    P = S / Math.abs(t.worldTransform.d),
                    I = (y + _ + b) / 3,
                    C = (x + w + T) / 3,
                    A = y - I,
                    M = x - C,
                    O = Math.sqrt(A * A + M * M);
                y = I + A / O * (O + E), x = C + M / O * (O + P), M = w - C, _ = I + (A = _ - I) / (O = Math.sqrt(A * A + M * M)) * (O + E), w = C + M / O * (O + P), M = T - C, b = I + (A = b - I) / (O = Math.sqrt(A * A + M * M)) * (O + E), T = C + M / O * (O + P)
            }
            n.save(), n.beginPath(), n.moveTo(y, x), n.lineTo(_, w), n.lineTo(b, T), n.closePath(), n.clip();
            var R = d * g + m * f + p * v - g * f - m * p - d * v,
                D = y * g + m * b + _ * v - g * b - m * _ - y * v,
                F = d * _ + y * f + p * b - _ * f - y * p - d * b,
                L = d * g * b + m * _ * f + y * p * v - y * g * f - m * p * b - d * _ * v,
                B = x * g + m * T + w * v - g * T - m * w - x * v,
                k = d * w + x * f + p * T - w * f - x * p - d * T,
                N = d * g * T + m * w * f + x * p * v - x * g * f - m * p * T - d * w * v;
            n.transform(D / R, B / R, F / R, k / R, L / R, N / R), n.drawImage(u, 0, 0, l * h.resolution, c * h.resolution, 0, 0, l, c), n.restore(), this.renderer.invalidateBlendMode()
        }
    }, $s.prototype.renderMeshFlat = function(t) {
        var e = this.renderer.context,
            i = t.geometry.getBuffer("aVertexPosition").data,
            r = i.length / 2;
        e.beginPath();
        for (var n = 1; n < r - 2; ++n) {
            var o = 2 * n,
                s = i[o],
                a = i[o + 1],
                h = i[o + 2],
                u = i[o + 3],
                l = i[o + 4],
                c = i[o + 5];
            e.moveTo(s, a), e.lineTo(h, u), e.lineTo(l, c)
        }
        e.fillStyle = "#FF0000", e.fill(), e.closePath()
    }, $s.prototype.destroy = function() {
        this.renderer = null
    }, g.MESH_CANVAS_PADDING = 0, Ls.prototype._renderCanvas = function(t, e) {
        t.plugins.mesh.render(e)
    }, Vs.prototype._cachedTint = 16777215, Vs.prototype._tintedCanvas = null, Vs.prototype._canvasUvs = null, Vs.prototype._renderCanvas = function(t) {
        var e = t.context,
            i = this.worldTransform,
            r = t.resolution,
            n = 16777215 !== this.tint,
            o = this.texture;
        n && this._cachedTint !== this.tint && (this._cachedTint = this.tint, this._tintedCanvas = Js.getTintedCanvas(this, this.tint));
        var s = n ? this._tintedCanvas : o.baseTexture.source;
        this._canvasUvs || (this._canvasUvs = [0, 0, 0, 0, 0, 0, 0, 0]);
        var a = this.vertices,
            h = this._canvasUvs,
            u = n ? 0 : o.frame.x,
            l = n ? 0 : o.frame.y,
            c = u + o.frame.width,
            d = l + o.frame.height;
        h[0] = u, h[1] = u + this._leftWidth, h[2] = c - this._rightWidth, h[3] = c, h[4] = l, h[5] = l + this._topHeight, h[6] = d - this._bottomHeight, h[7] = d;
        for (var p = 0; p < 8; p++) h[p] *= o.baseTexture.resolution;
        e.globalAlpha = this.worldAlpha, t.setBlendMode(this.blendMode), this.roundPixels ? e.setTransform(i.a * r, i.b * r, i.c * r, i.d * r, i.tx * r | 0, i.ty * r | 0) : e.setTransform(i.a * r, i.b * r, i.c * r, i.d * r, i.tx * r, i.ty * r);
        for (var f = 0; f < 3; f++)
            for (var m = 0; m < 3; m++) {
                var g = 2 * m + 8 * f,
                    v = Math.max(1, h[m + 1] - h[m]),
                    y = Math.max(1, h[f + 5] - h[f + 4]),
                    _ = Math.max(1, a[g + 10] - a[g]),
                    b = Math.max(1, a[g + 11] - a[g + 1]);
                e.drawImage(s, h[m], h[f + 4], v, y, a[g], a[g + 1], _, b)
            }
    }, Rs.prototype._renderCanvas = function(t) {
        this.shader.uvMatrix && (this.shader.uvMatrix.update(), this.calculateUvs()), this.material._renderCanvas(t, this)
    }, Rs.prototype._canvasPadding = null, Object.defineProperty(Rs.prototype, "canvasPadding", {
        get: function() {
            return null !== this._canvasPadding ? this._canvasPadding : g.MESH_CANVAS_PADDING
        },
        set: function(t) {
            this._canvasPadding = t
        }
    }), Xs.prototype._renderCanvas = function(t) {
        this.autoUpdate && this.geometry.getBuffer("aVertexPosition").update(), this.shader.update && this.shader.update(), this.calculateUvs(), this.material._renderCanvas(t, this)
    }, Us.prototype._renderCanvas = function(t) {
        (this.autoUpdate || this.geometry.width !== this.shader.texture.height) && (this.geometry.width = this.shader.texture.height, this.geometry.update()), this.shader.update && this.shader.update(), this.calculateUvs(), this.material._renderCanvas(t, this)
    };
    var ta, ea = function(t) {
        this.renderer = t
    };
    ea.prototype.render = function(t) {
        var e = this.renderer,
            i = e.context,
            r = t.worldAlpha,
            n = t.transform.worldTransform,
            o = e.resolution;
        i.setTransform(n.a * o, n.b * o, n.c * o, n.d * o, n.tx * o, n.ty * o), t.canvasTintDirty === t.geometry.dirty && t._prevTint === t.tint || this.updateGraphicsTint(t), e.setBlendMode(t.blendMode);
        for (var s = t.geometry.graphicsData, a = 0; a < s.length; a++) {
            var h = s[a],
                u = h.shape,
                l = h.fillStyle,
                c = h.lineStyle,
                d = h._fillTint,
                p = h._lineTint;
            if (i.lineWidth = c.width, h.type === me.POLY) {
                i.beginPath();
                var f = u.points,
                    m = h.holes,
                    g = void 0,
                    v = void 0,
                    y = void 0,
                    _ = void 0;
                i.moveTo(f[0], f[1]);
                for (var b = 2; b < f.length; b += 2) i.lineTo(f[b], f[b + 1]);
                if (u.closeStroke && i.closePath(), m.length > 0) {
                    g = 0, y = f[0], _ = f[1];
                    for (var x = 2; x + 2 < f.length; x += 2) g += (f[x] - y) * (f[x + 3] - _) - (f[x + 2] - y) * (f[x + 1] - _);
                    for (var w = 0; w < m.length; w++)
                        if (f = m[w].shape.points) {
                            v = 0, y = f[0], _ = f[1];
                            for (var T = 2; T + 2 < f.length; T += 2) v += (f[T] - y) * (f[T + 3] - _) - (f[T + 2] - y) * (f[T + 1] - _);
                            if (v * g < 0) {
                                i.moveTo(f[0], f[1]);
                                for (var S = 2; S < f.length; S += 2) i.lineTo(f[S], f[S + 1])
                            } else {
                                i.moveTo(f[f.length - 2], f[f.length - 1]);
                                for (var E = f.length - 4; E >= 0; E -= 2) i.lineTo(f[E], f[E + 1])
                            }
                            m[w].shape.closeStroke && i.closePath()
                        }
                }
                l.visible && (i.globalAlpha = l.alpha * r, i.fillStyle = "#" + ("00000" + (0 | d).toString(16)).substr(-6), i.fill()), c.visible && (i.globalAlpha = c.alpha * r, i.strokeStyle = "#" + ("00000" + (0 | p).toString(16)).substr(-6), i.stroke())
            } else if (h.type === me.RECT) l.visible && (i.globalAlpha = l.alpha * r, i.fillStyle = "#" + ("00000" + (0 | d).toString(16)).substr(-6), i.fillRect(u.x, u.y, u.width, u.height)), c.visible && (i.globalAlpha = c.alpha * r, i.strokeStyle = "#" + ("00000" + (0 | p).toString(16)).substr(-6), i.strokeRect(u.x, u.y, u.width, u.height));
            else if (h.type === me.CIRC) i.beginPath(), i.arc(u.x, u.y, u.radius, 0, 2 * Math.PI), i.closePath(), l.visible && (i.globalAlpha = l.alpha * r, i.fillStyle = "#" + ("00000" + (0 | d).toString(16)).substr(-6), i.fill()), c.visible && (i.globalAlpha = c.alpha * r, i.strokeStyle = "#" + ("00000" + (0 | p).toString(16)).substr(-6), i.stroke());
            else if (h.type === me.ELIP) {
                var P = 2 * u.width,
                    I = 2 * u.height,
                    C = u.x - P / 2,
                    A = u.y - I / 2;
                i.beginPath();
                var M = P / 2 * .5522848,
                    O = I / 2 * .5522848,
                    R = C + P,
                    D = A + I,
                    F = C + P / 2,
                    L = A + I / 2;
                i.moveTo(C, L), i.bezierCurveTo(C, L - O, F - M, A, F, A), i.bezierCurveTo(F + M, A, R, L - O, R, L), i.bezierCurveTo(R, L + O, F + M, D, F, D), i.bezierCurveTo(F - M, D, C, L + O, C, L), i.closePath(), l.visible && (i.globalAlpha = l.alpha * r, i.fillStyle = "#" + ("00000" + (0 | d).toString(16)).substr(-6), i.fill()), c.visible && (i.globalAlpha = c.alpha * r, i.strokeStyle = "#" + ("00000" + (0 | p).toString(16)).substr(-6), i.stroke())
            } else if (h.type === me.RREC) {
                var B = u.x,
                    k = u.y,
                    N = u.width,
                    U = u.height,
                    j = u.radius,
                    X = Math.min(N, U) / 2 | 0;
                j = j > X ? X : j, i.beginPath(), i.moveTo(B, k + j), i.lineTo(B, k + U - j), i.quadraticCurveTo(B, k + U, B + j, k + U), i.lineTo(B + N - j, k + U), i.quadraticCurveTo(B + N, k + U, B + N, k + U - j), i.lineTo(B + N, k + j), i.quadraticCurveTo(B + N, k, B + N - j, k), i.lineTo(B + j, k), i.quadraticCurveTo(B, k, B, k + j), i.closePath(), l.visible && (i.globalAlpha = l.alpha * r, i.fillStyle = "#" + ("00000" + (0 | d).toString(16)).substr(-6), i.fill()), c.visible && (i.globalAlpha = c.alpha * r, i.strokeStyle = "#" + ("00000" + (0 | p).toString(16)).substr(-6), i.stroke())
            }
        }
    }, ea.prototype.updateGraphicsTint = function(t) {
        t._prevTint = t.tint, t.canvasTintDirty = t.geometry.dirty;
        for (var e = (t.tint >> 16 & 255) / 255, i = (t.tint >> 8 & 255) / 255, r = (255 & t.tint) / 255, n = t.geometry.graphicsData, o = 0; o < n.length; ++o) {
            var s = n[o],
                a = 0 | s.fillStyle.color,
                h = 0 | s.lineStyle.color;
            s._fillTint = ((a >> 16 & 255) / 255 * e * 255 << 16) + ((a >> 8 & 255) / 255 * i * 255 << 8) + (255 & a) / 255 * r * 255, s._lineTint = ((h >> 16 & 255) / 255 * e * 255 << 16) + ((h >> 8 & 255) / 255 * i * 255 << 8) + (255 & h) / 255 * r * 255
        }
    }, ea.prototype.destroy = function() {
        this.renderer = null
    };
    var ia = new ge;
    zn.prototype.generateCanvasTexture = function(t, e) {
        void 0 === e && (e = 1);
        var i = this.getLocalBounds(),
            r = xi.create(i.width, i.height, t, e);
        ta || (ta = new Zs), this.transform.updateLocalTransform(), this.transform.localTransform.copyTo(ia), ia.invert(), ia.tx -= i.x, ia.ty -= i.y, ta.render(this, r, !0, ia);
        var n = _i.from(r.baseTexture._canvasRenderTarget.canvas, {
            scaleMode: t
        });
        return n.baseTexture.resolution = e, n.baseTexture.update(), n
    }, zn.prototype.cachedGraphicsData = [], zn.prototype._renderCanvas = function(t) {
        !0 !== this.isMask && (this.finishPoly(), t.plugins.graphics.render(this))
    };
    var ra = new ge,
        na = function(t) {
            this.renderer = t
        };
    na.prototype.render = function(t) {
        var e = t._texture,
            i = this.renderer,
            r = i.context,
            n = e._frame.width,
            o = e._frame.height,
            s = t.transform.worldTransform,
            a = 0,
            h = 0,
            u = e.baseTexture.getDrawableSource();
        if (!(e.orig.width <= 0 || e.orig.height <= 0) && u && e.valid) {
            i.setBlendMode(t.blendMode, !0), i.context.globalAlpha = t.worldAlpha;
            var l = e.baseTexture.scaleMode === Tt.LINEAR;
            i.smoothProperty && i.context[i.smoothProperty] !== l && (r[i.smoothProperty] = l), e.trim ? (a = e.trim.width / 2 + e.trim.x - t.anchor.x * e.orig.width, h = e.trim.height / 2 + e.trim.y - t.anchor.y * e.orig.height) : (a = (.5 - t.anchor.x) * e.orig.width, h = (.5 - t.anchor.y) * e.orig.height), e.rotate && (s.copyTo(ra), s = ra, Ee.matrixAppendRotationInv(s, e.rotate, a, h), a = 0, h = 0), a -= n / 2, h -= o / 2, t.roundPixels ? (i.context.setTransform(s.a, s.b, s.c, s.d, s.tx * i.resolution | 0, s.ty * i.resolution | 0), a |= 0, h |= 0) : i.context.setTransform(s.a, s.b, s.c, s.d, s.tx * i.resolution, s.ty * i.resolution);
            var c = e.baseTexture.resolution,
                d = i._outerBlend;
            d && (r.save(), r.beginPath(), r.rect(a * i.resolution, h * i.resolution, n * i.resolution, o * i.resolution), r.clip()), 16777215 !== t.tint ? (t._cachedTint === t.tint && t._tintedCanvas.tintId === t._texture._updateID || (t._cachedTint = t.tint, t._tintedCanvas = Js.getTintedCanvas(t, t.tint)), r.drawImage(t._tintedCanvas, 0, 0, Math.floor(n * c), Math.floor(o * c), Math.floor(a * i.resolution), Math.floor(h * i.resolution), Math.floor(n * i.resolution), Math.floor(o * i.resolution))) : r.drawImage(u, e._frame.x * c, e._frame.y * c, Math.floor(n * c), Math.floor(o * c), Math.floor(a * i.resolution), Math.floor(h * i.resolution), Math.floor(n * i.resolution), Math.floor(o * i.resolution)), d && r.restore(), i.setBlendMode(yt.NORMAL)
        }
    }, na.prototype.destroy = function() {
        this.renderer = null
    }, qn.prototype._tintedCanvas = null, qn.prototype._renderCanvas = function(t) {
        t.plugins.sprite.render(this)
    };
    var oa = new Ce,
        sa = function(t) {
            this.renderer = t, t.extract = this
        };
    sa.prototype.image = function(t, e, i) {
        var r = new Image;
        return r.src = this.base64(t, e, i), r
    }, sa.prototype.base64 = function(t, e, i) {
        return this.canvas(t).toDataURL(e, i)
    }, sa.prototype.canvas = function(t) {
        var e, i, r, n, o = this.renderer;
        t && (n = t instanceof xi ? t : o.generateTexture(t)), n ? (e = n.baseTexture._canvasRenderTarget.context, i = n.baseTexture._canvasRenderTarget.resolution, r = n.frame) : (e = o.rootContext, i = o.resolution, (r = oa).width = this.renderer.width, r.height = this.renderer.height);
        var s = Math.floor(r.width * i),
            a = Math.floor(r.height * i),
            h = new te(s, a, 1),
            u = e.getImageData(r.x * i, r.y * i, s, a);
        return h.context.putImageData(u, 0, 0), h.canvas
    }, sa.prototype.pixels = function(t) {
        var e, i, r, n, o = this.renderer;
        return t && (n = t instanceof xi ? t : o.generateTexture(t)), n ? (e = n.baseTexture._canvasRenderTarget.context, i = n.baseTexture._canvasRenderTarget.resolution, r = n.frame) : (e = o.rootContext, (r = oa).width = o.width, r.height = o.height), e.getImageData(0, 0, r.width * i, r.height * i).data
    }, sa.prototype.destroy = function() {
        this.renderer.extract = null, this.renderer = null
    };
    var aa = {
            CanvasExtract: sa
        },
        ha = 16,
        ua = function(t) {
            function e(e) {
                t.call(this, e), this.uploadHookHelper = this, this.canvas = document.createElement("canvas"), this.canvas.width = ha, this.canvas.height = ha, this.ctx = this.canvas.getContext("2d"), this.registerUploadHook(la)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.destroy = function() {
                t.prototype.destroy.call(this), this.ctx = null, this.canvas = null
            }, e
        }(ho);

    function la(t, e) {
        if (e instanceof ni) {
            var i = e.source,
                r = 0 === i.width ? t.canvas.width : Math.min(t.canvas.width, i.width),
                n = 0 === i.height ? t.canvas.height : Math.min(t.canvas.height, i.height);
            return t.ctx.drawImage(i, 0, 0, r, n, 0, 0, t.canvas.width, t.canvas.height), !0
        }
        return !1
    }
    var ca = {
        CanvasPrepare: ua
    };
    return rs.prototype._renderCanvas = function(t) {
        var e = this._texture;
        if (e.baseTexture.valid) {
            var i = t.context,
                r = this.worldTransform,
                n = t.resolution,
                o = e.baseTexture,
                s = o.getDrawableSource(),
                a = o.resolution,
                h = this.tilePosition.x / this.tileScale.x % e._frame.width * a,
                u = this.tilePosition.y / this.tileScale.y % e._frame.height * a;
            if (this._textureID !== this._texture._updateID || this._cachedTint !== this.tint) {
                this._textureID = this._texture._updateID;
                var l = new te(e._frame.width, e._frame.height, a);
                16777215 !== this.tint ? (this._tintedCanvas = Js.getTintedCanvas(this, this.tint), l.context.drawImage(this._tintedCanvas, 0, 0)) : l.context.drawImage(s, -e._frame.x * a, -e._frame.y * a), this._cachedTint = this.tint, this._canvasPattern = l.context.createPattern(l.canvas, "repeat")
            }
            i.globalAlpha = this.worldAlpha, i.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n, r.ty * n), t.setBlendMode(this.blendMode), i.fillStyle = this._canvasPattern, i.scale(this.tileScale.x / a, this.tileScale.y / a);
            var c = this.anchor.x * -this._width,
                d = this.anchor.y * -this._height;
            this.uvRespectAnchor ? (i.translate(h, u), i.fillRect(-h + c, -u + d, this._width / this.tileScale.x * a, this._height / this.tileScale.y * a)) : (i.translate(h + c, u + d), i.fillRect(-h, -u, this._width / this.tileScale.x * a, this._height / this.tileScale.y * a))
        }
    }, qo.prototype.renderCanvas = function(t) {
        if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
            var e = t.context,
                i = this.worldTransform,
                r = !0,
                n = 0,
                o = 0,
                s = 0,
                a = 0;
            t.setBlendMode(this.blendMode), e.globalAlpha = this.worldAlpha, this.displayObjectUpdateTransform();
            for (var h = 0; h < this.children.length; ++h) {
                var u = this.children[h];
                if (u.visible) {
                    var l = u._texture.frame;
                    if (e.globalAlpha = this.worldAlpha * u.alpha, u.rotation % (2 * Math.PI) == 0) r && (e.setTransform(i.a, i.b, i.c, i.d, i.tx * t.resolution, i.ty * t.resolution), r = !1), n = u.anchor.x * (-l.width * u.scale.x) + u.position.x + .5, o = u.anchor.y * (-l.height * u.scale.y) + u.position.y + .5, s = l.width * u.scale.x, a = l.height * u.scale.y;
                    else {
                        r || (r = !0), u.displayObjectUpdateTransform();
                        var c = u.worldTransform;
                        this.roundPixels ? e.setTransform(c.a, c.b, c.c, c.d, c.tx * t.resolution | 0, c.ty * t.resolution | 0) : e.setTransform(c.a, c.b, c.c, c.d, c.tx * t.resolution, c.ty * t.resolution), n = u.anchor.x * -l.width + .5, o = u.anchor.y * -l.height + .5, s = l.width, a = l.height
                    }
                    var d = u._texture.baseTexture.resolution;
                    e.drawImage(u._texture.baseTexture.source, l.x * d, l.y * d, l.width * d, l.height * d, n * t.resolution, o * t.resolution, s * t.resolution, a * t.resolution)
                }
            }
        }
    }, Ne.prototype._renderCanvas = function(t) {}, Ne.prototype.renderCanvas = function(t) {
        if (this.visible && !(this.worldAlpha <= 0) && this.renderable) {
            this._mask && t.maskManager.pushMask(this._mask), this._renderCanvas(t);
            for (var e = 0, i = this.children.length; e < i; ++e) this.children[e].renderCanvas(t);
            this._mask && t.maskManager.popMask(t)
        }
    }, Be.prototype.renderCanvas = function(t) {}, so.prototype._renderCanvas = function(t) {
        this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0), this.updateText(!0), qn.prototype._renderCanvas.call(this, t)
    }, Zs.registerPlugin("accessibility", je), Zs.registerPlugin("extract", sa), Zs.registerPlugin("graphics", ea), Zs.registerPlugin("interaction", xn), Zs.registerPlugin("mesh", $s), Zs.registerPlugin("prepare", ua), Zs.registerPlugin("sprite", na), Object.assign(wo, ca), Object.assign(dn, aa), t.AbstractBatchRenderer = en, t.AbstractRenderer = Wr, t.AnimatedSprite = Hs, t.AppLoaderPlugin = Wo, t.Application = To, t.Attribute = Ti, t.BLEND_MODES = yt, t.BaseRenderTexture = gi, t.BaseTexture = ni, t.BatchDrawCall = Qr, t.BatchGeometry = nn, t.BatchPluginFactory = an, t.BatchRenderer = un, t.BatchShaderGenerator = rn, t.BitmapFontLoader = ls, t.BitmapText = us, t.Bounds = Le, t.Buffer = Ei, t.CanvasGraphicsRenderer = ea, t.CanvasMeshRenderer = $s, t.CanvasRenderer = Zs, t.CanvasSpriteRenderer = na, t.CanvasTinter = Js, t.Circle = Oe, t.Container = Ne, t.CubeTexture = Jr, t.DEG_TO_RAD = fe, t.DRAW_MODES = _t, t.DisplayObject = Be, t.ENV = gt, t.Ellipse = Re, t.FORMATS = bt, t.FillStyle = Sn, t.Filter = br, t.Framebuffer = fi, t.GC_MODES = Pt, t.GLProgram = Rr, t.GLTexture = ni, t.GRAPHICS_CURVES = Tn, t.Geometry = Oi, t.Graphics = zn, t.GraphicsData = En, t.GraphicsGeometry = kn, t.GroupD8 = Ee, t.LineStyle = Nn, t.Loader = zo, t.LoaderResource = Yo, t.MIPMAP_MODES = Et, t.Matrix = ge, t.Mesh = Rs, t.MeshBatchUvs = As, t.MeshGeometry = Bs, t.MeshMaterial = Ls, t.NineSlicePlane = Vs, t.ObjectRenderer = Ni, t.ObservablePoint = le, t.PI_2 = de, t.PRECISION = It, t.ParticleContainer = qo, t.ParticleRenderer = Qo, t.PlaneGeometry = ks, t.Point = ue, t.Polygon = De, t.Program = fr, t.Quad = Ri, t.QuadUv = Di, t.RAD_TO_DEG = pe, t.RENDERER_TYPE = vt, t.Rectangle = Ce, t.RenderTexture = xi, t.RenderTexturePool = wi, t.Renderer = Yr, t.RopeGeometry = Ns, t.RoundedRectangle = Fe, t.Runner = Ge, t.SCALE_MODES = Tt, t.SHAPES = me, t.Shader = gr, t.SimpleMesh = Xs, t.SimplePlane = js, t.SimpleRope = Us, t.Sprite = qn, t.SpriteMaskFilter = Pr, t.Spritesheet = $o, t.SpritesheetLoader = es, t.State = yr, t.System = di, t.TARGETS = xt, t.TEXT_GRADIENT = Kn, t.TYPES = wt, t.Text = so, t.TextMetrics = ro, t.TextStyle = Qn, t.Texture = _i, t.TextureLoader = Ho, t.TextureMatrix = Sr, t.TextureUvs = vi, t.Ticker = We, t.TickerPlugin = Ke, t.TilingSprite = rs, t.TilingSpriteRenderer = hs, t.Transform = Pe, t.UPDATE_PRIORITY = He, t.UniformGroup = Li, t.VERSION = "5.1.5", t.ViewableBuffer = $r, t.WRAP_MODES = St, t.accessibility = Xe, t.autoDetectRenderer = qr, t.checkMaxIfStatementsInShader = lr, t.defaultFilterVertex = Zr, t.defaultVertex = Kr, t.extract = dn, t.filters = Ws, t.interaction = wn, t.isMobile = m, t.prepare = wo, t.resources = ci, t.settings = g, t.systems = Hr, t.useDeprecated = function() {
        var t = this;
        Object.defineProperties(t, {
            SVG_SIZE: {
                get: function() {
                    return ae(zs, "PIXI.utils.SVG_SIZE property has moved to PIXI.resources.SVGResource.SVG_SIZE"), t.SVGResource.SVG_SIZE
                }
            },
            TransformStatic: {
                get: function() {
                    return ae(zs, "PIXI.TransformStatic class has been removed, use PIXI.Transform"), t.Transform
                }
            },
            TransformBase: {
                get: function() {
                    return ae(zs, "PIXI.TransformBase class has been removed, use PIXI.Transform"), t.Transform
                }
            },
            TRANSFORM_MODE: {
                get: function() {
                    return ae(zs, "PIXI.TRANSFORM_MODE property has been removed"), {
                        STATIC: 0,
                        DYNAMIC: 1
                    }
                }
            },
            WebGLRenderer: {
                get: function() {
                    return ae(zs, "PIXI.WebGLRenderer class has moved to PIXI.Renderer"), t.Renderer
                }
            },
            CanvasRenderTarget: {
                get: function() {
                    return ae(zs, "PIXI.CanvasRenderTarget class has moved to PIXI.utils.CanvasRenderTarget"), t.utils.CanvasRenderTarget
                }
            },
            loader: {
                get: function() {
                    return ae(zs, "PIXI.loader instance has moved to PIXI.Loader.shared"), t.Loader.shared
                }
            },
            FilterManager: {
                get: function() {
                    return ae(zs, "PIXI.FilterManager class has moved to PIXI.systems.FilterSystem"), t.systems.FilterSystem
                }
            }
        }), t.extras = {}, Object.defineProperties(t.extras, {
            TilingSprite: {
                get: function() {
                    return ae(zs, "PIXI.extras.TilingSprite class has moved to PIXI.TilingSprite"), t.TilingSprite
                }
            },
            TilingSpriteRenderer: {
                get: function() {
                    return ae(zs, "PIXI.extras.TilingSpriteRenderer class has moved to PIXI.TilingSpriteRenderer"), t.TilingSpriteRenderer
                }
            },
            AnimatedSprite: {
                get: function() {
                    return ae(zs, "PIXI.extras.AnimatedSprite class has moved to PIXI.AnimatedSprite"), t.AnimatedSprite
                }
            },
            BitmapText: {
                get: function() {
                    return ae(zs, "PIXI.extras.BitmapText class has moved to PIXI.BitmapText"), t.BitmapText
                }
            }
        }), Object.defineProperties(t.utils, {
            getSvgSize: {
                get: function() {
                    return ae(zs, "PIXI.utils.getSvgSize function has moved to PIXI.resources.SVGResource.getSize"), t.SVGResource.getSize
                }
            }
        }), t.mesh = {}, Object.defineProperties(t.mesh, {
            Mesh: {
                get: function() {
                    return ae(zs, "PIXI.mesh.Mesh class has moved to PIXI.SimpleMesh"), t.SimpleMesh
                }
            },
            NineSlicePlane: {
                get: function() {
                    return ae(zs, "PIXI.mesh.NineSlicePlane class has moved to PIXI.NineSlicePlane"), t.NineSlicePlane
                }
            },
            Plane: {
                get: function() {
                    return ae(zs, "PIXI.mesh.Plane class has moved to PIXI.SimplePlane"), t.SimplePlane
                }
            },
            Rope: {
                get: function() {
                    return ae(zs, "PIXI.mesh.Rope class has moved to PIXI.SimpleRope"), t.SimpleRope
                }
            },
            RawMesh: {
                get: function() {
                    return ae(zs, "PIXI.mesh.RawMesh class has moved to PIXI.Mesh"), t.Mesh
                }
            },
            CanvasMeshRenderer: {
                get: function() {
                    return ae(zs, "PIXI.mesh.CanvasMeshRenderer class has moved to PIXI.CanvasMeshRenderer"), t.CanvasMeshRenderer
                }
            },
            MeshRenderer: {
                get: function() {
                    return ae(zs, "PIXI.mesh.MeshRenderer class has moved to PIXI.MeshRenderer"), t.MeshRenderer
                }
            }
        }), t.particles = {}, Object.defineProperties(t.particles, {
            ParticleContainer: {
                get: function() {
                    return ae(zs, "PIXI.particles.ParticleContainer class has moved to PIXI.ParticleContainer"), t.ParticleContainer
                }
            },
            ParticleRenderer: {
                get: function() {
                    return ae(zs, "PIXI.particles.ParticleRenderer class has moved to PIXI.ParticleRenderer"), t.ParticleRenderer
                }
            }
        }), t.ticker = {}, Object.defineProperties(t.ticker, {
            Ticker: {
                get: function() {
                    return ae(zs, "PIXI.ticker.Ticker class has moved to PIXI.Ticker"), t.Ticker
                }
            },
            shared: {
                get: function() {
                    return ae(zs, "PIXI.ticker.shared instance has moved to PIXI.Ticker.shared"), t.Ticker.shared
                }
            }
        }), t.loaders = {}, Object.defineProperties(t.loaders, {
            Loader: {
                get: function() {
                    return ae(zs, "PIXI.loaders.Loader class has moved to PIXI.Loader"), t.Loader
                }
            },
            Resource: {
                get: function() {
                    return ae(zs, "PIXI.loaders.Resource class has moved to PIXI.LoaderResource"), t.LoaderResource
                }
            },
            bitmapFontParser: {
                get: function() {
                    return ae(zs, "PIXI.loaders.bitmapFontParser function has moved to PIXI.BitmapFontLoader.use"), t.BitmapFontLoader.use
                }
            },
            parseBitmapFontData: {
                get: function() {
                    return ae(zs, "PIXI.loaders.parseBitmapFontData function has moved to PIXI.BitmapFontLoader.parse"), t.BitmapFontLoader.parse
                }
            },
            spritesheetParser: {
                get: function() {
                    return ae(zs, "PIXI.loaders.spritesheetParser function has moved to PIXI.SpritesheetLoader.use"), t.SpritesheetLoader.use
                }
            },
            getResourcePath: {
                get: function() {
                    return ae(zs, "PIXI.loaders.getResourcePath property has moved to PIXI.SpritesheetLoader.getResourcePath"), t.SpritesheetLoader.getResourcePath
                }
            }
        }), t.Loader.addPixiMiddleware = function(e) {
            return ae(zs, "PIXI.loaders.Loader.addPixiMiddleware function is deprecated, use PIXI.loaders.Loader.registerPlugin"), t.loaders.Loader.registerPlugin({
                use: e()
            })
        }, Object.defineProperty(t.extract, "WebGLExtract", {
            get: function() {
                return ae(zs, "PIXI.extract.WebGLExtract method has moved to PIXI.extract.Extract"), t.extract.Extract
            }
        }), Object.defineProperty(t.prepare, "WebGLPrepare", {
            get: function() {
                return ae(zs, "PIXI.prepare.WebGLPrepare class has moved to PIXI.prepare.Prepare"), t.prepare.Prepare
            }
        }), t.Container.prototype._renderWebGL = function(t) {
            ae(zs, "PIXI.Container._renderWebGL method has moved to PIXI.Container._render"), this._render(t)
        }, t.Container.prototype.renderWebGL = function(t) {
            ae(zs, "PIXI.Container.renderWebGL method has moved to PIXI.Container.render"), this.render(t)
        }, t.DisplayObject.prototype.renderWebGL = function(t) {
            ae(zs, "PIXI.DisplayObject.renderWebGL method has moved to PIXI.DisplayObject.render"), this.render(t)
        }, t.Container.prototype.renderAdvancedWebGL = function(t) {
            ae(zs, "PIXI.Container.renderAdvancedWebGL method has moved to PIXI.Container.renderAdvanced"), this.renderAdvanced(t)
        }, Object.defineProperties(t.settings, {
            TRANSFORM_MODE: {
                get: function() {
                    return ae(zs, "PIXI.settings.TRANSFORM_MODE property has been removed"), 0
                },
                set: function() {
                    ae(zs, "PIXI.settings.TRANSFORM_MODE property has been removed")
                }
            }
        });
        var e = t.BaseTexture;
        e.prototype.loadSource = function(e) {
            ae(zs, "PIXI.BaseTexture.loadSource method has been deprecated");
            var i = t.resources.autoDetectResource(e);
            i.internal = !0, this.setResource(i), this.update()
        }, Object.defineProperties(e.prototype, {
            hasLoaded: {
                get: function() {
                    return ae(zs, "PIXI.BaseTexture.hasLoaded property has been removed, use PIXI.BaseTexture.valid"), this.valid
                }
            },
            imageUrl: {
                get: function() {
                    return ae(zs, "PIXI.BaseTexture.imageUrl property has been removed, use PIXI.BaseTexture.resource.url"), this.resource && this.resource.url
                },
                set: function(t) {
                    ae(zs, "PIXI.BaseTexture.imageUrl property has been removed, use PIXI.BaseTexture.resource.url"), this.resource && (this.resource.url = t)
                }
            },
            source: {
                get: function() {
                    return ae(zs, "PIXI.BaseTexture.source property has been moved, use `PIXI.BaseTexture.resource.source`"), this.resource && this.resource.source
                },
                set: function(t) {
                    ae(zs, "PIXI.BaseTexture.source property has been moved, use `PIXI.BaseTexture.resource.source` if you want to set HTMLCanvasElement. Otherwise, create new BaseTexture."), this.resource && (this.resource.source = t)
                }
            }
        }), e.fromImage = function(t, i, r, n) {
            ae(zs, "PIXI.BaseTexture.fromImage method has been replaced with PIXI.BaseTexture.from");
            var o = {
                scale: n,
                crossorigin: i
            };
            return e.from(t, {
                scaleMode: r,
                resourceOptions: o
            })
        }, e.fromCanvas = function(t, i) {
            return ae(zs, "PIXI.BaseTexture.fromCanvas method has been replaced with PIXI.BaseTexture.from"), e.from(t, {
                scaleMode: i
            })
        }, e.fromSVG = function(t, i, r, n) {
            ae(zs, "PIXI.BaseTexture.fromSVG method has been replaced with PIXI.BaseTexture.from");
            var o = {
                scale: n,
                crossorigin: i
            };
            return e.from(t, {
                scaleMode: r,
                resourceOptions: o
            })
        }, t.Point.prototype.copy = function(t) {
            return ae(zs, "PIXI.Point.copy method has been replaced with PIXI.Point.copyFrom"), this.copyFrom(t)
        }, t.ObservablePoint.prototype.copy = function(t) {
            return ae(zs, "PIXI.ObservablePoint.copy method has been replaced with PIXI.ObservablePoint.copyFrom"), this.copyFrom(t)
        }, t.Rectangle.prototype.copy = function(t) {
            return ae(zs, "PIXI.Rectangle.copy method has been replaced with PIXI.Rectangle.copyFrom"), this.copyFrom(t)
        }, t.Matrix.prototype.copy = function(t) {
            return ae(zs, "PIXI.Matrix.copy method has been replaced with PIXI.Matrix.copyTo"), this.copyTo(t)
        }, t.systems.StateSystem.prototype.setState = function(t) {
            return ae("v5.1.0", "StateSystem.setState has been renamed to StateSystem.set"), this.set(t)
        }, Object.assign(t.systems.FilterSystem.prototype, {
            getRenderTarget: function(t, e) {
                return ae(zs, "PIXI.FilterManager.getRenderTarget method has been replaced with PIXI.systems.FilterSystem#getFilterTexture"), this.getFilterTexture(e)
            },
            returnRenderTarget: function(t) {
                ae(zs, "PIXI.FilterManager.returnRenderTarget method has been replaced with PIXI.systems.FilterSystem.returnFilterTexture"), this.returnFilterTexture(t)
            },
            calculateScreenSpaceMatrix: function(t) {
                ae(zs, "PIXI.systems.FilterSystem.calculateScreenSpaceMatrix method is removed, use `(vTextureCoord * inputSize.xy) + outputFrame.xy` instead");
                var e = t.identity(),
                    i = this.activeState,
                    r = i.sourceFrame,
                    n = i.destinationFrame;
                return e.translate(r.x / n.width, r.y / n.height), e.scale(n.width, n.height), e
            },
            calculateNormalizedScreenSpaceMatrix: function(t) {
                ae(zs, "PIXI.systems.FilterManager.calculateNormalizedScreenSpaceMatrix method is removed, use `((vTextureCoord * inputSize.xy) + outputFrame.xy) / outputFrame.zw` instead.");
                var e = this.activeState,
                    i = e.sourceFrame,
                    r = e.destinationFrame,
                    n = t.identity();
                n.translate(i.x / r.width, i.y / r.height);
                var o = r.width / i.width,
                    s = r.height / i.height;
                return n.scale(o, s), n
            }
        }), Object.defineProperties(t.RenderTexture.prototype, {
            sourceFrame: {
                get: function() {
                    return ae(zs, "PIXI.RenderTexture.sourceFrame property has been removed"), this.filterFrame
                }
            },
            size: {
                get: function() {
                    return ae(zs, "PIXI.RenderTexture.size property has been removed"), this._frame
                }
            }
        });
        var i = function(t) {
                function e(e, i, r, n) {
                    ae(zs, "PIXI.filters.BlurXFilter class is deprecated, use PIXI.filters.BlurFilterPass"), t.call(this, !0, e, i, r, n)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
            }(t.filters.BlurFilterPass),
            r = function(t) {
                function e(e, i, r, n) {
                    ae(zs, "PIXI.filters.BlurYFilter class is deprecated, use PIXI.filters.BlurFilterPass"), t.call(this, !1, e, i, r, n)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
            }(t.filters.BlurFilterPass);
        Object.assign(t.filters, {
            BlurXFilter: i,
            BlurYFilter: r
        });
        var n = t.Sprite,
            o = t.Texture,
            s = t.Graphics;

        function a(t, e, i, r) {
            return ae(zs, "PIXI.Sprite." + t + " method is deprecated, use PIXI.Sprite.from"), n.from(e, {
                resourceOptions: {
                    scale: r,
                    crossorigin: i
                }
            })
        }

        function h(t, e, i, r) {
            return ae(zs, "PIXI.Texture." + t + " method is deprecated, use PIXI.Texture.from"), o.from(e, {
                resourceOptions: {
                    scale: r,
                    crossorigin: i
                }
            })
        }
        s.prototype.generateCanvasTexture || (s.prototype.generateCanvasTexture = function() {
            ae(zs, 'PIXI.Graphics.generateCanvasTexture method is only available in "pixi.js-legacy"')
        }), Object.defineProperty(t.Graphics.prototype, "graphicsData", {
            get: function() {
                return ae(zs, "PIXI.Graphics.graphicsData property is deprecated, use PIXI.Graphics.geometry.graphicsData"), this.geometry.graphicsData
            }
        }), n.fromImage = a.bind(null, "fromImage"), n.fromSVG = a.bind(null, "fromSVG"), n.fromCanvas = a.bind(null, "fromCanvas"), n.fromVideo = a.bind(null, "fromVideo"), n.fromFrame = a.bind(null, "fromFrame"), o.fromImage = h.bind(null, "fromImage"), o.fromSVG = h.bind(null, "fromSVG"), o.fromCanvas = h.bind(null, "fromCanvas"), o.fromVideo = h.bind(null, "fromVideo"), o.fromFrame = h.bind(null, "fromFrame"), Object.defineProperty(t.AbstractRenderer.prototype, "autoResize", {
            get: function() {
                return ae(zs, "PIXI.AbstractRenderer.autoResize property is deprecated, use PIXI.AbstractRenderer.autoDensity"), this.autoDensity
            },
            set: function(t) {
                ae(zs, "PIXI.AbstractRenderer.autoResize property is deprecated, use PIXI.AbstractRenderer.autoDensity"), this.autoDensity = t
            }
        }), Object.defineProperty(t.Renderer.prototype, "textureManager", {
            get: function() {
                return ae(zs, "PIXI.Renderer.textureManager property is deprecated, use PIXI.Renderer.texture"), this.texture
            }
        }), t.utils.mixins = {
            mixin: function() {
                ae(zs, "PIXI.utils.mixins.mixin function is no longer available")
            },
            delayMixin: function() {
                ae(zs, "PIXI.utils.mixins.delayMixin function is no longer available")
            },
            performMixins: function() {
                ae(zs, "PIXI.utils.mixins.performMixins function is no longer available")
            }
        }
    }, t.utils = he, t
}({});
PIXI.useDeprecated(),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).__pixiSound = e()
    }(this, function() {
        "use strict";
        if (void 0 === PIXI) throw "PixiJS required";
        var t = setTimeout;

        function e() {}

        function i(t) {
            if (!(this instanceof i)) throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof t) throw new TypeError("not a function");
            this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], a(t, this)
        }

        function r(t, e) {
            for (; 3 === t._state;) t = t._value;
            0 !== t._state ? (t._handled = !0, i._immediateFn(function() {
                var i = 1 === t._state ? e.onFulfilled : e.onRejected;
                if (null !== i) {
                    var r;
                    try {
                        r = i(t._value)
                    } catch (t) {
                        return void o(e.promise, t)
                    }
                    n(e.promise, r)
                } else(1 === t._state ? n : o)(e.promise, t._value)
            })) : t._deferreds.push(e)
        }

        function n(t, e) {
            try {
                if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
                if (e && ("object" == typeof e || "function" == typeof e)) {
                    var r = e.then;
                    if (e instanceof i) return t._state = 3, t._value = e, void s(t);
                    if ("function" == typeof r) return void a((n = r, h = e, function() {
                        n.apply(h, arguments)
                    }), t)
                }
                t._state = 1, t._value = e, s(t)
            } catch (e) {
                o(t, e)
            }
            var n, h
        }

        function o(t, e) {
            t._state = 2, t._value = e, s(t)
        }

        function s(t) {
            2 === t._state && 0 === t._deferreds.length && i._immediateFn(function() {
                t._handled || i._unhandledRejectionFn(t._value)
            });
            for (var e = 0, n = t._deferreds.length; e < n; e++) r(t, t._deferreds[e]);
            t._deferreds = null
        }

        function a(t, e) {
            var i = !1;
            try {
                t(function(t) {
                    i || (i = !0, n(e, t))
                }, function(t) {
                    i || (i = !0, o(e, t))
                })
            } catch (t) {
                if (i) return;
                i = !0, o(e, t)
            }
        }
        i.prototype.catch = function(t) {
            return this.then(null, t)
        }, i.prototype.then = function(t, i) {
            var n = new this.constructor(e);
            return r(this, new function(t, e, i) {
                this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = i
            }(t, i, n)), n
        }, i.prototype.finally = function(t) {
            var e = this.constructor;
            return this.then(function(i) {
                return e.resolve(t()).then(function() {
                    return i
                })
            }, function(i) {
                return e.resolve(t()).then(function() {
                    return e.reject(i)
                })
            })
        }, i.all = function(t) {
            return new i(function(e, i) {
                if (!t || void 0 === t.length) throw new TypeError("Promise.all accepts an array");
                var r = Array.prototype.slice.call(t);
                if (0 === r.length) return e([]);
                var n = r.length;

                function o(t, s) {
                    try {
                        if (s && ("object" == typeof s || "function" == typeof s)) {
                            var a = s.then;
                            if ("function" == typeof a) return void a.call(s, function(e) {
                                o(t, e)
                            }, i)
                        }
                        r[t] = s, 0 == --n && e(r)
                    } catch (t) {
                        i(t)
                    }
                }
                for (var s = 0; s < r.length; s++) o(s, r[s])
            })
        }, i.resolve = function(t) {
            return t && "object" == typeof t && t.constructor === i ? t : new i(function(e) {
                e(t)
            })
        }, i.reject = function(t) {
            return new i(function(e, i) {
                i(t)
            })
        }, i.race = function(t) {
            return new i(function(e, i) {
                for (var r = 0, n = t.length; r < n; r++) t[r].then(e, i)
            })
        }, i._immediateFn = "function" == typeof setImmediate && function(t) {
            setImmediate(t)
        } || function(e) {
            t(e, 0)
        }, i._unhandledRejectionFn = function(t) {
            "undefined" != typeof console && console
        };
        var h = function() {
                function t(t, e) {
                    this._output = e, this._input = t
                }
                return Object.defineProperty(t.prototype, "destination", {
                    get: function() {
                        return this._input
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "filters", {
                    get: function() {
                        return this._filters
                    },
                    set: function(t) {
                        var e = this;
                        if (this._filters && (this._filters.forEach(function(t) {
                                t && t.disconnect()
                            }), this._filters = null, this._input.connect(this._output)), t && t.length) {
                            this._filters = t.slice(0), this._input.disconnect();
                            var i = null;
                            t.forEach(function(t) {
                                null === i ? e._input.connect(t.destination) : i.connect(t.destination), i = t
                            }), i.connect(this._output)
                        }
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.destroy = function() {
                    this.filters = null, this._input = null, this._output = null
                }, t
            }(),
            u = function() {
                function t(t, e) {
                    this.init(t, e)
                }
                return t.prototype.init = function(t, e) {
                    this.destination = t, this.source = e || t
                }, t.prototype.connect = function(t) {
                    this.source.connect(t)
                }, t.prototype.disconnect = function() {
                    this.source.disconnect()
                }, t.prototype.destroy = function() {
                    this.disconnect(), this.destination = null, this.source = null
                }, t
            }(),
            l = function(t, e) {
                return (l = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(t, e) {
                        t.__proto__ = e
                    } || function(t, e) {
                        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
            };

        function c(t, e) {
            function i() {
                this.constructor = t
            }
            l(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }
        var d, p = function() {
            return (p = Object.assign || function(t) {
                for (var e, i = 1, r = arguments.length; i < r; i++)
                    for (var n in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t
            }).apply(this, arguments)
        };

        function f() {
            return d
        }
        var m, g, v, y, _ = function() {
                function t() {}
                return t.setParamValue = function(t, e) {
                    if (t.setValueAtTime) {
                        var i = f().context;
                        t.setValueAtTime(e, i.audioContext.currentTime)
                    } else t.value = e;
                    return e
                }, t
            }(),
            b = 0,
            x = function(t) {
                function e(e) {
                    var i = t.call(this) || this;
                    return i.id = b++, i._media = null, i._paused = !1, i._muted = !1, i._elapsed = 0, i._updateListener = i._update.bind(i), i.init(e), i
                }
                return c(e, t), e.prototype.stop = function() {
                    this._source && (this._internalStop(), this.emit("stop"))
                }, Object.defineProperty(e.prototype, "speed", {
                    get: function() {
                        return this._speed
                    },
                    set: function(t) {
                        this._speed = t, this.refresh(), this._update(!0)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "volume", {
                    get: function() {
                        return this._volume
                    },
                    set: function(t) {
                        this._volume = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "muted", {
                    get: function() {
                        return this._muted
                    },
                    set: function(t) {
                        this._muted = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "loop", {
                    get: function() {
                        return this._loop
                    },
                    set: function(t) {
                        this._loop = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.refresh = function() {
                    if (this._source) {
                        var t = this._media.context,
                            e = this._media.parent;
                        this._source.loop = this._loop || e.loop;
                        var i = t.volume * (t.muted ? 0 : 1),
                            r = e.volume * (e.muted ? 0 : 1),
                            n = this._volume * (this._muted ? 0 : 1);
                        _.setParamValue(this._gain.gain, n * r * i), _.setParamValue(this._source.playbackRate, this._speed * e.speed * t.speed)
                    }
                }, e.prototype.refreshPaused = function() {
                    var t = this._media.context,
                        e = this._media.parent,
                        i = this._paused || e.paused || t.paused;
                    i !== this._pausedReal && (this._pausedReal = i, i ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({
                        start: this._elapsed % this._duration,
                        end: this._end,
                        speed: this._speed,
                        loop: this._loop,
                        volume: this._volume
                    })), this.emit("pause", i))
                }, e.prototype.play = function(t) {
                    var e = t.start,
                        i = t.end,
                        r = t.speed,
                        n = t.loop,
                        o = t.volume,
                        s = t.muted;
                    this._paused = !1;
                    var a = this._media.nodes.cloneBufferSource(),
                        h = a.source,
                        u = a.gain;
                    this._source = h, this._gain = u, this._speed = r, this._volume = o, this._loop = !!n, this._muted = s, this.refresh();
                    var l = this._source.buffer.duration;
                    this._duration = l, this._end = i, this._lastUpdate = this._now(), this._elapsed = e, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = i, this._source.loopStart = e, this._source.start(0, e)) : i ? this._source.start(0, e, i - e) : this._source.start(0, e), this.emit("start"), this._update(!0), this._enabled = !0
                }, e.prototype._toSec = function(t) {
                    return t > 10 && (t /= 1e3), t || 0
                }, Object.defineProperty(e.prototype, "_enabled", {
                    set: function(t) {
                        var e = this._media.nodes.script;
                        e.removeEventListener("audioprocess", this._updateListener), t && e.addEventListener("audioprocess", this._updateListener)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "progress", {
                    get: function() {
                        return this._progress
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "paused", {
                    get: function() {
                        return this._paused
                    },
                    set: function(t) {
                        this._paused = t, this.refreshPaused()
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.destroy = function() {
                    this.removeAllListeners(), this._internalStop(), this._source && (this._source.disconnect(), this._source = null), this._gain && (this._gain.disconnect(), this._gain = null), this._media && (this._media.context.events.off("refresh", this.refresh, this), this._media.context.events.off("refreshPaused", this.refreshPaused, this), this._media = null), this._end = null, this._speed = 1, this._volume = 1, this._loop = !1, this._elapsed = 0, this._duration = 0, this._paused = !1, this._muted = !1, this._pausedReal = !1
                }, e.prototype.toString = function() {
                    return "[WebAudioInstance id=" + this.id + "]"
                }, e.prototype._now = function() {
                    return this._media.context.audioContext.currentTime
                }, e.prototype._update = function(t) {
                    if (void 0 === t && (t = !1), this._source) {
                        var e = this._now(),
                            i = e - this._lastUpdate;
                        if (i > 0 || t) {
                            var r = this._source.playbackRate.value;
                            this._elapsed += i * r, this._lastUpdate = e;
                            var n = this._duration,
                                o = void 0;
                            if (this._source.loopStart) {
                                var s = this._source.loopEnd - this._source.loopStart;
                                o = (this._source.loopStart + this._elapsed % s) / n
                            } else o = this._elapsed % n / n;
                            this._progress = o, this.emit("progress", this._progress, n)
                        }
                    }
                }, e.prototype.init = function(t) {
                    this._media = t, t.context.events.on("refresh", this.refresh, this), t.context.events.on("refreshPaused", this.refreshPaused, this)
                }, e.prototype._internalStop = function() {
                    this._source && (this._enabled = !1, this._source.onended = null, this._source.stop(0), this._source = null)
                }, e.prototype._onComplete = function() {
                    this._source && (this._enabled = !1, this._source.onended = null), this._source = null, this._progress = 1, this.emit("progress", 1, this._duration), this.emit("end", this)
                }, e
            }(PIXI.utils.EventEmitter),
            w = function(t) {
                function e(i) {
                    var r = this,
                        n = i.audioContext,
                        o = n.createBufferSource(),
                        s = n.createScriptProcessor(e.BUFFER_SIZE),
                        a = n.createGain(),
                        h = n.createAnalyser();
                    return o.connect(h), h.connect(a), a.connect(i.destination), s.connect(i.destination), (r = t.call(this, h, a) || this).context = i, r.bufferSource = o, r.script = s, r.gain = a, r.analyser = h, r
                }
                return c(e, t), e.prototype.destroy = function() {
                    t.prototype.destroy.call(this), this.bufferSource.disconnect(), this.script.disconnect(), this.gain.disconnect(), this.analyser.disconnect(), this.bufferSource = null, this.script = null, this.gain = null, this.analyser = null, this.context = null
                }, e.prototype.cloneBufferSource = function() {
                    var t = this.bufferSource,
                        e = this.context.audioContext.createBufferSource();
                    e.buffer = t.buffer, _.setParamValue(e.playbackRate, t.playbackRate.value), e.loop = t.loop;
                    var i = this.context.audioContext.createGain();
                    return e.connect(i), i.connect(this.destination), {
                        source: e,
                        gain: i
                    }
                }, e.BUFFER_SIZE = 256, e
            }(h),
            T = function() {
                function t() {}
                return t.prototype.init = function(t) {
                    this.parent = t, this._nodes = new w(this.context), this._source = this._nodes.bufferSource, this.source = t.options.source
                }, t.prototype.destroy = function() {
                    this.parent = null, this._nodes.destroy(), this._nodes = null, this._source = null, this.source = null
                }, t.prototype.create = function() {
                    return new x(this)
                }, Object.defineProperty(t.prototype, "context", {
                    get: function() {
                        return this.parent.context
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "isPlayable", {
                    get: function() {
                        return !!this._source && !!this._source.buffer
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "filters", {
                    get: function() {
                        return this._nodes.filters
                    },
                    set: function(t) {
                        this._nodes.filters = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "duration", {
                    get: function() {
                        return this._source.buffer.duration
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "buffer", {
                    get: function() {
                        return this._source.buffer
                    },
                    set: function(t) {
                        this._source.buffer = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "nodes", {
                    get: function() {
                        return this._nodes
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.load = function(t) {
                    this.source ? this._decode(this.source, t) : this.parent.url ? this._loadUrl(t) : t && t(new Error("sound.url or sound.source must be set"))
                }, t.prototype._loadUrl = function(t) {
                    var e = this,
                        i = new XMLHttpRequest,
                        r = this.parent.url;
                    i.open("GET", r, !0), i.responseType = "arraybuffer", i.onload = function() {
                        e.source = i.response, e._decode(i.response, t)
                    }, i.send()
                }, t.prototype._decode = function(t, e) {
                    var i = this;
                    this.parent.context.decode(t, function(t, r) {
                        if (t) e && e(t);
                        else {
                            i.parent.isLoaded = !0, i.buffer = r;
                            var n = i.parent.autoPlayStart();
                            e && e(null, i.parent, n)
                        }
                    })
                }, t
            }(),
            S = function(t) {
                function e() {
                    var i = this,
                        r = window,
                        n = new e.AudioContext,
                        o = n.createDynamicsCompressor(),
                        s = n.createAnalyser();
                    return s.connect(o), o.connect(n.destination), (i = t.call(this, s, o) || this)._ctx = n, i._offlineCtx = new e.OfflineAudioContext(1, 2, r.OfflineAudioContext ? n.sampleRate : 44100), i._unlocked = !1, i.compressor = o, i.analyser = s, i.events = new PIXI.utils.EventEmitter, i.volume = 1, i.speed = 1, i.muted = !1, i.paused = !1, "running" !== n.state && (i._unlock(), i._unlock = i._unlock.bind(i), document.addEventListener("mousedown", i._unlock, !0), document.addEventListener("touchstart", i._unlock, !0), document.addEventListener("touchend", i._unlock, !0)), i
                }
                return c(e, t), e.prototype._unlock = function() {
                    this._unlocked || (this.playEmptySound(), "running" === this._ctx.state && (document.removeEventListener("mousedown", this._unlock, !0), document.removeEventListener("touchend", this._unlock, !0), document.removeEventListener("touchstart", this._unlock, !0), this._unlocked = !0))
                }, e.prototype.playEmptySound = function() {
                    var t = this._ctx.createBufferSource();
                    t.buffer = this._ctx.createBuffer(1, 1, 22050), t.connect(this._ctx.destination), t.start(0, 0, 0), "suspended" === t.context.state && t.context.resume()
                }, Object.defineProperty(e, "AudioContext", {
                    get: function() {
                        var t = window;
                        return t.AudioContext || t.webkitAudioContext || null
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e, "OfflineAudioContext", {
                    get: function() {
                        var t = window;
                        return t.OfflineAudioContext || t.webkitOfflineAudioContext || null
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.destroy = function() {
                    t.prototype.destroy.call(this);
                    var e = this._ctx;
                    void 0 !== e.close && e.close(), this.events.removeAllListeners(), this.analyser.disconnect(), this.compressor.disconnect(), this.analyser = null, this.compressor = null, this.events = null, this._offlineCtx = null, this._ctx = null
                }, Object.defineProperty(e.prototype, "audioContext", {
                    get: function() {
                        return this._ctx
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "offlineContext", {
                    get: function() {
                        return this._offlineCtx
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "paused", {
                    get: function() {
                        return this._paused
                    },
                    set: function(t) {
                        t && "running" === this._ctx.state ? this._ctx.suspend() : t || "suspended" !== this._ctx.state || this._ctx.resume(), this._paused = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.refresh = function() {
                    this.events.emit("refresh")
                }, e.prototype.refreshPaused = function() {
                    this.events.emit("refreshPaused")
                }, e.prototype.toggleMute = function() {
                    return this.muted = !this.muted, this.refresh(), this.muted
                }, e.prototype.togglePause = function() {
                    return this.paused = !this.paused, this.refreshPaused(), this._paused
                }, e.prototype.decode = function(t, e) {
                    this._offlineCtx.decodeAudioData(t, function(t) {
                        e(null, t)
                    }, function(t) {
                        e(new Error(t.message || "Unable to decode file"))
                    })
                }, e
            }(h),
            E = Object.freeze({
                WebAudioMedia: T,
                WebAudioInstance: x,
                WebAudioNodes: w,
                WebAudioContext: S,
                WebAudioUtils: _
            }),
            P = function(t) {
                function e(i, r, n, o, s, a, h, u, l, c) {
                    void 0 === i && (i = 0), void 0 === r && (r = 0), void 0 === n && (n = 0), void 0 === o && (o = 0), void 0 === s && (s = 0), void 0 === a && (a = 0), void 0 === h && (h = 0), void 0 === u && (u = 0), void 0 === l && (l = 0), void 0 === c && (c = 0);
                    var d = this;
                    if (!f().useLegacy) {
                        var p = [{
                            f: e.F32,
                            type: "lowshelf",
                            gain: i
                        }, {
                            f: e.F64,
                            type: "peaking",
                            gain: r
                        }, {
                            f: e.F125,
                            type: "peaking",
                            gain: n
                        }, {
                            f: e.F250,
                            type: "peaking",
                            gain: o
                        }, {
                            f: e.F500,
                            type: "peaking",
                            gain: s
                        }, {
                            f: e.F1K,
                            type: "peaking",
                            gain: a
                        }, {
                            f: e.F2K,
                            type: "peaking",
                            gain: h
                        }, {
                            f: e.F4K,
                            type: "peaking",
                            gain: u
                        }, {
                            f: e.F8K,
                            type: "peaking",
                            gain: l
                        }, {
                            f: e.F16K,
                            type: "highshelf",
                            gain: c
                        }].map(function(t) {
                            var e = f().context.audioContext.createBiquadFilter();
                            return e.type = t.type, _.setParamValue(e.Q, 1), e.frequency.value = t.f, _.setParamValue(e.gain, t.gain), e
                        });
                        (d = t.call(this, p[0], p[p.length - 1]) || this).bands = p, d.bandsMap = {};
                        for (var m = 0; m < d.bands.length; m++) {
                            var g = d.bands[m];
                            m > 0 && d.bands[m - 1].connect(g), d.bandsMap[g.frequency.value] = g
                        }
                        return d
                    }
                    d = t.call(this, null) || this
                }
                return c(e, t), e.prototype.setGain = function(t, e) {
                    if (void 0 === e && (e = 0), !this.bandsMap[t]) throw new Error("No band found for frequency " + t);
                    _.setParamValue(this.bandsMap[t].gain, e)
                }, e.prototype.getGain = function(t) {
                    if (!this.bandsMap[t]) throw new Error("No band found for frequency " + t);
                    return this.bandsMap[t].gain.value
                }, Object.defineProperty(e.prototype, "f32", {
                    get: function() {
                        return this.getGain(e.F32)
                    },
                    set: function(t) {
                        this.setGain(e.F32, t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "f64", {
                    get: function() {
                        return this.getGain(e.F64)
                    },
                    set: function(t) {
                        this.setGain(e.F64, t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "f125", {
                    get: function() {
                        return this.getGain(e.F125)
                    },
                    set: function(t) {
                        this.setGain(e.F125, t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "f250", {
                    get: function() {
                        return this.getGain(e.F250)
                    },
                    set: function(t) {
                        this.setGain(e.F250, t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "f500", {
                    get: function() {
                        return this.getGain(e.F500)
                    },
                    set: function(t) {
                        this.setGain(e.F500, t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "f1k", {
                    get: function() {
                        return this.getGain(e.F1K)
                    },
                    set: function(t) {
                        this.setGain(e.F1K, t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "f2k", {
                    get: function() {
                        return this.getGain(e.F2K)
                    },
                    set: function(t) {
                        this.setGain(e.F2K, t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "f4k", {
                    get: function() {
                        return this.getGain(e.F4K)
                    },
                    set: function(t) {
                        this.setGain(e.F4K, t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "f8k", {
                    get: function() {
                        return this.getGain(e.F8K)
                    },
                    set: function(t) {
                        this.setGain(e.F8K, t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "f16k", {
                    get: function() {
                        return this.getGain(e.F16K)
                    },
                    set: function(t) {
                        this.setGain(e.F16K, t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.reset = function() {
                    this.bands.forEach(function(t) {
                        _.setParamValue(t.gain, 0)
                    })
                }, e.prototype.destroy = function() {
                    this.bands.forEach(function(t) {
                        t.disconnect()
                    }), this.bands = null, this.bandsMap = null
                }, e.F32 = 32, e.F64 = 64, e.F125 = 125, e.F250 = 250, e.F500 = 500, e.F1K = 1e3, e.F2K = 2e3, e.F4K = 4e3, e.F8K = 8e3, e.F16K = 16e3, e
            }(u),
            I = function(t) {
                function e(e) {
                    void 0 === e && (e = 0);
                    var i = this;
                    if (!f().useLegacy) {
                        var r = f().context.audioContext.createWaveShaper();
                        return (i = t.call(this, r) || this)._distortion = r, i.amount = e, i
                    }
                    i = t.call(this, null) || this
                }
                return c(e, t), Object.defineProperty(e.prototype, "amount", {
                    get: function() {
                        return this._amount
                    },
                    set: function(t) {
                        t *= 1e3, this._amount = t;
                        for (var e, i = new Float32Array(44100), r = Math.PI / 180, n = 0; n < 44100; ++n) e = 2 * n / 44100 - 1, i[n] = (3 + t) * e * 20 * r / (Math.PI + t * Math.abs(e));
                        this._distortion.curve = i, this._distortion.oversample = "4x"
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.destroy = function() {
                    this._distortion = null, t.prototype.destroy.call(this)
                }, e
            }(u),
            C = function(t) {
                function e(e) {
                    void 0 === e && (e = 0);
                    var i = this;
                    if (!f().useLegacy) {
                        var r, n, o, s = f().context.audioContext;
                        return s.createStereoPanner ? o = r = s.createStereoPanner() : ((n = s.createPanner()).panningModel = "equalpower", o = n), (i = t.call(this, o) || this)._stereo = r, i._panner = n, i.pan = e, i
                    }
                    i = t.call(this, null) || this
                }
                return c(e, t), Object.defineProperty(e.prototype, "pan", {
                    get: function() {
                        return this._pan
                    },
                    set: function(t) {
                        this._pan = t, this._stereo ? _.setParamValue(this._stereo.pan, t) : this._panner.setPosition(t, 0, 1 - Math.abs(t))
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.destroy = function() {
                    t.prototype.destroy.call(this), this._stereo = null, this._panner = null
                }, e
            }(u),
            A = function(t) {
                function e(e, i, r) {
                    void 0 === e && (e = 3), void 0 === i && (i = 2), void 0 === r && (r = !1);
                    var n = this;
                    if (!f().useLegacy) return (n = t.call(this, null) || this)._seconds = n._clamp(e, 1, 50), n._decay = n._clamp(i, 0, 100), n._reverse = r, n._rebuild(), n;
                    n = t.call(this, null) || this
                }
                return c(e, t), e.prototype._clamp = function(t, e, i) {
                    return Math.min(i, Math.max(e, t))
                }, Object.defineProperty(e.prototype, "seconds", {
                    get: function() {
                        return this._seconds
                    },
                    set: function(t) {
                        this._seconds = this._clamp(t, 1, 50), this._rebuild()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "decay", {
                    get: function() {
                        return this._decay
                    },
                    set: function(t) {
                        this._decay = this._clamp(t, 0, 100), this._rebuild()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "reverse", {
                    get: function() {
                        return this._reverse
                    },
                    set: function(t) {
                        this._reverse = t, this._rebuild()
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype._rebuild = function() {
                    for (var t, e = f().context.audioContext, i = e.sampleRate, r = i * this._seconds, n = e.createBuffer(2, r, i), o = n.getChannelData(0), s = n.getChannelData(1), a = 0; a < r; a++) t = this._reverse ? r - a : a, o[a] = (2 * Math.random() - 1) * Math.pow(1 - t / r, this._decay), s[a] = (2 * Math.random() - 1) * Math.pow(1 - t / r, this._decay);
                    var h = f().context.audioContext.createConvolver();
                    h.buffer = n, this.init(h)
                }, e
            }(u),
            M = function(t) {
                function e() {
                    var e = this;
                    if (!f().useLegacy) {
                        var i = f().context.audioContext,
                            r = i.createChannelSplitter(),
                            n = i.createChannelMerger();
                        return n.connect(r), (e = t.call(this, n, r) || this)._merger = n, e
                    }
                    e = t.call(this, null) || this
                }
                return c(e, t), e.prototype.destroy = function() {
                    this._merger.disconnect(), this._merger = null, t.prototype.destroy.call(this)
                }, e
            }(u),
            O = function(t) {
                function e() {
                    if (!f().useLegacy) {
                        var e = f().context.audioContext,
                            i = e.createBiquadFilter(),
                            r = e.createBiquadFilter(),
                            n = e.createBiquadFilter(),
                            o = e.createBiquadFilter();
                        return i.type = "lowpass", _.setParamValue(i.frequency, 2e3), r.type = "lowpass", _.setParamValue(r.frequency, 2e3), n.type = "highpass", _.setParamValue(n.frequency, 500), o.type = "highpass", _.setParamValue(o.frequency, 500), i.connect(r), r.connect(n), n.connect(o), t.call(this, i, o) || this
                    }
                    t.call(this, null)
                }
                return c(e, t), e
            }(u),
            R = Object.freeze({
                Filter: u,
                EqualizerFilter: P,
                DistortionFilter: I,
                StereoFilter: C,
                ReverbFilter: A,
                MonoFilter: M,
                TelephoneFilter: O
            }),
            D = 0,
            F = function(t) {
                function e(e) {
                    var i = t.call(this) || this;
                    return i.id = D++, i.init(e), i
                }
                return c(e, t), Object.defineProperty(e.prototype, "progress", {
                    get: function() {
                        return this._source.currentTime / this._duration
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "paused", {
                    get: function() {
                        return this._paused
                    },
                    set: function(t) {
                        this._paused = t, this.refreshPaused()
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype._onPlay = function() {
                    this._playing = !0
                }, e.prototype._onPause = function() {
                    this._playing = !1
                }, e.prototype.init = function(t) {
                    this._playing = !1, this._duration = t.source.duration;
                    var e = this._source = t.source.cloneNode(!1);
                    e.src = t.parent.url, e.onplay = this._onPlay.bind(this), e.onpause = this._onPause.bind(this), t.context.on("refresh", this.refresh, this), t.context.on("refreshPaused", this.refreshPaused, this), this._media = t
                }, e.prototype._internalStop = function() {
                    this._source && this._playing && (this._source.onended = null, this._source.pause())
                }, e.prototype.stop = function() {
                    this._internalStop(), this._source && this.emit("stop")
                }, Object.defineProperty(e.prototype, "speed", {
                    get: function() {
                        return this._speed
                    },
                    set: function(t) {
                        this._speed = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "volume", {
                    get: function() {
                        return this._volume
                    },
                    set: function(t) {
                        this._volume = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "loop", {
                    get: function() {
                        return this._loop
                    },
                    set: function(t) {
                        this._loop = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "muted", {
                    get: function() {
                        return this._muted
                    },
                    set: function(t) {
                        this._muted = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.refresh = function() {
                    var t = this._media.context,
                        e = this._media.parent;
                    this._source.loop = this._loop || e.loop;
                    var i = t.volume * (t.muted ? 0 : 1),
                        r = e.volume * (e.muted ? 0 : 1),
                        n = this._volume * (this._muted ? 0 : 1);
                    this._source.volume = n * i * r, this._source.playbackRate = this._speed * t.speed * e.speed
                }, e.prototype.refreshPaused = function() {
                    var t = this._media.context,
                        e = this._media.parent,
                        i = this._paused || e.paused || t.paused;
                    i !== this._pausedReal && (this._pausedReal = i, i ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({
                        start: this._source.currentTime,
                        end: this._end,
                        volume: this._volume,
                        speed: this._speed,
                        loop: this._loop
                    })), this.emit("pause", i))
                }, e.prototype.play = function(t) {
                    var i = this,
                        r = t.start,
                        n = t.end,
                        o = t.speed,
                        s = t.loop,
                        a = t.volume,
                        h = t.muted;
                    this._speed = o, this._volume = a, this._loop = !!s, this._muted = h, this.refresh(), this.loop && null !== n && (this.loop = !1), this._start = r, this._end = n || this._duration, this._start = Math.max(0, this._start - e.PADDING), this._end = Math.min(this._end + e.PADDING, this._duration), this._source.onloadedmetadata = function() {
                        i._source && (i._source.currentTime = r, i._source.onloadedmetadata = null, i.emit("progress", r, i._duration), PIXI.ticker.shared.add(i._onUpdate, i))
                    }, this._source.onended = this._onComplete.bind(this), this._source.play(), this.emit("start")
                }, e.prototype._onUpdate = function() {
                    this.emit("progress", this.progress, this._duration), this._source.currentTime >= this._end && !this._source.loop && this._onComplete()
                }, e.prototype._onComplete = function() {
                    PIXI.ticker.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this)
                }, e.prototype.destroy = function() {
                    PIXI.ticker.shared.remove(this._onUpdate, this), this.removeAllListeners();
                    var t = this._source;
                    t && (t.onended = null, t.onplay = null, t.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = !1, this._end = null, this._start = 0, this._duration = 0, this._playing = !1, this._pausedReal = !1, this._paused = !1, this._muted = !1, this._media && (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), this._media = null)
                }, e.prototype.toString = function() {
                    return "[HTMLAudioInstance id=" + this.id + "]"
                }, e.PADDING = .1, e
            }(PIXI.utils.EventEmitter),
            L = function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return c(e, t), e.prototype.init = function(t) {
                    this.parent = t, this._source = t.options.source || new Audio, t.url && (this._source.src = t.url)
                }, e.prototype.create = function() {
                    return new F(this)
                }, Object.defineProperty(e.prototype, "isPlayable", {
                    get: function() {
                        return !!this._source && 4 === this._source.readyState
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "duration", {
                    get: function() {
                        return this._source.duration
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "context", {
                    get: function() {
                        return this.parent.context
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "filters", {
                    get: function() {
                        return null
                    },
                    set: function(t) {},
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.destroy = function() {
                    this.removeAllListeners(), this.parent = null, this._source && (this._source.src = "", this._source.load(), this._source = null)
                }, Object.defineProperty(e.prototype, "source", {
                    get: function() {
                        return this._source
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.load = function(t) {
                    var e = this._source,
                        i = this.parent;
                    if (4 !== e.readyState) {
                        if (!i.url) return t(new Error("sound.url or sound.source must be set"));
                        e.src = i.url;
                        var r = function() {
                                e.removeEventListener("canplaythrough", n), e.removeEventListener("load", n), e.removeEventListener("abort", o), e.removeEventListener("error", s)
                            },
                            n = function() {
                                r(), i.isLoaded = !0;
                                var e = i.autoPlayStart();
                                t && t(null, i, e)
                            },
                            o = function() {
                                r(), t && t(new Error("Sound loading has been aborted"))
                            },
                            s = function() {
                                r();
                                var i = "Failed to load audio element (code: " + e.error.code + ")";
                                t && t(new Error(i))
                            };
                        e.addEventListener("canplaythrough", n, !1), e.addEventListener("load", n, !1), e.addEventListener("abort", o, !1), e.addEventListener("error", s, !1), e.load()
                    } else {
                        i.isLoaded = !0;
                        var a = i.autoPlayStart();
                        t && setTimeout(function() {
                            t(null, i, a)
                        }, 0)
                    }
                }, e
            }(PIXI.utils.EventEmitter),
            B = function(t) {
                function e() {
                    var e = t.call(this) || this;
                    return e.speed = 1, e.volume = 1, e.muted = !1, e.paused = !1, e
                }
                return c(e, t), e.prototype.refresh = function() {
                    this.emit("refresh")
                }, e.prototype.refreshPaused = function() {
                    this.emit("refreshPaused")
                }, Object.defineProperty(e.prototype, "filters", {
                    get: function() {
                        return null
                    },
                    set: function(t) {},
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "audioContext", {
                    get: function() {
                        return null
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.toggleMute = function() {
                    return this.muted = !this.muted, this.refresh(), this.muted
                }, e.prototype.togglePause = function() {
                    return this.paused = !this.paused, this.refreshPaused(), this.paused
                }, e.prototype.destroy = function() {
                    this.removeAllListeners()
                }, e
            }(PIXI.utils.EventEmitter),
            k = Object.freeze({
                HTMLAudioMedia: L,
                HTMLAudioInstance: F,
                HTMLAudioContext: B
            }),
            N = ["mp3", "ogg", "oga", "opus", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"],
            U = (m = {
                m4a: "mp4",
                oga: "ogg"
            }, g = document.createElement("audio"), v = {}, y = /^no$/, N.forEach(function(t) {
                var e = m[t] || t,
                    i = g.canPlayType("audio/" + t).replace(y, ""),
                    r = g.canPlayType("audio/" + e).replace(y, "");
                v[t] = !!i || !!r
            }), Object.freeze(v)),
            j = /\.(\{([^\}]+)\})(\?.*)?$/;

        function X(t) {
            var e = j,
                i = "string" == typeof t ? t : t.url;
            if (e.test(i)) {
                for (var r = e.exec(i), n = r[2].split(","), o = n[n.length - 1], s = 0, a = n.length; s < a; s++) {
                    var h = n[s];
                    if (U[h]) {
                        o = h;
                        break
                    }
                }
                var u = i.replace(r[1], o);
                return "string" != typeof t && (t.extension = o, t.url = u), u
            }
            return i
        }
        var G = function() {
                function t() {}
                return t.add = function() {
                    t.legacy = f().useLegacy
                }, Object.defineProperty(t, "legacy", {
                    set: function(t) {
                        var e = PIXI.loaders.Resource,
                            i = N;
                        t ? i.forEach(function(t) {
                            e.setExtensionXhrType(t, e.XHR_RESPONSE_TYPE.DEFAULT), e.setExtensionLoadType(t, e.LOAD_TYPE.AUDIO)
                        }) : i.forEach(function(t) {
                            e.setExtensionXhrType(t, e.XHR_RESPONSE_TYPE.BUFFER), e.setExtensionLoadType(t, e.LOAD_TYPE.XHR)
                        })
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.pre = function(t, e) {
                    X(t), e()
                }, t.use = function(t, e) {
                    t.data && N.indexOf(t.extension) > -1 ? t.sound = f().add(t.name, {
                        loaded: e,
                        preload: !0,
                        url: t.url,
                        source: t.data
                    }) : e()
                }, t
            }(),
            V = function(t) {
                function e(e, i) {
                    var r = t.call(this, e, i) || this;
                    return r.use(G.use), r.pre(G.pre), r
                }
                return c(e, t), e.addPixiMiddleware = function(e) {
                    t.addPixiMiddleware.call(this, e)
                }, e
            }(PIXI.loaders.Loader),
            H = function() {
                function t(t, e) {
                    this.parent = t, Object.assign(this, e), this.duration = this.end - this.start
                }
                return t.prototype.play = function(t) {
                    return this.parent.play({
                        complete: t,
                        speed: this.speed || this.parent.speed,
                        end: this.end,
                        start: this.start,
                        loop: this.loop
                    })
                }, t.prototype.destroy = function() {
                    this.parent = null
                }, t
            }(),
            z = function() {
                function t(t, e) {
                    this.media = t, this.options = e, this._instances = [], this._sprites = {}, this.media.init(this);
                    var i = e.complete;
                    this._autoPlayOptions = i ? {
                        complete: i
                    } : null, this.isLoaded = !1, this.isPlaying = !1, this.autoPlay = e.autoPlay, this.singleInstance = e.singleInstance, this.preload = e.preload || this.autoPlay, this.url = e.url, this.speed = e.speed, this.volume = e.volume, this.loop = e.loop, e.sprites && this.addSprites(e.sprites), this.preload && this._preload(e.loaded)
                }
                return t.from = function(e) {
                    var i = {};
                    return "string" == typeof e ? i.url = e : e instanceof ArrayBuffer || e instanceof HTMLAudioElement ? i.source = e : i = e, (i = p({
                        autoPlay: !1,
                        singleInstance: !1,
                        url: null,
                        source: null,
                        preload: !1,
                        volume: 1,
                        speed: 1,
                        complete: null,
                        loaded: null,
                        loop: !1
                    }, i)).url && (i.url = X(i.url)), Object.freeze(i), new t(f().useLegacy ? new L : new T, i)
                }, Object.defineProperty(t.prototype, "context", {
                    get: function() {
                        return f().context
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.pause = function() {
                    return this.isPlaying = !1, this.paused = !0, this
                }, t.prototype.resume = function() {
                    return this.isPlaying = this._instances.length > 0, this.paused = !1, this
                }, Object.defineProperty(t.prototype, "paused", {
                    get: function() {
                        return this._paused
                    },
                    set: function(t) {
                        this._paused = t, this.refreshPaused()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "speed", {
                    get: function() {
                        return this._speed
                    },
                    set: function(t) {
                        this._speed = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "filters", {
                    get: function() {
                        return this.media.filters
                    },
                    set: function(t) {
                        this.media.filters = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.addSprites = function(t, e) {
                    if ("object" == typeof t) {
                        var i = {};
                        for (var r in t) i[r] = this.addSprites(r, t[r]);
                        return i
                    }
                    if ("string" == typeof t) {
                        var n = new H(this, e);
                        return this._sprites[t] = n, n
                    }
                }, t.prototype.destroy = function() {
                    this._removeInstances(), this.removeSprites(), this.media.destroy(), this.media = null, this._sprites = null, this._instances = null
                }, t.prototype.removeSprites = function(t) {
                    if (t) {
                        var e = this._sprites[t];
                        void 0 !== e && (e.destroy(), delete this._sprites[t])
                    } else
                        for (var i in this._sprites) this.removeSprites(i);
                    return this
                }, Object.defineProperty(t.prototype, "isPlayable", {
                    get: function() {
                        return this.isLoaded && this.media && this.media.isPlayable
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.stop = function() {
                    if (!this.isPlayable) return this.autoPlay = !1, this._autoPlayOptions = null, this;
                    this.isPlaying = !1;
                    for (var t = this._instances.length - 1; t >= 0; t--) this._instances[t].stop();
                    return this
                }, t.prototype.play = function(t, e) {
                    var i, r = this;
                    if ("string" == typeof t ? i = {
                            sprite: o = t,
                            loop: this.loop,
                            complete: e
                        } : "function" == typeof t ? (i = {}).complete = t : i = t, (i = p({
                            complete: null,
                            loaded: null,
                            sprite: null,
                            end: null,
                            start: 0,
                            volume: 1,
                            speed: 1,
                            muted: !1,
                            loop: !1
                        }, i || {})).sprite) {
                        var n = i.sprite,
                            o = this._sprites[n];
                        i.start = o.start, i.end = o.end, i.speed = o.speed || 1, i.loop = o.loop || i.loop, delete i.sprite
                    }
                    if (i.offset && (i.start = i.offset), !this.isLoaded) return new Promise(function(t, e) {
                        r.autoPlay = !0, r._autoPlayOptions = i, r._preload(function(r, n, o) {
                            r ? e(r) : (i.loaded && i.loaded(r, n, o), t(o))
                        })
                    });
                    this.singleInstance && this._removeInstances();
                    var s = this._createInstance();
                    return this._instances.push(s), this.isPlaying = !0, s.once("end", function() {
                        i.complete && i.complete(r), r._onComplete(s)
                    }), s.once("stop", function() {
                        r._onComplete(s)
                    }), s.play(i), s
                }, t.prototype.refresh = function() {
                    for (var t = this._instances.length, e = 0; e < t; e++) this._instances[e].refresh()
                }, t.prototype.refreshPaused = function() {
                    for (var t = this._instances.length, e = 0; e < t; e++) this._instances[e].refreshPaused()
                }, Object.defineProperty(t.prototype, "volume", {
                    get: function() {
                        return this._volume
                    },
                    set: function(t) {
                        this._volume = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "muted", {
                    get: function() {
                        return this._muted
                    },
                    set: function(t) {
                        this._muted = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "loop", {
                    get: function() {
                        return this._loop
                    },
                    set: function(t) {
                        this._loop = t, this.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype._preload = function(t) {
                    this.media.load(t)
                }, Object.defineProperty(t.prototype, "instances", {
                    get: function() {
                        return this._instances
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "sprites", {
                    get: function() {
                        return this._sprites
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "duration", {
                    get: function() {
                        return this.media.duration
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.autoPlayStart = function() {
                    var t;
                    return this.autoPlay && (t = this.play(this._autoPlayOptions)), t
                }, t.prototype._removeInstances = function() {
                    for (var t = this._instances.length - 1; t >= 0; t--) this._poolInstance(this._instances[t]);
                    this._instances.length = 0
                }, t.prototype._onComplete = function(t) {
                    if (this._instances) {
                        var e = this._instances.indexOf(t);
                        e > -1 && this._instances.splice(e, 1), this.isPlaying = this._instances.length > 0
                    }
                    this._poolInstance(t)
                }, t.prototype._createInstance = function() {
                    if (t._pool.length > 0) {
                        var e = t._pool.pop();
                        return e.init(this.media), e
                    }
                    return this.media.create()
                }, t.prototype._poolInstance = function(e) {
                    e.destroy(), t._pool.indexOf(e) < 0 && t._pool.push(e)
                }, t._pool = [], t
            }(),
            W = function() {
                function t() {
                    this.init()
                }
                return t.prototype.init = function() {
                    return this.supported && (this._webAudioContext = new S), this._htmlAudioContext = new B, this._sounds = {}, this.useLegacy = !this.supported, this
                }, Object.defineProperty(t.prototype, "context", {
                    get: function() {
                        return this._context
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "filtersAll", {
                    get: function() {
                        return this.useLegacy ? [] : this._context.filters
                    },
                    set: function(t) {
                        this.useLegacy || (this._context.filters = t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "supported", {
                    get: function() {
                        return null !== S.AudioContext
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.add = function(t, e) {
                    if ("object" == typeof t) {
                        var i = {};
                        for (var r in t) {
                            var n = this._getOptions(t[r], e);
                            i[r] = this.add(r, n)
                        }
                        return i
                    }
                    if ("string" == typeof t) {
                        if (e instanceof z) return this._sounds[t] = e, e;
                        n = this._getOptions(e);
                        var o = z.from(n);
                        return this._sounds[t] = o, o
                    }
                }, t.prototype._getOptions = function(t, e) {
                    var i;
                    return i = "string" == typeof t ? {
                        url: t
                    } : t instanceof ArrayBuffer || t instanceof HTMLAudioElement ? {
                        source: t
                    } : t, p({}, i, e || {})
                }, Object.defineProperty(t.prototype, "useLegacy", {
                    get: function() {
                        return this._useLegacy
                    },
                    set: function(t) {
                        G.legacy = t, this._useLegacy = t, this._context = !t && this.supported ? this._webAudioContext : this._htmlAudioContext
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.remove = function(t) {
                    return this.exists(t, !0), this._sounds[t].destroy(), delete this._sounds[t], this
                }, Object.defineProperty(t.prototype, "volumeAll", {
                    get: function() {
                        return this._context.volume
                    },
                    set: function(t) {
                        this._context.volume = t, this._context.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "speedAll", {
                    get: function() {
                        return this._context.speed
                    },
                    set: function(t) {
                        this._context.speed = t, this._context.refresh()
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.togglePauseAll = function() {
                    return this._context.togglePause()
                }, t.prototype.pauseAll = function() {
                    return this._context.paused = !0, this._context.refresh(), this
                }, t.prototype.resumeAll = function() {
                    return this._context.paused = !1, this._context.refresh(), this
                }, t.prototype.toggleMuteAll = function() {
                    return this._context.toggleMute()
                }, t.prototype.muteAll = function() {
                    return this._context.muted = !0, this._context.refresh(), this
                }, t.prototype.unmuteAll = function() {
                    return this._context.muted = !1, this._context.refresh(), this
                }, t.prototype.removeAll = function() {
                    for (var t in this._sounds) this._sounds[t].destroy(), delete this._sounds[t];
                    return this
                }, t.prototype.stopAll = function() {
                    for (var t in this._sounds) this._sounds[t].stop();
                    return this
                }, t.prototype.exists = function(t, e) {
                    return void 0 === e && (e = !1), !!this._sounds[t]
                }, t.prototype.find = function(t) {
                    return this.exists(t, !0), this._sounds[t]
                }, t.prototype.play = function(t, e) {
                    return this.find(t).play(e)
                }, t.prototype.stop = function(t) {
                    return this.find(t).stop()
                }, t.prototype.pause = function(t) {
                    return this.find(t).pause()
                }, t.prototype.resume = function(t) {
                    return this.find(t).resume()
                }, t.prototype.volume = function(t, e) {
                    var i = this.find(t);
                    return void 0 !== e && (i.volume = e), i.volume
                }, t.prototype.speed = function(t, e) {
                    var i = this.find(t);
                    return void 0 !== e && (i.speed = e), i.speed
                }, t.prototype.duration = function(t) {
                    return this.find(t).duration
                }, t.prototype.close = function() {
                    return this.removeAll(), this._sounds = null, this._webAudioContext && (this._webAudioContext.destroy(), this._webAudioContext = null), this._htmlAudioContext && (this._htmlAudioContext.destroy(), this._htmlAudioContext = null), this._context = null, this
                }, t
            }(),
            Y = 0,
            q = Object.freeze({
                get PLAY_ID() {
                    return Y
                },
                playOnce: function(t, e) {
                    var i = "alias" + Y++;
                    return f().add(i, {
                        url: t,
                        preload: !0,
                        autoPlay: !0,
                        loaded: function(t) {
                            t && (f().remove(i), e && e(t))
                        },
                        complete: function() {
                            f().remove(i), e && e(null)
                        }
                    }), i
                },
                render: function(t, e) {
                    var i = document.createElement("canvas");
                    e = p({
                        width: 512,
                        height: 128,
                        fill: "black"
                    }, e || {}), i.width = e.width, i.height = e.height;
                    var r = PIXI.BaseTexture.fromCanvas(i);
                    if (!(t.media instanceof T)) return r;
                    var n = t.media,
                        o = i.getContext("2d");
                    o.fillStyle = e.fill;
                    for (var s = n.buffer.getChannelData(0), a = Math.ceil(s.length / e.width), h = e.height / 2, u = 0; u < e.width; u++) {
                        for (var l = 1, c = -1, d = 0; d < a; d++) {
                            var f = s[u * a + d];
                            f < l && (l = f), f > c && (c = f)
                        }
                        // o.fillRect(u, (1 + l) * h, 1, Math.max(1, (c - l) * h))
                    }
                    return r
                },
                resolveUrl: X,
                sineTone: function(t, e) {
                    void 0 === t && (t = 200), void 0 === e && (e = 1);
                    var i = z.from({
                        singleInstance: !0
                    });
                    if (!(i.media instanceof T)) return i;
                    for (var r = i.media, n = i.context.audioContext.createBuffer(1, 48e3 * e, 48e3), o = n.getChannelData(0), s = 0; s < o.length; s++) {
                        var a = t * (s / n.sampleRate) * Math.PI;
                        o[s] = 2 * Math.sin(a)
                    }
                    return r.buffer = n, i.isLoaded = !0, i
                },
                extensions: N,
                supported: U
            }),
            K = function(t) {
                return d = t, t
            }(new W),
            Z = window,
            J = PIXI;
        if ("undefined" == typeof Promise && (Z.Promise = i), void 0 !== PIXI.loaders) {
            var Q = parseInt(PIXI.VERSION.split(".")[0], 10);
            4 === Q ? (PIXI.loaders.Loader = V, G.add(), PIXI.loader.use(G.use), PIXI.loader.pre(G.pre)) : Q >= 5 && J.Loader.registerPlugin(G)
        }
        return void 0 === Z.__pixiSound && delete Z.__pixiSound, J.sound || (Object.defineProperty(J, "sound", {
            get: function() {
                return K
            }
        }), Object.defineProperties(K, {
            Filterable: {
                get: function() {
                    return h
                }
            },
            filters: {
                get: function() {
                    return R
                }
            },
            htmlaudio: {
                get: function() {
                    return k
                }
            },
            Sound: {
                get: function() {
                    return z
                }
            },
            SoundLibrary: {
                get: function() {
                    return W
                }
            },
            SoundSprite: {
                get: function() {
                    return H
                }
            },
            utils: {
                get: function() {
                    return q
                }
            },
            webaudio: {
                get: function() {
                    return E
                }
            },
            sound: {
                get: function() {
                    return K
                }
            }
        })), K
    }),
    function t(e, i, r) {
        function n(s, a) {
            if (!i[s]) {
                if (!e[s]) {
                    var h = "function" == typeof require && require;
                    if (!a && h) return h(s, !0);
                    if (o) return o(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var l = i[s] = {
                    exports: {}
                };
                e[s][0].call(l.exports, function(t) {
                    return n(e[s][1][t] || t)
                }, l, l.exports, t, e, i, r)
            }
            return i[s].exports
        }
        for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) n(r[s]);
        return n
    }({
        1: [function(t, e, i) {
            var r = t("tmi.js"),
                n = {
                    global: {},
                    users: {}
                },
                o = "",
                s = null,
                a = !0,
                h = 0,
                u = {
                    isDebug: !1,
                    chatModes: {},
                    version: function() {
                        return "1.0.13"
                    },
                    onCommand: function(t, e, i, r, n) {
                        u.isDebug && console.log("onCommand default handler")
                    },
                    onChat: function(t, e, i, r, n) {
                        u.isDebug && console.log("onChat default handler")
                    },
                    onWhisper: function(t, e, i, r, n) {
                        u.isDebug && console.log("onWhisper default handler")
                    },
                    onMessageDeleted: function(t, e) {
                        u.isDebug && console.log("onMessageDeleted default handler")
                    },
                    onJoin: function(t, e) {
                        u.isDebug && console.log("onJoin default handler")
                    },
                    onPart: function(t, e) {
                        u.isDebug && console.log("onPart default handler")
                    },
                    onHosted: function(t, e, i) {
                        u.isDebug && console.log("onHosted default handler")
                    },
                    onRaid: function(t, e) {
                        u.isDebug && console.log("onRaid default handler")
                    },
                    onSub: function(t, e, i, r) {
                        u.isDebug && console.log("onSub default handler")
                    },
                    onResub: function(t, e, i, r, n, o) {
                        u.isDebug && console.log("onResub default handler")
                    },
                    onSubGift: function(t, e, i, r, n, o) {
                        u.isDebug && console.log("onSubGift default handler")
                    },
                    onSubMysteryGift: function(t, e, i, r, n) {
                        u.isDebug && console.log("onSubMysteryGift default handler")
                    },
                    onGiftSubContinue: function(t, e, i) {
                        u.isDebug && console.log("onGiftSubContinue default handler")
                    },
                    onCheer: function(t, e, i) {
                        u.isDebug && console.log("onCheer default handler")
                    },
                    onChatMode: function(t, e) {
                        u.isDebug && console.log("onChatMode default handler")
                    },
                    onConnected: function(t, e, i) {},
                    onReconnect: function(t) {},
                    Say: function(t, e) {
                        return !!s && (e || (e = o), s.say(e, t).catch(function(t) {
                            console.log("Error:", t)
                        }), !0)
                    },
                    Whisper: function(t, e) {
                        return !!s && (s.whisper(e, t).catch(function(t) {
                            console.log("Error:", t)
                        }), !0)
                    },
                    DeleteMessage: function(t, e) {
                        return !!s && (e || (e = o), s.deletemessage(e, t).catch(function(t) {
                            console.log("Error:", t)
                        }), !0)
                    },
                    GetClient: function() {
                        return s
                    },
                    Init: function(t, e, i, l) {
                        if (("string" == typeof(i = i || [t]) || i instanceof String) && (i = [i]), !Array.isArray(i)) throw new Error("Channels is not an array");
                        u.isDebug = l, o = i[0];
                        var c = {
                            options: {
                                debug: l
                            },
                            connection: {
                                reconnect: !0,
                                secure: !0
                            },
                            channels: i
                        };
                        e && (c.identity = {
                            username: t,
                            password: e
                        }), (s = new r.client(c)).on("roomstate", function(t, e) {
                            try {
                                var i = t.replace("#", "");
                                u.chatModes[i] = u.chatModes[i] || {}, "emote-only" in e && (u.chatModes[i].emoteOnly = e["emote-only"]), "followers-only" in e && (u.chatModes[i].followerOnly = 0 <= e["followers-only"]), "subs-only" in e && (u.chatModes[i].subOnly = e["subs-only"]), "r9k" in e && (u.chatModes[i].r9kMode = e.r9k), "slow" in e && (u.chatModes[i].slowMode = e.slow), u.onChatMode(u.chatModes[i], i)
                            } catch (t) {
                                console.log("Error:", t)
                            }
                        }), s.on("message", function(e, i, r, o) {
                            try {
                                var s = i["display-name"] || i.username || t,
                                    a = "#" + i.username === e,
                                    h = i.mod,
                                    l = i.badges && "0" === i.badges.founder,
                                    c = l || i.badges && void 0 !== i.badges.subscriber || i.subscriber,
                                    d = i.badges && "1" === i.badges.vip || !1,
                                    p = "highlighted-message" === i["msg-id"],
                                    f = i["user-id"],
                                    m = i.id,
                                    g = i["room-id"],
                                    v = i.badges,
                                    y = i.color,
                                    _ = i.emotes,
                                    b = i["emote-only"] || !1,
                                    x = i["message-type"],
                                    w = i["custom-reward-id"] || null,
                                    T = {
                                        broadcaster: a,
                                        mod: h,
                                        founder: l,
                                        subscriber: c,
                                        vip: d,
                                        highlighted: p,
                                        customReward: !!w
                                    },
                                    S = {
                                        id: m,
                                        channel: e.replace("#", ""),
                                        roomId: g,
                                        messageType: x,
                                        messageEmotes: _,
                                        isEmoteOnly: b,
                                        userId: f,
                                        username: i.username,
                                        displayName: i["display-name"],
                                        userColor: y,
                                        userBadges: v,
                                        customRewardId: w
                                    };
                                if (o || "!" !== r[0]) "action" === x || "chat" === x ? u.onChat(s, r, T, o, S) : "whisper" === x && u.onWhisper(s, r, T, o, S);
                                else {
                                    var E = r.split(/ (.*)/),
                                        P = E[0].slice(1).toLowerCase(),
                                        I = E[1] || "";
                                    S.sinceLastCommand = function(t, e) {
                                        if (!t) return {
                                            any: null,
                                            user: null
                                        };
                                        var i = new Date,
                                            r = {};
                                        return n.global[t] ? r.any = i - n.global[t] : r.any = 0, n.global[t] = i, e ? (n.users[e] || (n.users[e] = {}), n.users[e][t] ? r.user = i - n.users[e][t] : r.user = 0, n.users[e][t] = i) : r.user = null, r
                                    }(P, f), u.onCommand(s, P, I, T, S)
                                }
                            } catch (e) {
                                console.log("Error:", e)
                            }
                        }), s.on("messagedeleted", function(t, e, i, r) {
                            try {
                                var n = r["target-msg-id"],
                                    o = {
                                        id: n,
                                        roomId: r["room-id"],
                                        username: e,
                                        message: i
                                    };
                                u.onMessageDeleted(n, o)
                            } catch (t) {
                                console.log("Error:", t)
                            }
                        }), s.on("join", function(t, e, i) {
                            u.onJoin(e, i)
                        }), s.on("part", function(t, e, i) {
                            u.onPart(e, i)
                        }), s.on("hosted", function(t, e, i, r) {
                            u.onHosted(e, i, r)
                        }), s.on("raided", function(t, e, i) {
                            u.onRaid(e, i)
                        }), s.on("cheer", function(t, e, i) {
                            var r = ~~e.bits,
                                n = {
                                    id: e.id,
                                    username: e.login,
                                    userColor: e.color,
                                    userBadges: e.badges,
                                    displayName: e["display-name"],
                                    messageEmotes: e.emotes,
                                    subscriber: e.subscriber
                                };
                            u.onCheer(i, r, n)
                        }), s.on("subscription", function(t, e, i, r, n) {
                            var o = {
                                id: n.id,
                                roomId: n["room-id"],
                                messageType: n["message-type"],
                                messageEmotes: n.emotes,
                                userId: n["user-id"],
                                username: n.login,
                                displayName: n["display-name"],
                                userColor: n.color,
                                userBadges: n.badges
                            };
                            u.onSub(e, r, i, o)
                        }), s.on("resub", function(t, e, i, r, n, o) {
                            var s = ~~n["msg-param-cumulative-months"],
                                a = {
                                    id: n.id,
                                    roomId: n["room-id"],
                                    messageType: n["message-type"],
                                    messageEmotes: n.emotes,
                                    userId: n["user-id"],
                                    username: n.login,
                                    displayName: n["display-name"],
                                    userColor: n.color,
                                    userBadges: n.badges
                                };
                            u.onResub(e, r, i, s, o, a)
                        }), s.on("subgift", function(t, e, i, r, n, o) {
                            var s = ~~o["msg-param-sender-count"],
                                a = {
                                    id: o.id,
                                    roomId: o["room-id"],
                                    messageType: o["message-type"],
                                    messageEmotes: o.emotes,
                                    userId: o["user-id"],
                                    username: o.login,
                                    displayName: o["display-name"],
                                    userColor: o.color,
                                    userBadges: o.badges,
                                    recipientDisplayName: o["msg-param-recipient-display-name"],
                                    recipientUsername: o["msg-param-recipient-user-name"],
                                    recipientId: o["msg-param-recipient-id"]
                                };
                            u.onSubGift(e, i, r, s, n, a)
                        }), s.on("submysterygift", function(t, e, i, r, n) {
                            var o = ~~n["msg-param-sender-count"],
                                s = {
                                    id: n.id,
                                    roomId: n["room-id"],
                                    messageType: n["message-type"],
                                    messageEmotes: n.emotes,
                                    userId: n["user-id"],
                                    username: n.login,
                                    displayName: n["display-name"],
                                    userColor: n.color,
                                    userBadges: n.badges,
                                    recipientDisplayName: n["msg-param-recipient-display-name"],
                                    recipientUsername: n["msg-param-recipient-user-name"],
                                    recipientId: n["msg-param-recipient-id"],
                                    userMassGiftCount: ~~n["msg-param-mass-gift-count"]
                                };
                            u.onSubMysteryGift(e, i, o, r, s)
                        }), s.on("giftpaidupgrade", function(t, e, i, r) {
                            var n = {
                                id: r.id,
                                roomId: r["room-id"],
                                messageType: r["message-type"],
                                messageEmotes: r.emotes,
                                userId: r["user-id"],
                                username: r.login,
                                displayName: r["display-name"],
                                userColor: r.color,
                                userBadges: r.badges,
                                gifterUsername: r["msg-param-sender-login"],
                                gifterDisplayName: r["msg-param-sender-name"]
                            };
                            u.onGiftSubContinue(e, i, n)
                        }), s.on("connected", function(t, e) {
                            console.log("Connected:" + t + ":" + e), u.onConnected(t, e, a), a = !1
                        }), s.on("reconnect", function() {
                            console.log("Reconnecting"), h++, u.onReconnect(h)
                        }), s.connect().catch(function(t) {
                            console.log("Error:", t)
                        })
                    }
                };
            void 0 !== e && e.exports && (e.exports = u), "undefined" != typeof window && (window.ComfyJS = u, r = window.tmi)
        }, {
            "tmi.js": 2
        }],
        2: [function(t, e, i) {
            (function(e) {
                ! function e(i, r, n) {
                    function o(a, h) {
                        if (!r[a]) {
                            if (!i[a]) {
                                var u = "function" == typeof t && t;
                                if (!h && u) return u(a, !0);
                                if (s) return s(a, !0);
                                var l = new Error("Cannot find module '" + a + "'");
                                throw l.code = "MODULE_NOT_FOUND", l
                            }
                            var c = r[a] = {
                                exports: {}
                            };
                            i[a][0].call(c.exports, function(t) {
                                return o(i[a][1][t] || t)
                            }, c, c.exports, e, i, r, n)
                        }
                        return r[a].exports
                    }
                    for (var s = "function" == typeof t && t, a = 0; a < n.length; a++) o(n[a]);
                    return o
                }({
                    1: [function(t, e, i) {
                        "use strict";
                        e.exports = {
                            client: t("./lib/client"),
                            Client: t("./lib/client")
                        }
                    }, {
                        "./lib/client": 3
                    }],
                    2: [function(t, e, i) {
                        "use strict";
                        var r = t("request"),
                            n = t("./utils");
                        e.exports = function(t, e) {
                            var i = null === n.get(t.url, null) ? n.get(t.uri, null) : n.get(t.url, null);
                            if (n.isURL(i) || (i = "https://api.twitch.tv/kraken" + ("/" === i[0] ? i : "/" + i)), n.isNode()) r(n.merge({
                                method: "GET",
                                json: !0
                            }, t, {
                                url: i
                            }), e);
                            else if (n.isExtension()) {
                                t = n.merge({
                                    url: i,
                                    method: "GET",
                                    headers: {}
                                }, t);
                                var o = new XMLHttpRequest;
                                for (var s in o.open(t.method, t.url, !0), t.headers) o.setRequestHeader(s, t.headers[s]);
                                o.responseType = "json", o.addEventListener("load", function(t) {
                                    4 == o.readyState && (200 != o.status ? e(o.status, null, null) : e(null, null, o.response))
                                }), o.send()
                            } else {
                                var a = "jsonp_callback_" + Math.round(1e5 * Math.random());
                                window[a] = function(t) {
                                    delete window[a], document.body.removeChild(h), e(null, null, t)
                                };
                                var h = document.createElement("script");
                                h.src = i + (i.includes("?") ? "&" : "?") + "callback=" + a, document.body.appendChild(h)
                            }
                        }
                    }, {
                        "./utils": 10,
                        request: 11
                    }],
                    3: [function(t, i, r) {
                        (function(e) {
                            "use strict";
                            var r = t("./api"),
                                n = t("./commands"),
                                o = t("./events").EventEmitter,
                                s = t("./logger"),
                                a = t("./parser"),
                                h = t("./timer"),
                                u = t("./extra-utils"),
                                l = e.WebSocket || e.MozWebSocket || t("ws"),
                                c = t("./utils"),
                                d = function t(e) {
                                    if (this instanceof t == 0) return new t(e);
                                    this.setMaxListeners(0), this.opts = c.get(e, {}), this.opts.channels = this.opts.channels || [], this.opts.connection = this.opts.connection || {}, this.opts.identity = this.opts.identity || {}, this.opts.options = this.opts.options || {}, this.clientId = c.get(this.opts.options.clientId, null), this.maxReconnectAttempts = c.get(this.opts.connection.maxReconnectAttempts, 1 / 0), this.maxReconnectInterval = c.get(this.opts.connection.maxReconnectInterval, 3e4), this.reconnect = c.get(this.opts.connection.reconnect, !1), this.reconnectDecay = c.get(this.opts.connection.reconnectDecay, 1.5), this.reconnectInterval = c.get(this.opts.connection.reconnectInterval, 1e3), this.reconnecting = !1, this.reconnections = 0, this.reconnectTimer = this.reconnectInterval, this.secure = c.get(this.opts.connection.secure, !1), this.emotes = "", this.emotesets = {}, this.channels = [], this.currentLatency = 0, this.globaluserstate = {}, this.lastJoined = "", this.latency = new Date, this.moderators = {}, this.pingLoop = null, this.pingTimeout = null, this.reason = "", this.username = "", this.userstate = {}, this.wasCloseCalled = !1, this.ws = null;
                                    var i = "error";
                                    this.opts.options.debug && (i = "info"), this.log = this.opts.logger || s;
                                    try {
                                        s.setLevel(i)
                                    } catch (t) {}
                                    this.opts.channels.forEach(function(t, e, i) {
                                        i[e] = c.channel(t)
                                    }), o.call(this)
                                };
                            for (var p in c.inherits(d, o), d.prototype.api = r, n) d.prototype[p] = n[p];
                            d.prototype.handleMessage = function(t) {
                                var e = this;
                                if (!c.isNull(t)) {
                                    this.emit("raw_message", JSON.parse(JSON.stringify(t)), t);
                                    var i = c.channel(c.get(t.params[0], null)),
                                        r = c.get(t.params[1], null),
                                        n = c.get(t.tags["msg-id"], null);
                                    if (t.tags = a.badges(a.emotes(t.tags)), t.tags)
                                        for (var o in t.tags) "emote-sets" !== o && "ban-duration" !== o && "bits" !== o && (c.isBoolean(t.tags[o]) ? t.tags[o] = null : "1" === t.tags[o] ? t.tags[o] = !0 : "0" === t.tags[o] && (t.tags[o] = !1));
                                    if (c.isNull(t.prefix)) switch (t.command) {
                                        case "PING":
                                            this.emit("ping"), c.isNull(this.ws) || 2 === this.ws.readyState || 3 === this.ws.readyState || this.ws.send("PONG");
                                            break;
                                        case "PONG":
                                            var s = new Date;
                                            this.currentLatency = (s.getTime() - this.latency.getTime()) / 1e3, this.emits(["pong", "_promisePing"], [
                                                [this.currentLatency]
                                            ]), clearTimeout(this.pingTimeout);
                                            break;
                                        default:
                                            this.log.warn("Could not parse message with no prefix:\n" + JSON.stringify(t, null, 4))
                                    } else if ("tmi.twitch.tv" === t.prefix) switch (t.command) {
                                        case "002":
                                        case "003":
                                        case "004":
                                        case "375":
                                        case "376":
                                        case "CAP":
                                            break;
                                        case "001":
                                            this.username = t.params[0];
                                            break;
                                        case "372":
                                            this.log.info("Connected to server."), this.userstate["#tmijs"] = {}, this.emits(["connected", "_promiseConnect"], [
                                                [this.server, this.port],
                                                [null]
                                            ]), this.reconnections = 0, this.reconnectTimer = this.reconnectInterval, this.pingLoop = setInterval(function() {
                                                c.isNull(e.ws) || 2 === e.ws.readyState || 3 === e.ws.readyState || e.ws.send("PING"), e.latency = new Date, e.pingTimeout = setTimeout(function() {
                                                    c.isNull(e.ws) || (e.wasCloseCalled = !1, e.log.error("Ping timeout."), e.ws.close(), clearInterval(e.pingLoop), clearTimeout(e.pingTimeout))
                                                }, c.get(e.opts.connection.timeout, 9999))
                                            }, 6e4);
                                            var u = new h.queue(2e3),
                                                l = c.union(this.opts.channels, this.channels);
                                            this.channels = [];
                                            for (var d = 0; d < l.length; d++) {
                                                var p = this;
                                                u.add(function(t) {
                                                    c.isNull(p.ws) || 2 === p.ws.readyState || 3 === p.ws.readyState || p.ws.send("JOIN " + c.channel(l[t]))
                                                }.bind(this, d))
                                            }
                                            u.run();
                                            break;
                                        case "NOTICE":
                                            var f = [null],
                                                m = [i, n, r],
                                                g = [i, !0],
                                                v = [i, !1],
                                                y = [m, f],
                                                _ = [m, [n]],
                                                b = "[" + i + "] " + r;
                                            switch (n) {
                                                case "subs_on":
                                                    this.log.info("[" + i + "] This room is now in subscribers-only mode."), this.emits(["subscriber", "subscribers", "_promiseSubscribers"], [g, g, f]);
                                                    break;
                                                case "subs_off":
                                                    this.log.info("[" + i + "] This room is no longer in subscribers-only mode."), this.emits(["subscriber", "subscribers", "_promiseSubscribersoff"], [v, v, f]);
                                                    break;
                                                case "emote_only_on":
                                                    this.log.info("[" + i + "] This room is now in emote-only mode."), this.emits(["emoteonly", "_promiseEmoteonly"], [g, f]);
                                                    break;
                                                case "emote_only_off":
                                                    this.log.info("[" + i + "] This room is no longer in emote-only mode."), this.emits(["emoteonly", "_promiseEmoteonlyoff"], [v, f]);
                                                    break;
                                                case "slow_on":
                                                case "slow_off":
                                                    break;
                                                case "followers_on_zero":
                                                case "followers_on":
                                                case "followers_off":
                                                    break;
                                                case "r9k_on":
                                                    this.log.info("[" + i + "] This room is now in r9k mode."), this.emits(["r9kmode", "r9kbeta", "_promiseR9kbeta"], [g, g, f]);
                                                    break;
                                                case "r9k_off":
                                                    this.log.info("[" + i + "] This room is no longer in r9k mode."), this.emits(["r9kmode", "r9kbeta", "_promiseR9kbetaoff"], [v, v, f]);
                                                    break;
                                                case "room_mods":
                                                    var x = r.split(": ")[1].toLowerCase().split(", ").filter(function(t) {
                                                        return t
                                                    });
                                                    this.emits(["_promiseMods", "mods"], [
                                                        [null, x],
                                                        [i, x]
                                                    ]);
                                                    break;
                                                case "no_mods":
                                                    this.emits(["_promiseMods", "mods"], [
                                                        [null, []],
                                                        [i, []]
                                                    ]);
                                                    break;
                                                case "vips_success":
                                                    r.endsWith(".") && (r = r.slice(0, -1));
                                                    var w = r.split(": ")[1].toLowerCase().split(", ").filter(function(t) {
                                                        return t
                                                    });
                                                    this.emits(["_promiseVips", "vips"], [
                                                        [null, w],
                                                        [i, w]
                                                    ]);
                                                    break;
                                                case "no_vips":
                                                    this.emits(["_promiseVips", "vips"], [
                                                        [null, []],
                                                        [i, []]
                                                    ]);
                                                    break;
                                                case "already_banned":
                                                case "bad_ban_admin":
                                                case "bad_ban_broadcaster":
                                                case "bad_ban_global_mod":
                                                case "bad_ban_self":
                                                case "bad_ban_staff":
                                                case "usage_ban":
                                                    this.log.info(b), this.emits(["notice", "_promiseBan"], _);
                                                    break;
                                                case "ban_success":
                                                    this.log.info(b), this.emits(["notice", "_promiseBan"], y);
                                                    break;
                                                case "usage_clear":
                                                    this.log.info(b), this.emits(["notice", "_promiseClear"], _);
                                                    break;
                                                case "usage_mods":
                                                    this.log.info(b), this.emits(["notice", "_promiseMods"], [m, [n, []]]);
                                                    break;
                                                case "mod_success":
                                                    this.log.info(b), this.emits(["notice", "_promiseMod"], y);
                                                    break;
                                                case "usage_vips":
                                                    this.log.info(b), this.emits(["notice", "_promiseVips"], [m, [n, []]]);
                                                    break;
                                                case "usage_vip":
                                                case "bad_vip_grantee_banned":
                                                case "bad_vip_grantee_already_vip":
                                                    this.log.info(b), this.emits(["notice", "_promiseVip"], [m, [n, []]]);
                                                    break;
                                                case "vip_success":
                                                    this.log.info(b), this.emits(["notice", "_promiseVip"], y);
                                                    break;
                                                case "usage_mod":
                                                case "bad_mod_banned":
                                                case "bad_mod_mod":
                                                    this.log.info(b), this.emits(["notice", "_promiseMod"], _);
                                                    break;
                                                case "unmod_success":
                                                    this.log.info(b), this.emits(["notice", "_promiseUnmod"], y);
                                                    break;
                                                case "unvip_success":
                                                    this.log.info(b), this.emits(["notice", "_promiseUnvip"], y);
                                                    break;
                                                case "usage_unmod":
                                                case "bad_unmod_mod":
                                                    this.log.info(b), this.emits(["notice", "_promiseUnmod"], _);
                                                    break;
                                                case "usage_unvip":
                                                case "bad_unvip_grantee_not_vip":
                                                    this.log.info(b), this.emits(["notice", "_promiseUnvip"], _);
                                                    break;
                                                case "color_changed":
                                                    this.log.info(b), this.emits(["notice", "_promiseColor"], y);
                                                    break;
                                                case "usage_color":
                                                case "turbo_only_color":
                                                    this.log.info(b), this.emits(["notice", "_promiseColor"], _);
                                                    break;
                                                case "commercial_success":
                                                    this.log.info(b), this.emits(["notice", "_promiseCommercial"], y);
                                                    break;
                                                case "usage_commercial":
                                                case "bad_commercial_error":
                                                    this.log.info(b), this.emits(["notice", "_promiseCommercial"], _);
                                                    break;
                                                case "hosts_remaining":
                                                    this.log.info(b);
                                                    var T = isNaN(r[0]) ? 0 : parseInt(r[0]);
                                                    this.emits(["notice", "_promiseHost"], [m, [null, ~~T]]);
                                                    break;
                                                case "bad_host_hosting":
                                                case "bad_host_rate_exceeded":
                                                case "bad_host_error":
                                                case "usage_host":
                                                    this.log.info(b), this.emits(["notice", "_promiseHost"], [m, [n, null]]);
                                                    break;
                                                case "already_r9k_on":
                                                case "usage_r9k_on":
                                                    this.log.info(b), this.emits(["notice", "_promiseR9kbeta"], _);
                                                    break;
                                                case "already_r9k_off":
                                                case "usage_r9k_off":
                                                    this.log.info(b), this.emits(["notice", "_promiseR9kbetaoff"], _);
                                                    break;
                                                case "timeout_success":
                                                    this.log.info(b), this.emits(["notice", "_promiseTimeout"], y);
                                                    break;
                                                case "delete_message_success":
                                                    this.log.info("[" + i + " " + r + "]"), this.emits(["notice", "_promiseDeletemessage"], y);
                                                case "already_subs_off":
                                                case "usage_subs_off":
                                                    this.log.info(b), this.emits(["notice", "_promiseSubscribersoff"], _);
                                                    break;
                                                case "already_subs_on":
                                                case "usage_subs_on":
                                                    this.log.info(b), this.emits(["notice", "_promiseSubscribers"], _);
                                                    break;
                                                case "already_emote_only_off":
                                                case "usage_emote_only_off":
                                                    this.log.info(b), this.emits(["notice", "_promiseEmoteonlyoff"], _);
                                                    break;
                                                case "already_emote_only_on":
                                                case "usage_emote_only_on":
                                                    this.log.info(b), this.emits(["notice", "_promiseEmoteonly"], _);
                                                    break;
                                                case "usage_slow_on":
                                                    this.log.info(b), this.emits(["notice", "_promiseSlow"], _);
                                                    break;
                                                case "usage_slow_off":
                                                    this.log.info(b), this.emits(["notice", "_promiseSlowoff"], _);
                                                    break;
                                                case "usage_timeout":
                                                case "bad_timeout_admin":
                                                case "bad_timeout_broadcaster":
                                                case "bad_timeout_duration":
                                                case "bad_timeout_global_mod":
                                                case "bad_timeout_self":
                                                case "bad_timeout_staff":
                                                    this.log.info(b), this.emits(["notice", "_promiseTimeout"], _);
                                                    break;
                                                case "untimeout_success":
                                                case "unban_success":
                                                    this.log.info(b), this.emits(["notice", "_promiseUnban"], y);
                                                    break;
                                                case "usage_unban":
                                                case "bad_unban_no_ban":
                                                    this.log.info(b), this.emits(["notice", "_promiseUnban"], _);
                                                    break;
                                                case "usage_delete":
                                                case "bad_delete_message_error":
                                                case "bad_delete_message_broadcaster":
                                                case "bad_delete_message_mod":
                                                    this.log.info(b), this.emits(["notice", "_promiseDeletemessage"], _);
                                                    break;
                                                case "usage_unhost":
                                                case "not_hosting":
                                                    this.log.info(b), this.emits(["notice", "_promiseUnhost"], _);
                                                    break;
                                                case "whisper_invalid_login":
                                                case "whisper_invalid_self":
                                                case "whisper_limit_per_min":
                                                case "whisper_limit_per_sec":
                                                case "whisper_restricted_recipient":
                                                    this.log.info(b), this.emits(["notice", "_promiseWhisper"], _);
                                                    break;
                                                case "no_permission":
                                                case "msg_banned":
                                                case "msg_room_not_found":
                                                case "msg_channel_suspended":
                                                case "tos_ban":
                                                    this.log.info(b), this.emits(["notice", "_promiseBan", "_promiseClear", "_promiseUnban", "_promiseTimeout", "_promiseDeletemessage", "_promiseMods", "_promiseMod", "_promiseUnmod", "_promiseVips", "_promiseVip", "_promiseUnvip", "_promiseCommercial", "_promiseHost", "_promiseUnhost", "_promiseJoin", "_promisePart", "_promiseR9kbeta", "_promiseR9kbetaoff", "_promiseSlow", "_promiseSlowoff", "_promiseFollowers", "_promiseFollowersoff", "_promiseSubscribers", "_promiseSubscribersoff", "_promiseEmoteonly", "_promiseEmoteonlyoff"], _);
                                                    break;
                                                case "unrecognized_cmd":
                                                    this.log.info(b), this.emit("notice", i, n, r), "/w" === r.split(" ").splice(-1)[0] && this.log.warn("You must be connected to a group server to send or receive whispers.");
                                                    break;
                                                case "cmds_available":
                                                case "host_target_went_offline":
                                                case "msg_censored_broadcaster":
                                                case "msg_duplicate":
                                                case "msg_emoteonly":
                                                case "msg_verified_email":
                                                case "msg_ratelimit":
                                                case "msg_subsonly":
                                                case "msg_timedout":
                                                case "msg_bad_characters":
                                                case "msg_channel_blocked":
                                                case "msg_facebook":
                                                case "msg_followersonly":
                                                case "msg_followersonly_followed":
                                                case "msg_followersonly_zero":
                                                case "msg_rejected":
                                                case "msg_slowmode":
                                                case "msg_suspended":
                                                case "no_help":
                                                case "usage_disconnect":
                                                case "usage_help":
                                                case "usage_me":
                                                    this.log.info(b), this.emit("notice", i, n, r);
                                                    break;
                                                case "host_on":
                                                case "host_off":
                                                    break;
                                                default:
                                                    r.includes("Login unsuccessful") || r.includes("Login authentication failed") ? (this.wasCloseCalled = !1, this.reconnect = !1, this.reason = r, this.log.error(this.reason), this.ws.close()) : r.includes("Error logging in") || r.includes("Improperly formatted auth") ? (this.wasCloseCalled = !1, this.reconnect = !1, this.reason = r, this.log.error(this.reason), this.ws.close()) : r.includes("Invalid NICK") ? (this.wasCloseCalled = !1, this.reconnect = !1, this.reason = "Invalid NICK.", this.log.error(this.reason), this.ws.close()) : this.log.warn("Could not parse NOTICE from tmi.twitch.tv:\n" + JSON.stringify(t, null, 4))
                                            }
                                            break;
                                        case "USERNOTICE":
                                            var S = t.tags["display-name"] || t.tags.login,
                                                E = t.tags["msg-param-sub-plan"] || "",
                                                P = c.unescapeIRC(c.get(t.tags["msg-param-sub-plan-name"], "")) || null,
                                                I = E.includes("Prime"),
                                                C = t.tags,
                                                A = ~~(t.tags["msg-param-streak-months"] || 0),
                                                M = t.tags["msg-param-recipient-display-name"] || t.tags["msg-param-recipient-user-name"],
                                                O = ~~t.tags["msg-param-mass-gift-count"],
                                                R = {
                                                    prime: I,
                                                    plan: E,
                                                    planName: P
                                                };
                                            switch (C["message-type"] = n) {
                                                case "resub":
                                                    this.emits(["resub", "subanniversary"], [
                                                        [i, S, A, r, C, R]
                                                    ]);
                                                    break;
                                                case "sub":
                                                    this.emit("subscription", i, S, R, r, C);
                                                    break;
                                                case "subgift":
                                                    this.emit("subgift", i, S, A, M, R, C);
                                                    break;
                                                case "anonsubgift":
                                                    this.emit("anonsubgift", i, A, M, R, C);
                                                    break;
                                                case "submysterygift":
                                                    this.emit("submysterygift", i, S, O, R, C);
                                                    break;
                                                case "anonsubmysterygift":
                                                    this.emit("anonsubmysterygift", i, O, R, C);
                                                    break;
                                                case "giftpaidupgrade":
                                                    var D = t.tags["msg-param-sender-name"] || t.tags["msg-param-sender-login"];
                                                    this.emit("giftpaidupgrade", i, S, D, C);
                                                    break;
                                                case "anongiftpaidupgrade":
                                                    this.emit("anongiftpaidupgrade", i, S, C);
                                                    break;
                                                case "raid":
                                                    S = t.tags["msg-param-displayName"] || t.tags["msg-param-login"];
                                                    var F = t.tags["msg-param-viewerCount"];
                                                    this.emit("raided", i, S, F)
                                            }
                                            break;
                                        case "HOSTTARGET":
                                            var L = r.split(" ");
                                            F = ~~L[1] || 0, "-" === L[0] ? (this.log.info("[" + i + "] Exited host mode."), this.emits(["unhost", "_promiseUnhost"], [
                                                [i, F],
                                                [null]
                                            ])) : (this.log.info("[" + i + "] Now hosting " + L[0] + " for " + F + " viewer(s)."), this.emit("hosting", i, L[0], F));
                                            break;
                                        case "CLEARCHAT":
                                            if (1 < t.params.length) {
                                                var B = c.get(t.tags["ban-duration"], null);
                                                c.isNull(B) ? (this.log.info("[" + i + "] " + r + " has been banned."), this.emit("ban", i, r, null, t.tags)) : (this.log.info("[" + i + "] " + r + " has been timed out for " + B + " seconds."), this.emit("timeout", i, r, null, ~~B, t.tags))
                                            } else this.log.info("[" + i + "] Chat was cleared by a moderator."), this.emits(["clearchat", "_promiseClear"], [
                                                [i],
                                                [null]
                                            ]);
                                            break;
                                        case "CLEARMSG":
                                            if (1 < t.params.length) {
                                                S = t.tags.login;
                                                var k = r;
                                                (C = t.tags)["message-type"] = "messagedeleted", this.log.info("[" + i + "] " + S + "'s message has been deleted."), this.emit("messagedeleted", i, S, k, C)
                                            }
                                            break;
                                        case "RECONNECT":
                                            this.log.info("Received RECONNECT request from Twitch.."), this.log.info("Disconnecting and reconnecting in " + Math.round(this.reconnectTimer / 1e3) + " seconds.."), this.disconnect(), setTimeout(function() {
                                                e.connect()
                                            }, this.reconnectTimer);
                                            break;
                                        case "SERVERCHANGE":
                                            break;
                                        case "USERSTATE":
                                            t.tags.username = this.username, "mod" === t.tags["user-type"] && (this.moderators[this.lastJoined] || (this.moderators[this.lastJoined] = []), this.moderators[this.lastJoined].includes(this.username) || this.moderators[this.lastJoined].push(this.username)), c.isJustinfan(this.getUsername()) || this.userstate[i] || (this.userstate[i] = t.tags, this.lastJoined = i, this.channels.push(i), this.log.info("Joined " + i), this.emit("join", i, c.username(this.getUsername()), !0)), t.tags["emote-sets"] !== this.emotes && this._updateEmoteset(t.tags["emote-sets"]), this.userstate[i] = t.tags;
                                            break;
                                        case "GLOBALUSERSTATE":
                                            this.globaluserstate = t.tags, void 0 !== t.tags["emote-sets"] && this._updateEmoteset(t.tags["emote-sets"]);
                                            break;
                                        case "ROOMSTATE":
                                            if (c.channel(this.lastJoined) === c.channel(t.params[0]) && this.emit("_promiseJoin", null), t.tags.channel = c.channel(t.params[0]), this.emit("roomstate", c.channel(t.params[0]), t.tags), !t.tags.hasOwnProperty("subs-only")) {
                                                if (t.tags.hasOwnProperty("slow"))
                                                    if ("boolean" != typeof t.tags.slow || t.tags.slow) {
                                                        var N = ~~t.tags.slow;
                                                        this.log.info("[" + i + "] This room is now in slow mode."), this.emits(["slow", "slowmode", "_promiseSlow"], [
                                                            [i, !0, N],
                                                            [i, !0, N],
                                                            [null]
                                                        ])
                                                    } else this.log.info("[" + i + "] This room is no longer in slow mode."), this.emits(["slow", "slowmode", "_promiseSlowoff"], [
                                                        [i, !1, 0],
                                                        [i, !1, 0],
                                                        [null]
                                                    ]);
                                                t.tags.hasOwnProperty("followers-only") && ("-1" === t.tags["followers-only"] ? (this.log.info("[" + i + "] This room is no longer in followers-only mode."), this.emits(["followersonly", "followersmode", "_promiseFollowersoff"], [
                                                    [i, !1, 0],
                                                    [i, !1, 0],
                                                    [null]
                                                ])) : (N = ~~t.tags["followers-only"], this.log.info("[" + i + "] This room is now in follower-only mode."), this.emits(["followersonly", "followersmode", "_promiseFollowers"], [
                                                    [i, !0, N],
                                                    [i, !0, N],
                                                    [null]
                                                ])))
                                            }
                                            break;
                                        default:
                                            this.log.warn("Could not parse message from tmi.twitch.tv:\n" + JSON.stringify(t, null, 4))
                                    } else if ("jtv" === t.prefix) switch (t.command) {
                                        case "MODE":
                                            "+o" === r ? (this.moderators[i] || (this.moderators[i] = []), this.moderators[i].includes(t.params[2]) || this.moderators[i].push(t.params[2]), this.emit("mod", i, t.params[2])) : "-o" === r && (this.moderators[i] || (this.moderators[i] = []), this.moderators[i].filter(function(e) {
                                                return e != t.params[2]
                                            }), this.emit("unmod", i, t.params[2]));
                                            break;
                                        default:
                                            this.log.warn("Could not parse message from jtv:\n" + JSON.stringify(t, null, 4))
                                    } else switch (t.command) {
                                        case "353":
                                            this.emit("names", t.params[2], t.params[3].split(" "));
                                            break;
                                        case "366":
                                            break;
                                        case "JOIN":
                                            var U = t.prefix.split("!")[0];
                                            c.isJustinfan(this.getUsername()) && this.username === U && (this.lastJoined = i, this.channels.push(i), this.log.info("Joined " + i), this.emit("join", i, U, !0)), this.username !== U && this.emit("join", i, U, !1);
                                            break;
                                        case "PART":
                                            var j, X = !1;
                                            U = t.prefix.split("!")[0], this.username === U && (X = !0, this.userstate[i] && delete this.userstate[i], -1 !== (j = this.channels.indexOf(i)) && this.channels.splice(j, 1), -1 !== (j = this.opts.channels.indexOf(i)) && this.opts.channels.splice(j, 1), this.log.info("Left " + i), this.emit("_promisePart", null)), this.emit("part", i, U, X);
                                            break;
                                        case "WHISPER":
                                            U = t.prefix.split("!")[0], this.log.info("[WHISPER] <" + U + ">: " + r), t.tags.hasOwnProperty("username") || (t.tags.username = U), t.tags["message-type"] = "whisper";
                                            var G = c.channel(t.tags.username);
                                            this.emits(["whisper", "message"], [
                                                [G, t.tags, r, !1]
                                            ]);
                                            break;
                                        case "PRIVMSG":
                                            if (t.tags.username = t.prefix.split("!")[0], "jtv" === t.tags.username) {
                                                var V = c.username(r.split(" ")[0]),
                                                    H = r.includes("auto");
                                                if (r.includes("hosting you for")) {
                                                    var z = c.extractNumber(r);
                                                    this.emit("hosted", i, V, z, H)
                                                } else r.includes("hosting you") && this.emit("hosted", i, V, 0, H)
                                            } else {
                                                var W = c.actionMessage(r);
                                                W ? (t.tags["message-type"] = "action", this.log.info("[" + i + "] *<" + t.tags.username + ">: " + W[1]), this.emits(["action", "message"], [
                                                    [i, t.tags, W[1], !1]
                                                ])) : t.tags.hasOwnProperty("bits") ? this.emit("cheer", i, t.tags, r) : (t.tags["message-type"] = "chat", this.log.info("[" + i + "] <" + t.tags.username + ">: " + r), this.emits(["chat", "message"], [
                                                    [i, t.tags, r, !1]
                                                ]))
                                            }
                                            break;
                                        default:
                                            this.log.warn("Could not parse message:\n" + JSON.stringify(t, null, 4))
                                    }
                                }
                            }, d.prototype.connect = function() {
                                var t = this;
                                return new Promise(function(e, i) {
                                    t.server = c.get(t.opts.connection.server, "irc-ws.chat.twitch.tv"), t.port = c.get(t.opts.connection.port, 80), t.secure && (t.port = 443), 443 === t.port && (t.secure = !0), t.reconnectTimer = t.reconnectTimer * t.reconnectDecay, t.reconnectTimer >= t.maxReconnectInterval && (t.reconnectTimer = t.maxReconnectInterval), t._openConnection(), t.once("_promiseConnect", function(r) {
                                        r ? i(r) : e([t.server, ~~t.port])
                                    })
                                })
                            }, d.prototype._openConnection = function() {
                                this.ws = new l((this.secure ? "wss" : "ws") + "://" + this.server + ":" + this.port + "/", "irc"), this.ws.onmessage = this._onMessage.bind(this), this.ws.onerror = this._onError.bind(this), this.ws.onclose = this._onClose.bind(this), this.ws.onopen = this._onOpen.bind(this)
                            }, d.prototype._onOpen = function() {
                                c.isNull(this.ws) || 1 !== this.ws.readyState || (this.log.info("Connecting to " + this.server + " on port " + this.port + ".."), this.emit("connecting", this.server, ~~this.port), this.username = c.get(this.opts.identity.username, c.justinfan()), this.password = c.password(c.get(this.opts.identity.password, "SCHMOOPIIE")), this.log.info("Sending authentication to server.."), this.emit("logon"), this.ws.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership"), this.ws.send("PASS " + this.password), this.ws.send("NICK " + this.username), this.ws.send("USER " + this.username + " 8 * :" + this.username))
                            }, d.prototype._onMessage = function(t) {
                                var e = this;
                                t.data.split("\r\n").forEach(function(t) {
                                    c.isNull(t) || e.handleMessage(a.msg(t))
                                })
                            }, d.prototype._onError = function() {
                                var t = this;
                                this.moderators = {}, this.userstate = {}, this.globaluserstate = {}, clearInterval(this.pingLoop), clearTimeout(this.pingTimeout), this.reason = c.isNull(this.ws) ? "Connection closed." : "Unable to connect.", this.emits(["_promiseConnect", "disconnected"], [
                                    [this.reason]
                                ]), this.reconnect && this.reconnections === this.maxReconnectAttempts && (this.emit("maxreconnect"), this.log.error("Maximum reconnection attempts reached.")), this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1 && (this.reconnecting = !0, this.reconnections = this.reconnections + 1, this.log.error("Reconnecting in " + Math.round(this.reconnectTimer / 1e3) + " seconds.."), this.emit("reconnect"), setTimeout(function() {
                                    t.reconnecting = !1, t.connect()
                                }, this.reconnectTimer)), this.ws = null
                            }, d.prototype._onClose = function() {
                                var t = this;
                                this.moderators = {}, this.userstate = {}, this.globaluserstate = {}, clearInterval(this.pingLoop), clearTimeout(this.pingTimeout), this.wasCloseCalled ? (this.wasCloseCalled = !1, this.reason = "Connection closed.", this.log.info(this.reason), this.emits(["_promiseConnect", "_promiseDisconnect", "disconnected"], [
                                    [this.reason],
                                    [null],
                                    [this.reason]
                                ])) : (this.emits(["_promiseConnect", "disconnected"], [
                                    [this.reason]
                                ]), this.reconnect && this.reconnections === this.maxReconnectAttempts && (this.emit("maxreconnect"), this.log.error("Maximum reconnection attempts reached.")), this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1 && (this.reconnecting = !0, this.reconnections = this.reconnections + 1, this.log.error("Could not connect to server. Reconnecting in " + Math.round(this.reconnectTimer / 1e3) + " seconds.."), this.emit("reconnect"), setTimeout(function() {
                                    t.reconnecting = !1, t.connect()
                                }, this.reconnectTimer))), this.ws = null
                            }, d.prototype._getPromiseDelay = function() {
                                return this.currentLatency <= 600 ? 600 : this.currentLatency + 100
                            }, d.prototype._sendCommand = function(t, e, i, r) {
                                var n = this;
                                return new Promise(function(o, s) {
                                    if (c.promiseDelay(t).then(function() {
                                            s("No response from Twitch.")
                                        }), c.isNull(n.ws) || 2 === n.ws.readyState || 3 === n.ws.readyState) s("Not connected to server.");
                                    else {
                                        if (c.isNull(e)) n.log.info("Executing command: " + i), n.ws.send(i);
                                        else {
                                            var a = c.channel(e);
                                            n.log.info("[" + a + "] Executing command: " + i), n.ws.send("PRIVMSG " + a + " :" + i)
                                        }
                                        r(o, s)
                                    }
                                })
                            }, d.prototype._sendMessage = function(t, e, i, r) {
                                var n = this;
                                return new Promise(function(o, s) {
                                    if (c.isNull(n.ws) || 2 === n.ws.readyState || 3 === n.ws.readyState || c.isJustinfan(n.getUsername())) s("Not connected to server.");
                                    else {
                                        var h = c.channel(e);
                                        if (n.userstate[h] || (n.userstate[h] = {}), 500 <= i.length) {
                                            var u = c.splitLine(i, 500);
                                            i = u[0], setTimeout(function() {
                                                n._sendMessage(t, e, u[1], function() {})
                                            }, 350)
                                        }
                                        n.ws.send("PRIVMSG " + h + " :" + i);
                                        var l = {};
                                        Object.keys(n.emotesets).forEach(function(t) {
                                            n.emotesets[t].forEach(function(t) {
                                                return c.isRegex(t.code) ? a.emoteRegex(i, t.code, t.id, l) : void a.emoteString(i, t.code, t.id, l)
                                            })
                                        });
                                        var d = c.merge(n.userstate[h], a.emotes({
                                                emotes: a.transformEmotes(l) || null
                                            })),
                                            p = c.actionMessage(i);
                                        p ? (d["message-type"] = "action", n.log.info("[" + h + "] *<" + n.getUsername() + ">: " + p[1]), n.emits(["action", "message"], [
                                            [h, d, p[1], !0]
                                        ])) : (d["message-type"] = "chat", n.log.info("[" + h + "] <" + n.getUsername() + ">: " + i), n.emits(["chat", "message"], [
                                            [h, d, i, !0]
                                        ])), r(o, s)
                                    }
                                })
                            }, d.prototype._updateEmoteset = function(t) {
                                var e = this;
                                this.emotes = t, this.api({
                                    url: "/chat/emoticon_images?emotesets=" + t,
                                    headers: {
                                        Authorization: "OAuth " + c.password(c.get(this.opts.identity.password, "")).replace("oauth:", ""),
                                        "Client-ID": this.clientId
                                    }
                                }, function(i, r, n) {
                                    return i ? void setTimeout(function() {
                                        e._updateEmoteset(t)
                                    }, 6e4) : (e.emotesets = n.emoticon_sets || {}, e.emit("emotesets", t, e.emotesets))
                                })
                            }, d.prototype.getUsername = function() {
                                return this.username
                            }, d.prototype.getOptions = function() {
                                return this.opts
                            }, d.prototype.getChannels = function() {
                                return this.channels
                            }, d.prototype.isMod = function(t, e) {
                                var i = c.channel(t);
                                return this.moderators[i] || (this.moderators[i] = []), this.moderators[i].includes(c.username(e))
                            }, d.prototype.readyState = function() {
                                return c.isNull(this.ws) ? "CLOSED" : ["CONNECTING", "OPEN", "CLOSING", "CLOSED"][this.ws.readyState]
                            }, d.prototype.disconnect = function() {
                                var t = this;
                                return new Promise(function(e, i) {
                                    c.isNull(t.ws) || 3 === t.ws.readyState ? (t.log.error("Cannot disconnect from server. Socket is not opened or connection is already closing."), i("Cannot disconnect from server. Socket is not opened or connection is already closing.")) : (t.wasCloseCalled = !0, t.log.info("Disconnecting from server.."), t.ws.close(), t.once("_promiseDisconnect", function() {
                                        e([t.server, ~~t.port])
                                    }))
                                })
                            }, d.prototype.utils = u, void 0 !== i && i.exports && (i.exports = d), "undefined" != typeof window && (window.tmi = {}, window.tmi.client = d, window.tmi.Client = d)
                        }).call(this, void 0 !== e ? e : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                    }, {
                        "./api": 2,
                        "./commands": 4,
                        "./events": 5,
                        "./extra-utils": 6,
                        "./logger": 7,
                        "./parser": 8,
                        "./timer": 9,
                        "./utils": 10,
                        ws: 11
                    }],
                    4: [function(t, e, i) {
                        "use strict";

                        function r(t, e) {
                            var i = this;
                            return t = l.channel(t), e = l.get(e, 30), this._sendCommand(this._getPromiseDelay(), t, "/followers " + e, function(r, n) {
                                i.once("_promiseFollowers", function(i) {
                                    i ? n(i) : r([t, ~~e])
                                })
                            })
                        }

                        function n(t) {
                            var e = this;
                            return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/followersoff", function(i, r) {
                                e.once("_promiseFollowersoff", function(e) {
                                    e ? r(e) : i([t])
                                })
                            })
                        }

                        function o(t) {
                            var e = this;
                            return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), null, "PART " + t, function(i, r) {
                                e.once("_promisePart", function(e) {
                                    e ? r(e) : i([t])
                                })
                            })
                        }

                        function s(t) {
                            var e = this;
                            return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/r9kbeta", function(i, r) {
                                e.once("_promiseR9kbeta", function(e) {
                                    e ? r(e) : i([t])
                                })
                            })
                        }

                        function a(t) {
                            var e = this;
                            return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/r9kbetaoff", function(i, r) {
                                e.once("_promiseR9kbetaoff", function(e) {
                                    e ? r(e) : i([t])
                                })
                            })
                        }

                        function h(t, e) {
                            var i = this;
                            return t = l.channel(t), e = l.get(e, 300), this._sendCommand(this._getPromiseDelay(), t, "/slow " + e, function(r, n) {
                                i.once("_promiseSlow", function(i) {
                                    i ? n(i) : r([t, ~~e])
                                })
                            })
                        }

                        function u(t) {
                            var e = this;
                            return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/slowoff", function(i, r) {
                                e.once("_promiseSlowoff", function(e) {
                                    e ? r(e) : i([t])
                                })
                            })
                        }
                        var l = t("./utils");
                        e.exports = {
                            action: function(t, e) {
                                return t = l.channel(t), e = "ACTION " + e + "", this._sendMessage(this._getPromiseDelay(), t, e, function(i, r) {
                                    i([t, e])
                                })
                            },
                            ban: function(t, e, i) {
                                var r = this;
                                return t = l.channel(t), e = l.username(e), i = l.get(i, ""), this._sendCommand(this._getPromiseDelay(), t, "/ban " + e + " " + i, function(n, o) {
                                    r.once("_promiseBan", function(r) {
                                        r ? o(r) : n([t, e, i])
                                    })
                                })
                            },
                            clear: function(t) {
                                var e = this;
                                return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/clear", function(i, r) {
                                    e.once("_promiseClear", function(e) {
                                        e ? r(e) : i([t])
                                    })
                                })
                            },
                            color: function(t, e) {
                                var i = this;
                                return e = l.get(e, t), this._sendCommand(this._getPromiseDelay(), "#tmijs", "/color " + e, function(t, r) {
                                    i.once("_promiseColor", function(i) {
                                        i ? r(i) : t([e])
                                    })
                                })
                            },
                            commercial: function(t, e) {
                                var i = this;
                                return t = l.channel(t), e = l.get(e, 30), this._sendCommand(this._getPromiseDelay(), t, "/commercial " + e, function(r, n) {
                                    i.once("_promiseCommercial", function(i) {
                                        i ? n(i) : r([t, ~~e])
                                    })
                                })
                            },
                            deletemessage: function(t, e) {
                                var i = this;
                                return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/delete " + e, function(e, r) {
                                    i.once("_promiseDeletemessage", function(i) {
                                        i ? r(i) : e([t])
                                    })
                                })
                            },
                            emoteonly: function(t) {
                                var e = this;
                                return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/emoteonly", function(i, r) {
                                    e.once("_promiseEmoteonly", function(e) {
                                        e ? r(e) : i([t])
                                    })
                                })
                            },
                            emoteonlyoff: function(t) {
                                var e = this;
                                return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/emoteonlyoff", function(i, r) {
                                    e.once("_promiseEmoteonlyoff", function(e) {
                                        e ? r(e) : i([t])
                                    })
                                })
                            },
                            followersonly: r,
                            followersmode: r,
                            followersonlyoff: n,
                            followersmodeoff: n,
                            host: function(t, e) {
                                var i = this;
                                return t = l.channel(t), e = l.username(e), this._sendCommand(2e3, t, "/host " + e, function(r, n) {
                                    i.once("_promiseHost", function(i, o) {
                                        i ? n(i) : r([t, e, ~~o])
                                    })
                                })
                            },
                            join: function(t) {
                                var e = this;
                                return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), null, "JOIN " + t, function(i, r) {
                                    e.once("_promiseJoin", function(e) {
                                        e ? r(e) : i([t])
                                    })
                                })
                            },
                            mod: function(t, e) {
                                var i = this;
                                return t = l.channel(t), e = l.username(e), this._sendCommand(this._getPromiseDelay(), t, "/mod " + e, function(r, n) {
                                    i.once("_promiseMod", function(i) {
                                        i ? n(i) : r([t, e])
                                    })
                                })
                            },
                            mods: function(t) {
                                var e = this;
                                return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/mods", function(i, r) {
                                    e.once("_promiseMods", function(n, o) {
                                        n ? r(n) : (o.forEach(function(i) {
                                            e.moderators[t] || (e.moderators[t] = []), e.moderators[t].includes(i) || e.moderators[t].push(i)
                                        }), i(o))
                                    })
                                })
                            },
                            part: o,
                            leave: o,
                            ping: function() {
                                var t = this;
                                return this._sendCommand(this._getPromiseDelay(), null, "PING", function(e, i) {
                                    t.latency = new Date, t.pingTimeout = setTimeout(function() {
                                        null !== t.ws && (t.wasCloseCalled = !1, t.log.error("Ping timeout."), t.ws.close(), clearInterval(t.pingLoop), clearTimeout(t.pingTimeout))
                                    }, l.get(t.opts.connection.timeout, 9999)), t.once("_promisePing", function(t) {
                                        e([parseFloat(t)])
                                    })
                                })
                            },
                            r9kbeta: s,
                            r9kmode: s,
                            r9kbetaoff: a,
                            r9kmodeoff: a,
                            raw: function(t) {
                                return this._sendCommand(this._getPromiseDelay(), null, t, function(e, i) {
                                    e([t])
                                })
                            },
                            say: function(t, e) {
                                return t = l.channel(t), e.startsWith(".") && !e.startsWith("..") || e.startsWith("/") || e.startsWith("\\") ? "me " === e.substr(1, 3) ? this.action(t, e.substr(4)) : this._sendCommand(this._getPromiseDelay(), t, e, function(i, r) {
                                    i([t, e])
                                }) : this._sendMessage(this._getPromiseDelay(), t, e, function(i, r) {
                                    i([t, e])
                                })
                            },
                            slow: h,
                            slowmode: h,
                            slowoff: u,
                            slowmodeoff: u,
                            subscribers: function(t) {
                                var e = this;
                                return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/subscribers", function(i, r) {
                                    e.once("_promiseSubscribers", function(e) {
                                        e ? r(e) : i([t])
                                    })
                                })
                            },
                            subscribersoff: function(t) {
                                var e = this;
                                return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/subscribersoff", function(i, r) {
                                    e.once("_promiseSubscribersoff", function(e) {
                                        e ? r(e) : i([t])
                                    })
                                })
                            },
                            timeout: function(t, e, i, r) {
                                var n = this;
                                return t = l.channel(t), e = l.username(e), l.isNull(i) || l.isInteger(i) || (r = i, i = 300), i = l.get(i, 300), r = l.get(r, ""), this._sendCommand(this._getPromiseDelay(), t, "/timeout " + e + " " + i + " " + r, function(o, s) {
                                    n.once("_promiseTimeout", function(n) {
                                        n ? s(n) : o([t, e, ~~i, r])
                                    })
                                })
                            },
                            unban: function(t, e) {
                                var i = this;
                                return t = l.channel(t), e = l.username(e), this._sendCommand(this._getPromiseDelay(), t, "/unban " + e, function(r, n) {
                                    i.once("_promiseUnban", function(i) {
                                        i ? n(i) : r([t, e])
                                    })
                                })
                            },
                            unhost: function(t) {
                                var e = this;
                                return t = l.channel(t), this._sendCommand(2e3, t, "/unhost", function(i, r) {
                                    e.once("_promiseUnhost", function(e) {
                                        e ? r(e) : i([t])
                                    })
                                })
                            },
                            unmod: function(t, e) {
                                var i = this;
                                return t = l.channel(t), e = l.username(e), this._sendCommand(this._getPromiseDelay(), t, "/unmod " + e, function(r, n) {
                                    i.once("_promiseUnmod", function(i) {
                                        i ? n(i) : r([t, e])
                                    })
                                })
                            },
                            unvip: function(t, e) {
                                var i = this;
                                return t = l.channel(t), e = l.username(e), this._sendCommand(this._getPromiseDelay(), t, "/unvip " + e, function(r, n) {
                                    i.once("_promiseUnvip", function(i) {
                                        i ? n(i) : r([t, e])
                                    })
                                })
                            },
                            vip: function(t, e) {
                                var i = this;
                                return t = l.channel(t), e = l.username(e), this._sendCommand(this._getPromiseDelay(), t, "/vip " + e, function(r, n) {
                                    i.once("_promiseVip", function(i) {
                                        i ? n(i) : r([t, e])
                                    })
                                })
                            },
                            vips: function(t) {
                                var e = this;
                                return t = l.channel(t), this._sendCommand(this._getPromiseDelay(), t, "/vips", function(t, i) {
                                    e.once("_promiseVips", function(e, r) {
                                        e ? i(e) : t(r)
                                    })
                                })
                            },
                            whisper: function(t, e) {
                                var i = this;
                                return (t = l.username(t)) === this.getUsername() ? Promise.reject("Cannot send a whisper to the same account.") : this._sendCommand(this._getPromiseDelay(), "#tmijs", "/w " + t + " " + e, function(r, n) {
                                    var o = l.channel(t),
                                        s = l.merge({
                                            "message-type": "whisper",
                                            "message-id": null,
                                            "thread-id": null,
                                            username: i.getUsername()
                                        }, i.globaluserstate);
                                    i.emits(["whisper", "message"], [
                                        [o, s, e, !0],
                                        [o, s, e, !0]
                                    ]), r([t, e])
                                })
                            }
                        }
                    }, {
                        "./utils": 10
                    }],
                    5: [function(t, e, i) {
                        "use strict";

                        function r() {
                            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
                        }

                        function n(t) {
                            return "function" == typeof t
                        }

                        function o(t) {
                            return "object" === (void 0 === t ? "undefined" : a(t)) && null !== t
                        }

                        function s(t) {
                            return void 0 === t
                        }
                        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                            return typeof t
                        } : function(t) {
                            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                        };
                        String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
                            return e = e || 0, this.indexOf(t, e) === e
                        }), ((e.exports = r).EventEmitter = r).prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(t) {
                            if ("number" != typeof t || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
                            return this._maxListeners = t, this
                        }, r.prototype.emits = function(t, e) {
                            for (var i = 0; i < t.length; i++) {
                                var r = i < e.length ? e[i] : e[e.length - 1];
                                this.emit.apply(this, [t[i]].concat(r))
                            }
                        }, r.prototype.emit = function(t) {
                            var e, i, r, a, h, u;
                            if (this._events || (this._events = {}), "error" === t && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                                if ((e = arguments[1]) instanceof Error) throw e;
                                throw TypeError('Uncaught, unspecified "error" event.')
                            }
                            if (s(i = this._events[t])) return !1;
                            if (n(i)) switch (arguments.length) {
                                    case 1:
                                        i.call(this);
                                        break;
                                    case 2:
                                        i.call(this, arguments[1]);
                                        break;
                                    case 3:
                                        i.call(this, arguments[1], arguments[2]);
                                        break;
                                    default:
                                        a = Array.prototype.slice.call(arguments, 1), i.apply(this, a)
                                } else if (o(i))
                                    for (a = Array.prototype.slice.call(arguments, 1), r = (u = i.slice()).length, h = 0; h < r; h++) u[h].apply(this, a);
                            return !0
                        }, r.prototype.on = r.prototype.addListener = function(t, e) {
                            var i;
                            if (!n(e)) throw TypeError("listener must be a function");
                            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, n(e.listener) ? e.listener : e), this._events[t] ? o(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, o(this._events[t]) && !this._events[t].warned && (i = s(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && 0 < i && this._events[t].length > i && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace()), this
                        }, r.prototype.once = function(t, e) {
                            function i() {
                                "_" !== t.charAt(0) || isNaN(t.substr(t.length - 1)) || (t = t.substring(0, t.length - 1)), this.removeListener(t, i), r || (r = !0, e.apply(this, arguments))
                            }
                            if (!n(e)) throw TypeError("listener must be a function");
                            var r = !1;
                            if (this._events.hasOwnProperty(t) && "_" === t.charAt(0)) {
                                var o = 1,
                                    s = t;
                                for (var a in this._events) this._events.hasOwnProperty(a) && a.startsWith(s) && o++;
                                t += o
                            }
                            return i.listener = e, this.on(t, i), this
                        }, r.prototype.removeListener = function(t, e) {
                            var i, r, s, a;
                            if (!n(e)) throw TypeError("listener must be a function");
                            if (!this._events || !this._events[t]) return this;
                            if (s = (i = this._events[t]).length, r = -1, i === e || n(i.listener) && i.listener === e) {
                                if (delete this._events[t], this._events.hasOwnProperty(t + "2") && "_" === t.charAt(0)) {
                                    var h = t;
                                    for (var u in this._events) this._events.hasOwnProperty(u) && u.startsWith(h) && (isNaN(parseInt(u.substr(u.length - 1))) || (this._events[t + parseInt(u.substr(u.length - 1) - 1)] = this._events[u], delete this._events[u]));
                                    this._events[t] = this._events[t + "1"], delete this._events[t + "1"]
                                }
                                this._events.removeListener && this.emit("removeListener", t, e)
                            } else if (o(i)) {
                                for (a = s; 0 < a--;)
                                    if (i[a] === e || i[a].listener && i[a].listener === e) {
                                        r = a;
                                        break
                                    }
                                if (r < 0) return this;
                                1 === i.length ? (i.length = 0, delete this._events[t]) : i.splice(r, 1), this._events.removeListener && this.emit("removeListener", t, e)
                            }
                            return this
                        }, r.prototype.removeAllListeners = function(t) {
                            var e, i;
                            if (!this._events) return this;
                            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
                            if (0 === arguments.length) {
                                for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
                                return this.removeAllListeners("removeListener"), this._events = {}, this
                            }
                            if (n(i = this._events[t])) this.removeListener(t, i);
                            else if (i)
                                for (; i.length;) this.removeListener(t, i[i.length - 1]);
                            return delete this._events[t], this
                        }, r.prototype.listeners = function(t) {
                            return this._events && this._events[t] ? n(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
                        }, r.prototype.listenerCount = function(t) {
                            if (this._events) {
                                var e = this._events[t];
                                if (n(e)) return 1;
                                if (e) return e.length
                            }
                            return 0
                        }, r.listenerCount = function(t, e) {
                            return t.listenerCount(e)
                        }
                    }, {}],
                    6: [function(t, e, i) {
                        "use strict";
                        var r = t("./utils");
                        e.exports = {
                            levenshtein: function(t, e, i) {
                                if ((i = r.get(i, !1)) || (t = t.toLowerCase(), e = e.toLowerCase()), t == e) return 0;
                                var n = t.length,
                                    o = e.length;
                                if (0 === n) return 1 * o;
                                if (0 === o) return 1 * n;
                                var s = !1;
                                try {
                                    s = !"0" [0]
                                } catch (t) {
                                    s = !0
                                }
                                s && (t = t.split(""), e = e.split(""));
                                var a, h, u, l, c, d, p = new Array(o + 1),
                                    f = new Array(o + 1);
                                for (h = 0; h <= o; h++) p[h] = 1 * h;
                                for (a = 0; a < n; a++) {
                                    for (f[0] = p[0] + 1, h = 0; h < o; h++) u = p[h] + (t[a] == e[h] ? 0 : 1), (l = p[h + 1] + 1) < u && (u = l), (c = f[h] + 1) < u && (u = c), f[h + 1] = u;
                                    d = p, p = f, f = d
                                }
                                return p[o]
                            },
                            raffle: {
                                init: function(t) {
                                    this.raffleChannels || (this.raffleChannels = {}), this.raffleChannels[r.channel(t)] || (this.raffleChannels[r.channel(t)] = [])
                                },
                                enter: function(t, e) {
                                    this.init(t), this.raffleChannels[r.channel(t)].push(e.toLowerCase())
                                },
                                leave: function(t, e) {
                                    this.init(t);
                                    var i = this.raffleChannels[r.channel(t)].indexOf(r.username(e));
                                    return 0 <= i && (this.raffleChannels[r.channel(t)].splice(i, 1), !0)
                                },
                                pick: function(t) {
                                    this.init(t);
                                    var e = this.raffleChannels[r.channel(t)].length;
                                    return 1 <= e ? this.raffleChannels[r.channel(t)][Math.floor(Math.random() * e)] : null
                                },
                                reset: function(t) {
                                    this.init(t), this.raffleChannels[r.channel(t)] = []
                                },
                                count: function(t) {
                                    return this.init(t), this.raffleChannels[r.channel(t)] ? this.raffleChannels[r.channel(t)].length : 0
                                },
                                isParticipating: function(t, e) {
                                    return this.init(t), this.raffleChannels[r.channel(t)].includes(r.username(e))
                                }
                            },
                            symbols: function(t) {
                                for (var e = 0, i = 0; i < t.length; i++) {
                                    var r = t.substring(i, i + 1).charCodeAt(0);
                                    (r <= 30 || 127 <= r || 65533 === r) && e++
                                }
                                return Math.ceil(e / t.length * 100) / 100
                            },
                            uppercase: function(t) {
                                var e = t.length,
                                    i = t.match(/[A-Z]/g);
                                return r.isNull(i) ? 0 : i.length / e
                            }
                        }
                    }, {
                        "./utils": 10
                    }],
                    7: [function(t, e, i) {
                        "use strict";

                        function r(t) {
                            return function(e) {
                                s[o] <= s[t] && console.log("[" + n.formatDate(new Date) + "] " + t + ": " + e)
                            }
                        }
                        var n = t("./utils"),
                            o = "info",
                            s = {
                                trace: 0,
                                debug: 1,
                                info: 2,
                                warn: 3,
                                error: 4,
                                fatal: 5
                            };
                        e.exports = {
                            setLevel: function(t) {
                                o = t
                            },
                            trace: r("trace"),
                            debug: r("debug"),
                            info: r("info"),
                            warn: r("warn"),
                            error: r("error"),
                            fatal: r("fatal")
                        }
                    }, {
                        "./utils": 10
                    }],
                    8: [function(t, e, i) {
                        "use strict";
                        var r = t("./utils");
                        e.exports = {
                            badges: function(t) {
                                if (r.isString(t.badges)) {
                                    for (var e = {}, i = t.badges.split(","), n = 0; n < i.length; n++) {
                                        var o = i[n].split("/");
                                        if (!o[1]) return;
                                        e[o[0]] = o[1]
                                    }
                                    t["badges-raw"] = t.badges, t.badges = e
                                }
                                return r.isBoolean(t.badges) && (t["badges-raw"] = null), t
                            },
                            emotes: function(t) {
                                if (r.isString(t.emotes)) {
                                    for (var e = t.emotes.split("/"), i = {}, n = 0; n < e.length; n++) {
                                        var o = e[n].split(":");
                                        if (!o[1]) return;
                                        i[o[0]] = o[1].split(",")
                                    }
                                    t["emotes-raw"] = t.emotes, t.emotes = i
                                }
                                return r.isBoolean(t.emotes) && (t["emotes-raw"] = null), t
                            },
                            emoteRegex: function(t, e, i, n) {
                                for (var o, s = /\S+/g, a = new RegExp("(\\b|^|s)" + r.unescapeHtml(e) + "(\\b|$|s)"); null !== (o = s.exec(t));) a.test(o[0]) && (n[i] = n[i] || [], n[i].push([o.index, s.lastIndex - 1]))
                            },
                            emoteString: function(t, e, i, n) {
                                for (var o, s = /\S+/g; null !== (o = s.exec(t));) o[0] === r.unescapeHtml(e) && (n[i] = n[i] || [], n[i].push([o.index, s.lastIndex - 1]))
                            },
                            transformEmotes: function(t) {
                                var e = "";
                                return Object.keys(t).forEach(function(i) {
                                    e = e + i + ":", t[i].forEach(function(t) {
                                        e = e + t.join("-") + ","
                                    }), e = e.slice(0, -1) + "/"
                                }), e.slice(0, -1)
                            },
                            msg: function(t) {
                                var e = {
                                        raw: t,
                                        tags: {},
                                        prefix: null,
                                        command: null,
                                        params: []
                                    },
                                    i = 0,
                                    r = 0;
                                if (64 === t.charCodeAt(0)) {
                                    if (-1 === (r = t.indexOf(" "))) return null;
                                    for (var n = t.slice(1, r).split(";"), o = 0; o < n.length; o++) {
                                        var s = n[o],
                                            a = s.split("=");
                                        e.tags[a[0]] = s.substring(s.indexOf("=") + 1) || !0
                                    }
                                    i = r + 1
                                }
                                for (; 32 === t.charCodeAt(i);) i++;
                                if (58 === t.charCodeAt(i)) {
                                    if (-1 === (r = t.indexOf(" ", i))) return null;
                                    for (e.prefix = t.slice(i + 1, r), i = r + 1; 32 === t.charCodeAt(i);) i++
                                }
                                if (-1 === (r = t.indexOf(" ", i))) return t.length > i ? (e.command = t.slice(i), e) : null;
                                for (e.command = t.slice(i, r), i = r + 1; 32 === t.charCodeAt(i);) i++;
                                for (; i < t.length;) {
                                    if (r = t.indexOf(" ", i), 58 === t.charCodeAt(i)) {
                                        e.params.push(t.slice(i + 1));
                                        break
                                    }
                                    if (-1 === r) {
                                        if (-1 === r) {
                                            e.params.push(t.slice(i));
                                            break
                                        }
                                    } else
                                        for (e.params.push(t.slice(i, r)), i = r + 1; 32 === t.charCodeAt(i);) i++
                                }
                                return e
                            }
                        }
                    }, {
                        "./utils": 10
                    }],
                    9: [function(t, e, i) {
                        "use strict";

                        function r(t) {
                            this.queue = [], this.index = 0, this.defaultDelay = t || 3e3
                        }
                        r.prototype.add = function(t, e) {
                            this.queue.push({
                                fn: t,
                                delay: e
                            })
                        }, r.prototype.run = function(t) {
                            (t || 0 === t) && (this.index = t), this.next()
                        }, r.prototype.next = function() {
                            var t = this,
                                e = this.index++,
                                i = this.queue[e],
                                r = this.queue[this.index];
                            i && (i.fn(), r && setTimeout(function() {
                                t.next()
                            }, r.delay || this.defaultDelay))
                        }, r.prototype.reset = function() {
                            this.index = 0
                        }, r.prototype.clear = function() {
                            this.index = 0, this.queue = []
                        }, i.queue = r
                    }, {}],
                    10: [function(t, e, i) {
                        (function(t) {
                            "use strict";
                            var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                                    return typeof t
                                } : function(t) {
                                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                                },
                                r = /^\u0001ACTION ([^\u0001]+)\u0001$/,
                                n = /^(justinfan)(\d+$)/,
                                o = /\\([sn:r\\])/g,
                                s = {
                                    s: " ",
                                    n: "",
                                    ":": ";",
                                    r: ""
                                },
                                a = e.exports = {
                                    get: function(t, e) {
                                        return void 0 === t ? e : t
                                    },
                                    isBoolean: function(t) {
                                        return "boolean" == typeof t
                                    },
                                    isFinite: function(t) {
                                        function e(e) {
                                            return t.apply(this, arguments)
                                        }
                                        return e.toString = function() {
                                            return t.toString()
                                        }, e
                                    }(function(t) {
                                        return isFinite(t) && !isNaN(parseFloat(t))
                                    }),
                                    isInteger: function(t) {
                                        return !isNaN(a.toNumber(t, 0))
                                    },
                                    isJustinfan: function(t) {
                                        return n.test(t)
                                    },
                                    isNull: function(t) {
                                        return null === t
                                    },
                                    isRegex: function(t) {
                                        return /[\|\\\^\$\*\+\?\:\#]/.test(t)
                                    },
                                    isString: function(t) {
                                        return "string" == typeof t
                                    },
                                    isURL: function(t) {
                                        return RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$", "i").test(t)
                                    },
                                    justinfan: function() {
                                        return "justinfan" + Math.floor(8e4 * Math.random() + 1e3)
                                    },
                                    password: function(t) {
                                        return ["SCHMOOPIIE", "", null].includes(t) ? "SCHMOOPIIE" : "oauth:" + t.toLowerCase().replace("oauth:", "")
                                    },
                                    promiseDelay: function(t) {
                                        return new Promise(function(e) {
                                            setTimeout(e, t)
                                        })
                                    },
                                    replaceAll: function(t, e) {
                                        if (null == t) return null;
                                        for (var i in e) t = t.replace(new RegExp(i, "g"), e[i]);
                                        return t
                                    },
                                    unescapeHtml: function(t) {
                                        return t.replace(/\\&amp\\;/g, "&").replace(/\\&lt\\;/g, "<").replace(/\\&gt\\;/g, ">").replace(/\\&quot\\;/g, '"').replace(/\\&#039\\;/g, "'")
                                    },
                                    unescapeIRC: function(t) {
                                        return t && t.includes("\\") ? t.replace(o, function(t, e) {
                                            return e in s ? s[e] : e
                                        }) : t
                                    },
                                    actionMessage: function(t) {
                                        return t.match(r)
                                    },
                                    addWord: function(t, e) {
                                        return t.length ? t + " " + e : t + e
                                    },
                                    channel: function(t) {
                                        var e = (t || "").toLowerCase();
                                        return "#" === e[0] ? e : "#" + e
                                    },
                                    extractNumber: function(t) {
                                        for (var e = t.split(" "), i = 0; i < e.length; i++)
                                            if (a.isInteger(e[i])) return ~~e[i];
                                        return 0
                                    },
                                    formatDate: function(t) {
                                        var e = t.getHours(),
                                            i = t.getMinutes();
                                        return (e = (e < 10 ? "0" : "") + e) + ":" + (i < 10 ? "0" : "") + i
                                    },
                                    inherits: function(t, e) {
                                        t.super_ = e;
                                        var i = function() {};
                                        i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t
                                    },
                                    isNode: function() {
                                        try {
                                            return e.exports = "object" === (void 0 === t ? "undefined" : i(t)) && "[object process]" === Object.prototype.toString.call(t)
                                        } catch (t) {
                                            return !1
                                        }
                                    },
                                    isExtension: function() {
                                        try {
                                            return !!(window.chrome && chrome.runtime && chrome.runtime.id)
                                        } catch (t) {
                                            return !1
                                        }
                                    },
                                    merge: Object.assign,
                                    splitLine: function(t, e) {
                                        var i = t.substring(0, e).lastIndexOf(" ");
                                        return -1 === i && (i = e - 1), [t.substring(0, i), t.substring(i + 1)]
                                    },
                                    toNumber: function(t, e) {
                                        if (null === t) return 0;
                                        var i = Math.pow(10, a.isFinite(e) ? e : 0);
                                        return Math.round(t * i) / i
                                    },
                                    union: function(t, e) {
                                        for (var i = {}, r = [], n = 0; n < t.length; n++) i[o = t[n]] || (i[o] = !0, r.push(o));
                                        for (n = 0; n < e.length; n++) {
                                            var o;
                                            i[o = e[n]] || (i[o] = !0, r.push(o))
                                        }
                                        return r
                                    },
                                    username: function(t) {
                                        var e = (t || "").toLowerCase();
                                        return "#" === e[0] ? e.slice(1) : e
                                    }
                                }
                        }).call(this, t("_process"))
                    }, {
                        _process: 12
                    }],
                    11: [function(t, e, i) {}, {}],
                    12: [function(t, e, i) {
                        function r() {
                            throw new Error("setTimeout has not been defined")
                        }

                        function n() {
                            throw new Error("clearTimeout has not been defined")
                        }

                        function o(t) {
                            if (l === setTimeout) return setTimeout(t, 0);
                            if ((l === r || !l) && setTimeout) return l = setTimeout, setTimeout(t, 0);
                            try {
                                return l(t, 0)
                            } catch (e) {
                                try {
                                    return l.call(null, t, 0)
                                } catch (e) {
                                    return l.call(this, t, 0)
                                }
                            }
                        }

                        function s() {
                            m && p && (m = !1, p.length ? f = p.concat(f) : g = -1, f.length && a())
                        }

                        function a() {
                            if (!m) {
                                var t = o(s);
                                m = !0;
                                for (var e = f.length; e;) {
                                    for (p = f, f = []; ++g < e;) p && p[g].run();
                                    g = -1, e = f.length
                                }
                                p = null, m = !1,
                                    function(t) {
                                        if (c === clearTimeout) return clearTimeout(t);
                                        if ((c === n || !c) && clearTimeout) return c = clearTimeout, clearTimeout(t);
                                        try {
                                            c(t)
                                        } catch (e) {
                                            try {
                                                return c.call(null, t)
                                            } catch (e) {
                                                return c.call(this, t)
                                            }
                                        }
                                    }(t)
                            }
                        }

                        function h(t, e) {
                            this.fun = t, this.array = e
                        }

                        function u() {}
                        var l, c, d = e.exports = {};
                        ! function() {
                            try {
                                l = "function" == typeof setTimeout ? setTimeout : r
                            } catch (t) {
                                l = r
                            }
                            try {
                                c = "function" == typeof clearTimeout ? clearTimeout : n
                            } catch (t) {
                                c = n
                            }
                        }();
                        var p, f = [],
                            m = !1,
                            g = -1;
                        d.nextTick = function(t) {
                            var e = new Array(arguments.length - 1);
                            if (1 < arguments.length)
                                for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
                            f.push(new h(t, e)), 1 !== f.length || m || o(a)
                        }, h.prototype.run = function() {
                            this.fun.apply(null, this.array)
                        }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = u, d.addListener = u, d.once = u, d.off = u, d.removeListener = u, d.removeAllListeners = u, d.emit = u, d.prependListener = u, d.prependOnceListener = u, d.listeners = function(t) {
                            return []
                        }, d.binding = function(t) {
                            throw new Error("process.binding is not supported")
                        }, d.cwd = function() {
                            return "/"
                        }, d.chdir = function(t) {
                            throw new Error("process.chdir is not supported")
                        }, d.umask = function() {
                            return 0
                        }
                    }, {}]
                }, {}, [1])
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}]
    }, {}, [1]);
var assetReference = {},
    overlays = {},
    objects = {},
    objectSprite = {},
    particles = {},
    particleImage = null,
    timers = {},
    texts = {},
    detectEnter = {},
    detectExit = {},
    connection = {};

function CropAsset(t, e, i, r, n, o) {
    return assetReference[t] = new PIXI.Texture(assetReference[e], new PIXI.Rectangle(i, r, n, o))
}

function LoadAsset(t, e) {
    if ("object" == typeof t) return Object.keys(t).map(e => LoadAsset(e, t[e]));
    var i = e.split(".").pop();
    switch (i) {
        case "jpg":
        case "png":
        case "svg":
        case "jpeg":
        case "gif":
        case "mp4":
            return assetReference[t] = PIXI.Texture.from(e);
        case "wav":
        case "mp3":
            return assetReference[t] = PIXI.sound.Sound.from(e);
        default:
            if (e.startsWith("http://") || e.startsWith("https://")) return assetReference[t] = PIXI.Texture.from(e);
            throw new Error("Unsupported File Format: " + i)
    }
}

function LoadAssetCustom(t, e, i, r) {
    switch (i) {
        case "texture":
            return assetReference[t] = PIXI.Texture.from(e, r);
        case "sound":
            return assetReference[t] = PIXI.sound.Sound.from(e);
        default:
            throw new Error("Unsupported Asset Type: " + i)
    }
}

function PlaySound(t, e) {
    assetReference[t] && (assetReference[t].volume = void 0 === e.volume || null === e.volume ? 1 : e.volume, assetReference[t].play())
}

function AddBacklay(t, e, i, r, n) {
    try {
        if (t) {
            if ("object" == typeof t) return Object.keys(t).map(e => AddBacklay(e, t[e].asset, t[e].x, t[e].y, t[e].options));
            var o = new PIXI.Sprite(assetReference[e]);
            if (o.x = i, o.y = r, groupBacklay.addChild(o), overlays[t] = o, n) {
                n.z && (o.zIndex = n.z), n.scale && (o.scale.x = n.scale.x, o.scale.y = n.scale.y);
                var s = !1;
                n.onPress instanceof Function && (s = !0, o.on("pointerdown", n.onPress)), n.onRelease instanceof Function && (s = !0, o.on("pointerup", n.onRelease), o.on("pointerupoutside", n.onRelease)), n.onHover instanceof Function && (s = !0, o.on("pointerover", n.onHover)), n.onLeave instanceof Function && (s = !0, o.on("pointerout", n.onLeave)), n.onMove instanceof Function && (s = !0, o.on("pointermove", n.onMove)), s && (o.interactive = !0, o.buttonMode = !0)
            }
            return o
        }
    } catch (t) {
        console.log("Failed to add overlay", t)
    }
    return null
}

function RemoveBacklay(t) {
    overlays[t] && (groupBacklay.removeChild(overlays[t]), delete overlays[t])
}

function AddOverlay(t, e, i, r, n) {
    try {
        if (t) {
            if ("object" == typeof t) return Object.keys(t).map(e => AddOverlay(e, t[e].asset, t[e].x, t[e].y, t[e].options));
            var o = new PIXI.Sprite(assetReference[e]);
            if (o.x = i, o.y = r, groupOverlay.addChild(o), overlays[t] = o, n) {
                n.z && (o.zIndex = n.z), n.scale && (o.scale.x = n.scale.x, o.scale.y = n.scale.y);
                var s = !1;
                n.onPress instanceof Function && (s = !0, o.on("pointerdown", n.onPress)), n.onRelease instanceof Function && (s = !0, o.on("pointerup", n.onRelease), o.on("pointerupoutside", n.onRelease)), n.onHover instanceof Function && (s = !0, o.on("pointerover", n.onHover)), n.onLeave instanceof Function && (s = !0, o.on("pointerout", n.onLeave)), n.onMove instanceof Function && (s = !0, o.on("pointermove", n.onMove)), s && (o.interactive = !0, o.buttonMode = !0)
            }
            return o
        }
    } catch (t) {
        console.log("Failed to add overlay", t)
    }
    return null
}

function RemoveOverlay(t) {
    overlays[t] && (groupOverlay.removeChild(overlays[t]), delete overlays[t])
}

function AddText(t, e, i, r, n) {
    try {
        if (t) {
            if ("object" == typeof t) return Object.keys(t).map(e => AddText(e, t[e].asset, t[e].x, t[e].y, t[e].options));
            var o = new PIXI.Text(e, new PIXI.TextStyle(n));
            return o.x = i, o.y = r, groupOverlay.addChild(o), texts[t] = o, n && (n.z && (o.zIndex = n.z), n.scale && (o.scale.x = n.scale.x, o.scale.y = n.scale.y)), o
        }
    } catch (t) {
        console.log("Failed to add text", t)
    }
    return null
}

function RemoveText(t) {
    texts[t] && (groupOverlay.removeChild(texts[t]), delete texts[t])
}

function AddDetector(t, e, i, r) {
    return "object" == typeof t ? Object.keys(t).map(e => AddDetector(e, t[e].options, t[e].onEnter, t[e].onExit)) : (e = Object.assign(e, {
        isDetector: !0,
        onEnter: i,
        onExit: r
    }), AddObject(t, e))
}

function RemoveDetector(t) {
    RemoveObject(t)
}

function AddObject(t, e) {
    try {
        if (t) {
            if ("object" == typeof t) return Object.keys(t).map(e => AddObject(e, t[e]));
            if (Array.isArray(e)) throw new Error("Composite Objects Not Supported");
            var i = null;
            switch (e.type.toLowerCase()) {
                case "circle":
                    i = Matter.Bodies.circle(e.x, e.y, e.radius);
                    break;
                case "rectangle":
                    i = Matter.Bodies.rectangle(e.x, e.y, e.width, e.height);
                    break;
                default:
                    throw new Error("Unsupported Object Type", e.type)
            }
            if (i.angle = e.angle || 0, i.density = e.density || .001, i.force = e.force || {
                    x: 0,
                    y: 0
                }, i.friction = e.friction || .1, i.frictionAir = e.frictionAir || .01, i.frictionStatic = e.frictionStatic || .5, i.isStatic = e.isStatic || !1, i.restitution = e.bounce || 0, i.torque = e.torque || 0, i.label = t, e.isDetector && (i.isSensor = !0, i.isStatic = !0), e.onEnter && (detectEnter[t] = e.onEnter), e.onExit && (detectExit[t] = e.onExit), e.animations) {
                for (var r in e.animations) {
                    (o = new PIXI.AnimatedSprite(e.animations[r].frames.map(t => assetReference[t]))).animationSpeed = e.animations[r].framerate || 10 / 60, o.loop = e.animations[r].loop, o.onComplete = e.animations[r].onComplete, o.visible = !1, o.anchor.set(.5), o.x = i.position.x, o.y = i.position.y, o.rotation = i.angle, objectSprite[i.id] || (objectSprite[i.id] = []), objectSprite[i.id].push(o), e.z && (o.zIndex = e.z), e.scale && (o.scale.x = e.scale.x, o.scale.y = e.scale.y), groupWorld.addChild(o);
                    var n = !1;
                    e.onPress instanceof Function && (n = !0, o.on("pointerdown", e.onPress)), e.onRelease instanceof Function && (n = !0, o.on("pointerup", e.onRelease), o.on("pointerupoutside", e.onRelease)), e.onHover instanceof Function && (n = !0, o.on("pointerover", e.onHover)), e.onLeave instanceof Function && (n = !0, o.on("pointerout", e.onLeave)), e.onMove instanceof Function && (n = !0, o.on("pointermove", e.onMove)), n && (o.interactive = !0, o.buttonMode = !0), i.animations || (i.animations = {}), i.animations[r] = o
                }
                i.currentAnimation = Object.keys(i.animations)[0], i.animations[i.currentAnimation].visible = !0, i.animations[i.currentAnimation].gotoAndPlay(0)
            } else if (e.sprite) {
                (o = new PIXI.Sprite(assetReference[e.sprite])).anchor.set(.5), o.x = i.position.x, o.y = i.position.y, o.rotation = i.angle, objectSprite[i.id] = o, e.z && (o.zIndex = e.z), e.scale && (o.scale.x = e.scale.x, o.scale.y = e.scale.y), groupWorld.addChild(o);
                n = !1;
                e.onPress instanceof Function && (n = !0, o.on("pointerdown", e.onPress)), e.onRelease instanceof Function && (n = !0, o.on("pointerup", e.onRelease), o.on("pointerupoutside", e.onRelease)), e.onHover instanceof Function && (n = !0, o.on("pointerover", e.onHover)), e.onLeave instanceof Function && (n = !0, o.on("pointerout", e.onLeave)), e.onMove instanceof Function && (n = !0, o.on("pointermove", e.onMove)), n && (o.interactive = !0, o.buttonMode = !0), i.sprite = o
            } else if (!e.isDetector) {
                var o;
                switch ((o = new PIXI.Graphics).lineStyle(2, 16777215, e.outlineThickness || 1), e.color ? (("string" == typeof e.color || e.color instanceof String) && (e.color = PIXI.utils.string2hex(e.color)), o.beginFill(e.color)) : o.beginFill(PIXI.utils.string2hex(getRandomColor())), e.type.toLowerCase()) {
                    case "circle":
                        o.drawCircle(0, 0, e.radius);
                        break;
                    case "rectangle":
                        o.drawRect(-e.width / 2, -e.height / 2, e.width, e.height);
                        break;
                    default:
                        throw new Error("Unsupported Object Type", e.type)
                }
                o.endFill(), o.x = i.position.x, o.y = i.position.y, o.rotation = i.angle, objectSprite[i.id] = o, e.z && (o.zIndex = e.z), e.scale && (o.scale.x = e.scale.x, o.scale.y = e.scale.y), groupWorld.addChild(o);
                n = !1;
                e.onPress instanceof Function && (n = !0, o.on("pointerdown", e.onPress)), e.onRelease instanceof Function && (n = !0, o.on("pointerup", e.onRelease), o.on("pointerupoutside", e.onRelease)), e.onHover instanceof Function && (n = !0, o.on("pointerover", e.onHover)), e.onLeave instanceof Function && (n = !0, o.on("pointerout", e.onLeave)), e.onMove instanceof Function && (n = !0, o.on("pointermove", e.onMove)), n && (o.interactive = !0, o.buttonMode = !0), i.sprite = o
            }
            return objects[t] = i, Matter.World.add(physics.world, [i]), i
        }
    } catch (t) {
        console.log("Failed to add overlay", t)
    }
    return null
}

function RemoveObject(t) {
    objects[t] && (Array.isArray(objectSprite[objects[t].id]) ? objectSprite[objects[t].id].forEach(t => {
        groupWorld.removeChild(t)
    }) : groupWorld.removeChild(objectSprite[objects[t].id]), delete objectSprite[objects[t].id], groupWorld.removeChild(objects[t]), Matter.Composite.remove(physics.world, objects[t]), delete objects[t], delete detectEnter[t], delete detectExit[t])
}

function PlayObjectAnimation(t, e, i = 0) {
    objects[t] && objects[t].animations && objects[t].animations[e] && (objects[t].animations[objects[t].currentAnimation].visible = !1, objects[t].animations[objects[t].currentAnimation].stop(), objects[t].currentAnimation = e, objects[t].animations[objects[t].currentAnimation].visible = !0, objects[t].animations[objects[t].currentAnimation].gotoAndPlay(i))
}

function StopObjectAnimation(t) {
    objects[t] && objects[t].animations && objects[t].animations[objects[t].currentAnimation].stop()
}

function SetPosition(t, e, i) {
    objects[t] && Matter.Body.setPosition(objects[t], {
        x: e,
        y: i
    })
}

function SetVelocity(t, e, i) {
    objects[t] && Matter.Body.setVelocity(objects[t], {
        x: e,
        y: i
    })
}

function AddTimer(t, e, i) {
    try {
        if (t) return timers[t] = {
            time: e,
            callback: i
        }, timers[t]
    } catch (t) {
        console.log("Failed to add timer", t)
    }
    return null
}

function ResetTimer(t, e) {
    timers[t] && (timers[t].time = e)
}

function RemoveTimer(t) {
    timers[t] && delete timers[t]
}

function ConnectObjects(t, e, i, r, n) {
    i = i || {};
    var o = {
            pointA: r || {
                x: 0,
                y: 0
            },
            pointB: n || {
                x: 0,
                y: 0
            },
            damping: i.damping || 0,
            length: i.length,
            stiffness: i.stiffness || 1
        },
        s = t + "_" + e;
    objects[t] && (o.bodyA = objects[t]), objects[e] && (o.bodyB = objects[e]), connection[s] = Matter.Constraint.create(o), Matter.Composite.add(physics.world, connection[s])
}

function DisconnectObjects(t, e) {
    connection[t + "_" + e] ? (Matter.Composite.remove(physics.world, connection[t + "_" + e]), delete connection[t + "_" + e]) : connection[e + "_" + t] && (Matter.Composite.remove(physics.world, connection[e + "_" + t]), delete connection[e + "_" + t])
}

function AddParticles(t, e, i, r) {
    try {
        if (t) {
            let n = setInterval(function() {
                var n = PIXI.Texture.fromImage(e.image || particleImage);
                e.flySpeed && (r -= 1e3 * e.flySpeed / e.intensity);
                for (var o = 0; o < 10; o++) {
                    var s = new PIXI.Sprite(n);
                    s.anchor.set(.5), s.x = i, s.y = r, s.blendMode = e.blendMode || PIXI.BLEND_MODES.ADD, ("string" == typeof e.startColor || e.startColor instanceof String) && (e.startColor = PIXI.utils.string2hex(e.startColor)), ("string" == typeof e.endColor || e.endColor instanceof String) && (e.endColor = PIXI.utils.string2hex(e.endColor)), e.angle = e.angle || 0, e.spread = e.spread || 0, e.lineDirection = e.lineDirection || 0, e.length = e.length || app.view.width, e.gravityX = e.gravityX || 0, e.gravityY = e.gravityY || 0, e.timeInterval = 1e3 / e.intensity, s.tint = e.startColor;
                    var a = Math.random() * e.decay * 1e3,
                        h = Math.random() * (e.maxSpeed - e.minSpeed) + e.minSpeed,
                        u = {
                            image: s,
                            x: i,
                            y: r,
                            vX: 0,
                            vY: 0,
                            growOverTime: e.growOverTime || !1,
                            fadeOut: e.fadeOut || !1,
                            startColor: e.startColor,
                            endColor: e.endColor,
                            velocity: h,
                            gravityX: e.gravityX,
                            gravityY: e.gravityY,
                            maxLife: a,
                            life: a
                        };
                    switch (e.shape) {
                        case "circle":
                            u.angle = Math.random() * Math.PI * 2;
                            break;
                        case "cone":
                            u.angle = e.angle + Math.random() * e.spread - e.spread / 2;
                            break;
                        case "line":
                            u.x += Math.cos(e.lineDirection) * Math.random() * e.length, u.y += Math.sin(e.lineDirection) * Math.random() * e.length, u.angle = e.angle + Math.random() * e.spread - e.spread / 2;
                            break;
                        default:
                            u.angle = e.angle
                    }
                    u.vX = Math.cos(u.angle) * h, u.vY = Math.sin(u.angle) * h, s.x = u.x, s.y = u.y;
                    var l = u.life / u.maxLife;
                    u.image.scale = {
                        x: l,
                        y: l
                    }, groupOverlay.addChild(s), particles[t].points.push(u)
                }
            }, 1e3 / e.intensity);
            return particles[t] = {
                name: t,
                timer: n,
                options: e,
                points: []
            }, particles[t]
        }
    } catch (t) {
        console.log("Failed to add particles", t)
    }
    return null
}

function RemoveParticles(t, e, i, r) {
    particles[t] && (clearInterval(particles[t].timer), particles[t].isDeleted = !0)
}

function Raycast(t, e) {
    return Matter.Query.ray(Matter.Composite.allBodies(physics.world), t, e)
}

function getRandomColor() {
    for (var t = "#", e = 0; e < 6; e++) t += "0123456789ABCDEF" [Math.floor(16 * Math.random())];
    return t
}

function lerpColor(t, e, i) {
    try {
        for (var r = PIXI.utils.hex2rgb(t), n = PIXI.utils.hex2rgb(e), o = [0, 0, 0], s = 0; s < 3; s++) o[s] = r[s] + (n[s] - r[s]) * i;
        return PIXI.utils.rgb2hex(o)
    } catch (t) {
        console.log(t)
    }
}
var app = void 0,
    groupBacklay = void 0,
    groupOverlay = void 0,
    groupWorld = void 0,
    opts = void 0,
    physics = void 0;

function createTheUnicorn(t, e) {
    try {
        if (opts = e, PIXI.utils.skipHello(), app = new PIXI.Application({
                width: opts.width,
                height: opts.height,
                antialias: !0,
                transparent: "transparent" === opts.background,
                backgroundColor: "transparent" === opts.background ? null : opts.background,
                resolution: 1
            }), t instanceof Element || t instanceof HTMLDocument) t.appendChild(app.view);
        else {
            if (!("string" == typeof t || t instanceof String)) throw new Error("Invalid Element Type");
            document.getElementById(t).appendChild(app.view)
        }(groupBacklay = new PIXI.Container).sortableChildren = !0, app.stage.addChild(groupBacklay), (groupWorld = new PIXI.Container).sortableChildren = !0, app.stage.addChild(groupWorld), (groupOverlay = new PIXI.Container).sortableChildren = !0, app.stage.addChild(groupOverlay), opts.channel && (opts.username && opts.password ? ComfyJS.Init(opts.username, opts.password, [opts.channel]) : ComfyJS.Init(opts.channel), ComfyJS.onCommand = opts.onCommand, ComfyJS.onChat = opts.onChat), (physics = Matter.Engine.create()).world.gravity.x = opts.gravity ? opts.gravity.x : 0, physics.world.gravity.y = opts.gravity ? opts.gravity.y : 1;
        var i = !1,
            r = !1,
            n = !1,
            o = !1;
        return opts.screenWalls ? i = r = n = o = !0 : void 0 === opts.screenWalls && (opts.wallTop || opts.wallBottom || opts.wallLeft || opts.wallRight ? (i = opts.wallTop, r = opts.wallBottom, n = opts.wallLeft, o = opts.wallRight) : i = r = n = o = !0), i && Matter.World.add(physics.world, [Matter.Bodies.rectangle(opts.width / 2, -50, 2 * opts.width, 100, {
            isStatic: !0
        })]), r && Matter.World.add(physics.world, [Matter.Bodies.rectangle(opts.width / 2, opts.height + 50, 2 * opts.width, 100, {
            isStatic: !0
        })]), n && Matter.World.add(physics.world, [Matter.Bodies.rectangle(-50, opts.height / 2, 100, 2 * opts.height, {
            isStatic: !0
        })]), o && Matter.World.add(physics.world, [Matter.Bodies.rectangle(opts.width + 50, opts.height / 2, 100, 2 * opts.height, {
            isStatic: !0
        })]), Matter.Events.on(physics, "collisionStart", function(t) {
            for (var e = t.pairs, i = 0, r = e.length; i != r; ++i) {
                var n = e[i];
                n.bodyA.isSensor ? detectEnter[n.bodyA.label] && detectEnter[n.bodyA.label](n.bodyB.label, n.bodyB) : n.bodyB.isSensor ? detectEnter[n.bodyB.label] && detectEnter[n.bodyB.label](n.bodyA.label, n.bodyA) : (detectEnter[n.bodyA.label] && detectEnter[n.bodyA.label](n.bodyB.label, n.bodyB), detectEnter[n.bodyB.label] && detectEnter[n.bodyB.label](n.bodyA.label, n.bodyA))
            }
        }), Matter.Events.on(physics, "collisionEnd", function(t) {
            for (var e = t.pairs, i = 0, r = e.length; i != r; ++i) {
                var n = e[i];
                n.bodyA.isSensor ? detectExit[n.bodyA.label] && detectExit[n.bodyA.label](n.bodyB.label, n.bodyB) : n.bodyB.isSensor ? detectExit[n.bodyB.label] && detectExit[n.bodyB.label](n.bodyA.label, n.bodyA) : (detectExit[n.bodyA.label] && detectExit[n.bodyA.label](n.bodyB.label, n.bodyB), detectExit[n.bodyB.label] && detectExit[n.bodyB.label](n.bodyA.label, n.bodyA))
            }
        }), Matter.Engine.run(physics), particleImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAQAAAC0jZKKAAACPElEQVR4AbXXcW/TMBAF8EtCypa1LCDB9/98ILG1dKNNCOZZT8h6N4562eZTzH8/ni6dfWns4kqtvbMOT2tmv+0XasG/F1aTLFxd5lDcCS8o0tyX58K9bVA9WZe40LNNqLkevrJr1HvrC1vgQoM820/UqQZubQBKWDKjDJjP+wg41/J/eAOQsGb2rWDlvKzMTyEMaJvBIHNpBdswOfhoZ4VL2h3Irc+srSiJPYv9B1Mr3IHcCS2ZJTFf2+RZ1NEWD5PF7mmQ/nfs85I9klb4KrNCa2YkZitcXmVZpwL3zFtwpYH6l3cWtqDMPP+Fb+zWPthW6BvUIJmZuOTN7APqKOjB9vZAuAM6ArvFE9CSeI5Y1B7PPfAFMPKMKMWVZmbCzKusoveoKcODjQDzgx3c6GnUFnADOAFGV5V16B7PI2BkBRjgmf4IWBbYu8I6lPuhSa2w4xP8k7CF/l5Q7HuiZW9ST+wpjgKLvP9ed6gAJXztWcG/2CaAJ/tKlJSnm7RTTHHATQAnwAFKWCn/H3y2eH2L2ZfDIf06rXD8m768l//cAvzN/kBe709a8cPFQ4jXFA8hHpvVh1D9scmrqfbYrD/oO0s5caYrDvraqwlwW3811V6mvXUrLtOq6x+NYCt0vIqv/2hgcUPWqoFFRixlB9tEIxZHWKHJLmuGQraifijUMTbIq63QzDLGrh+8wVYO3rI6nzdohc+81H3cDHiijxvNfAJ9Wv855hJL5nnlB2Tw8ojzC7UelrXqk/cPn233eGpGsfAAAAAASUVORK5CYII=", opts.init(), window.requestAnimationFrame(updateTheUnicorn), !0
    } catch (t) {
        return console.log("Init Error", t), !1
    }
}
var prevStep = -1;

function updateTheUnicorn(t) {
    try {
        prevStep < 0 && (prevStep = t), physics.world.bodies.forEach(t => {
            var e = objectSprite[t.id];
            e && (Array.isArray(e) ? e.forEach(e => {
                e.x = t.position.x, e.y = t.position.y, e.rotation = t.angle
            }) : (e.x = t.position.x, e.y = t.position.y, e.rotation = t.angle))
        });
        var e = t - prevStep;
        for (var i in Object.keys(timers).forEach(t => {
                timers[t].time > 0 && (timers[t].time -= e, timers[t].time <= 0 && timers[t].callback())
            }), particles)
            if (particles[i].isDeleted && particles[i].points.length <= 0) delete particles[i];
            else
                for (var r = 0; r < particles[i].points.length; r++) {
                    var n = particles[i].points[r];
                    if (n.life -= e, n.life <= 0) particles[i].points.splice(r, 1), groupOverlay.removeChild(n.image), r--;
                    else {
                        n.vX += n.gravityX / 1e4 * e, n.vY += n.gravityY / 1e4 * e, n.x += n.vX * e, n.y += n.vY * e, n.image.x = n.x, n.image.y = n.y;
                        var o = n.life / n.maxLife,
                            s = 1 - o;
                        n.fadeOut && (n.image.alpha = o), n.growOverTime ? n.image.scale = {
                            x: s,
                            y: s
                        } : n.image.scale = {
                            x: o,
                            y: o
                        }, n.image.tint = lerpColor(n.startColor, n.endColor, s)
                    }
                }
        opts.update(t, t - prevStep), prevStep = t, window.requestAnimationFrame(updateTheUnicorn)
    } catch (t) {
        console.log("Update Error", t)
    }
}
window.Unicorn = {
    Create: createTheUnicorn,
    Load: LoadAsset,
    LoadCustom: LoadAssetCustom,
    Crop: CropAsset,
    AddBacklay: AddBacklay,
    RemoveBacklay: RemoveBacklay,
    AddOverlay: AddOverlay,
    RemoveOverlay: RemoveOverlay,
    AddObject: AddObject,
    RemoveObject: RemoveObject,
    ConnectObjects: ConnectObjects,
    DisconnectObjects: DisconnectObjects,
    PlayObjectAnimation: PlayObjectAnimation,
    StopObjectAnimation: StopObjectAnimation,
    AddText: AddText,
    RemoveText: RemoveText,
    AddDetector: AddDetector,
    RemoveDetector: RemoveDetector,
    AddParticles: AddParticles,
    RemoveParticles: RemoveParticles,
    AddTimer: AddTimer,
    ResetTimer: ResetTimer,
    RemoveTimer: RemoveTimer,
    SetPosition: SetPosition,
    SetVelocity: SetVelocity,
    PlaySound: PlaySound,
    Raycast: Raycast,
    Assets: assetReference,
    Overlays: overlays,
    Objects: objects
};
//# sourceMappingURL=pinkfluffyunicorn.min.js.map
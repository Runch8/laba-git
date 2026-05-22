import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import {

    // LOGIN
    login,

    // TRAINERS
    getTrainers,
    addTrainer,
    deleteTrainer,
    updateTrainer,

    // MEMBERS
    getMembers,
    addMember,
    deleteMember,
    updateMember,

    // SESSIONS
    getSessions,
    addSession,
    deleteSession

} from "./api";

export default function App() {

    // ===== LOGIN =====

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [user, setUser] =
        useState<any>(null);

    // ===== TRAINERS =====

    const [trainers, setTrainers] =
        useState<any[]>([]);

    const [trainerSearch,
        setTrainerSearch] =
        useState("");

    const [name, setName] =
        useState("");

    const [specialization,
        setSpecialization] =
        useState("");

    const [editingId,
        setEditingId] =
        useState<number | null>(null);

    // ===== MEMBERS =====

    const [members, setMembers] =
        useState<any[]>([]);

    const [memberSearch,
        setMemberSearch] =
        useState("");

    const [memberName,
        setMemberName] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [subscription,
        setSubscription] =
        useState("Базовий");

    const [startDate,
        setStartDate] =
        useState("");

    const [endDate,
        setEndDate] =
        useState("");

    const [editingMemberId,
        setEditingMemberId] =
        useState<number | null>(null);

    // ===== SESSIONS =====

    const [sessions, setSessions] =
        useState<any[]>([]);

    const [title, setTitle] =
        useState("");

    const [trainer, setTrainer] =
        useState("");

    const [sessionDate,
        setSessionDate] =
        useState("");

    const [sessionTime,
        setSessionTime] =
        useState("");

    // ===== LOGIN =====

    const handleLogin = async () => {

        const res = await login(
            email,
            password
        );

        if (res.error) {

            alert("Невірний логін");

            return;

        }

        setUser(res);

        loadTrainers();
        loadMembers();
        loadSessions();

    };

    // =====================================================
    // TRAINERS
    // =====================================================

    const loadTrainers = async () => {

        const data =
            await getTrainers();

        setTrainers(data);

    };

    const createTrainer =
        async () => {

            await addTrainer({

                name,
                specialization

            });

            setName("");
            setSpecialization("");

            loadTrainers();

        };

    const editTrainer =
        async () => {

            if (!editingId)
                return;

            await updateTrainer(

                editingId,

                {

                    name,
                    specialization

                }

            );

            setEditingId(null);

            setName("");
            setSpecialization("");

            loadTrainers();

        };

    const removeTrainer =
        async (id: number) => {

            await deleteTrainer(id);

            loadTrainers();

        };

    // =====================================================
    // MEMBERS
    // =====================================================

    const loadMembers = async () => {

        const data =
            await getMembers();

        setMembers(data);

    };

    const createMember =
        async () => {

            await addMember({

                name: memberName,
                phone,
                subscription,

                start_date:
                    startDate,

                end_date:
                    endDate

            });

            loadMembers();

            setMemberName("");
            setPhone("");
            setStartDate("");
            setEndDate("");

        };

    const editMember =
        async () => {

            if (!editingMemberId)
                return;

            await updateMember(

                editingMemberId,

                {

                    name: memberName,
                    phone,
                    subscription,

                    start_date:
                        startDate,

                    end_date:
                        endDate

                }

            );

            setEditingMemberId(null);

            setMemberName("");
            setPhone("");
            setStartDate("");
            setEndDate("");

            loadMembers();

        };

    const removeMember =
        async (id: number) => {

            await deleteMember(id);

            loadMembers();

        };

    // =====================================================
    // SESSIONS
    // =====================================================

    const loadSessions =
        async () => {

            const data =
                await getSessions();

            setSessions(data);

        };

    const createSession =
        async () => {

            await addSession({

                title,
                trainer,

                session_date:
                    sessionDate,

                session_time:
                    sessionTime

            });

            loadSessions();

            setTitle("");
            setTrainer("");
            setSessionDate("");
            setSessionTime("");

        };

    const removeSession =
        async (id: number) => {

            await deleteSession(id);

            loadSessions();

        };

    // =====================================================
    // SEARCH
    // =====================================================

    const filteredTrainers =
        trainers.filter((t) =>

            t.name
                .toLowerCase()
                .includes(
                    trainerSearch.toLowerCase()
                )

        );

    const filteredMembers =
        members.filter((m) =>

            m.name
                .toLowerCase()
                .includes(
                    memberSearch.toLowerCase()
                )

        );

    // =====================================================
    // NOTIFICATIONS
    // =====================================================

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const expiringMembers =
        members.filter((m) => {

            if (!m.end_date)
                return false;

            const end =
                new Date(m.end_date);

            const now =
                new Date();

            const diff =
                Math.ceil(

                    (
                        end.getTime()
                        -
                        now.getTime()
                    )

                    /
                    (1000 * 60 * 60 * 24)

                );

            return diff <= 7;

        });

    const todaySessions =
        sessions.filter(

            (s) =>
                s.session_date === today

        );

    // =====================================================
    // CALENDAR
    // =====================================================

    const calendarEvents =
        sessions.map((s) => ({

            title: s.title,
            date: s.session_date

        }));

    // =====================================================
    // LOGIN SCREEN
    // =====================================================

    if (!user) {

        return (

            <div className="login-box">

                <h1>
                    Sport Club Login
                </h1>

                <p>
                    ADMIN:
                    admin@test.com / 1234
                </p>

                <p>
                    TRAINER:
                    trainer@test.com / 1234
                </p>

                <p>
                    USER:
                    user@test.com / 1234
                </p>

                <br />

                <input
                    placeholder="email"
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <button
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        );

    }

    // =====================================================
    // APP
    // =====================================================

    return (

        <div className="container">

            {/* NAVBAR */}

            <div className="navbar">

                <div className="logo">
                    Sport Club
                </div>

                <div className="nav-links">

                    <span>
                        {user.role}
                    </span>

                    <span>
                        Тренери
                    </span>

                    <span>
                        Учасники
                    </span>

                    <span>
                        Календар
                    </span>

                </div>

            </div>

            <h1>
                Sport Club 💪
            </h1>

            {/* NOTIFICATIONS */}

            <h2>
                Сповіщення
            </h2>

            {expiringMembers.length > 0 && (

                <div className="card">

                    <h3>
                        ⚠ Абонементи
                    </h3>

                    {expiringMembers.map((m) => (

                        <div key={m.id}>

                            {m.name}
                            {" — "}
                            до
                            {" "}
                            {m.end_date}

                        </div>

                    ))}

                </div>

            )}

            {todaySessions.length > 0 && (

                <div className="card">

                    <h3>
                        📅 Сьогоднішні заняття
                    </h3>

                    {todaySessions.map((s) => (

                        <div key={s.id}>

                            {s.title}
                            {" — "}
                            {s.session_time}

                        </div>

                    ))}

                </div>

            )}

            {/* TRAINERS */}

            {user.role === "ADMIN" && (

                <>

                    <h2>
                        Тренери
                    </h2>

                    <input

                        placeholder="Пошук тренера"

                        value={trainerSearch}

                        onChange={(e) =>
                            setTrainerSearch(
                                e.target.value
                            )
                        }

                    />

                    <div className="card">

                        <input
                            placeholder="Ім'я"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            placeholder="Спеціалізація"
                            value={specialization}
                            onChange={(e) =>
                                setSpecialization(
                                    e.target.value
                                )
                            }
                        />

                        <button

                            onClick={
                                editingId
                                    ? editTrainer
                                    : createTrainer
                            }

                        >

                            {editingId
                                ? "Зберегти"
                                : "Додати"}

                        </button>

                    </div>

                    {filteredTrainers.map((t) => (

                        <div
                            key={t.id}
                            className="card"
                        >

                            <b>{t.name}</b>

                            <div>
                                {t.specialization}
                            </div>

                            <button

                                onClick={() => {

                                    setEditingId(t.id);

                                    setName(t.name);

                                    setSpecialization(
                                        t.specialization
                                    );

                                }}

                            >

                                Edit

                            </button>

                            <button
                                className="delete"
                                onClick={() =>
                                    removeTrainer(t.id)
                                }
                            >
                                Видалити
                            </button>

                        </div>

                    ))}

                </>

            )}

            {/* MEMBERS */}

            {user.role === "ADMIN" && (

                <>

                    <h2>
                        Учасники
                    </h2>

                    <input

                        placeholder="Пошук учасника"

                        value={memberSearch}

                        onChange={(e) =>
                            setMemberSearch(
                                e.target.value
                            )
                        }

                    />

                    <div className="card">

                        <input
                            placeholder="ПІБ"
                            value={memberName}
                            onChange={(e) =>
                                setMemberName(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            placeholder="Телефон"
                            value={phone}
                            onChange={(e) =>
                                setPhone(
                                    e.target.value
                                )
                            }
                        />

                        <select
                            value={subscription}
                            onChange={(e) =>
                                setSubscription(
                                    e.target.value
                                )
                            }
                        >

                            <option>
                                Базовий
                            </option>

                            <option>
                                Преміум
                            </option>

                        </select>

                        <br /><br />

                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) =>
                                setStartDate(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) =>
                                setEndDate(
                                    e.target.value
                                )
                            }
                        />

                        <br /><br />

                        <button

                            onClick={
                                editingMemberId
                                    ? editMember
                                    : createMember
                            }

                        >

                            {editingMemberId
                                ? "Зберегти"
                                : "Додати учасника"}

                        </button>

                    </div>

                    {filteredMembers.map((m) => (

                        <div
                            key={m.id}
                            className="card"
                        >

                            <b>{m.name}</b>

                            <div>
                                {m.phone}
                            </div>

                            <div>
                                Абонемент:
                                {" "}
                                {m.subscription}
                            </div>

                            <div>
                                До:
                                {" "}
                                {m.end_date}
                            </div>

                            <button

                                onClick={() => {

                                    setEditingMemberId(
                                        m.id
                                    );

                                    setMemberName(
                                        m.name
                                    );

                                    setPhone(
                                        m.phone
                                    );

                                    setSubscription(
                                        m.subscription
                                    );

                                    setStartDate(
                                        m.start_date
                                    );

                                    setEndDate(
                                        m.end_date
                                    );

                                }}

                            >

                                Edit

                            </button>

                            <button
                                className="delete"
                                onClick={() =>
                                    removeMember(m.id)
                                }
                            >
                                Видалити
                            </button>

                        </div>

                    ))}

                </>

            )}

            {/* CALENDAR */}

            <h2>
                Календар занять
            </h2>

            {(user.role === "ADMIN"
                ||
                user.role === "TRAINER") && (

                    <div className="card">

                        <input
                            placeholder="Назва заняття"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            placeholder="Тренер"
                            value={trainer}
                            onChange={(e) =>
                                setTrainer(
                                    e.target.value
                                )
                            }
                        />

                        <br /><br />

                        <input
                            type="date"
                            value={sessionDate}
                            onChange={(e) =>
                                setSessionDate(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="time"
                            value={sessionTime}
                            onChange={(e) =>
                                setSessionTime(
                                    e.target.value
                                )
                            }
                        />

                        <br /><br />

                        <button
                            onClick={createSession}
                        >
                            Додати заняття
                        </button>

                    </div>

                )}

            <div className="card">

                <FullCalendar
                    plugins={[
                        dayGridPlugin
                    ]}
                    initialView="dayGridMonth"
                    height="auto"
                    events={calendarEvents}
                />

            </div>

            <h2>
                Список занять
            </h2>

            {sessions.map((s) => (

                <div
                    key={s.id}
                    className="card"
                >

                    <b>{s.title}</b>

                    <div>
                        Тренер:
                        {" "}
                        {s.trainer}
                    </div>

                    <div>
                        Дата:
                        {" "}
                        {s.session_date}
                    </div>

                    <div>
                        Час:
                        {" "}
                        {s.session_time}
                    </div>

                    {user.role === "ADMIN" && (

                        <button
                            className="delete"
                            onClick={() =>
                                removeSession(s.id)
                            }
                        >
                            Видалити
                        </button>

                    )}

                </div>

            ))}

        </div>

    );

}
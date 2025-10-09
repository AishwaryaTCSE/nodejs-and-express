const { getTickets, saveTickets } = require("../models/ticketModel");

// Fetch all tickets
function getAllTickets(req, res) {
  const tickets = getTickets();
  res.json(tickets);
}

// Fetch ticket by ID
function getTicketById(req, res) {
  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.json(ticket);
}

// Create a ticket
function createTicket(req, res) {
  const tickets = getTickets();
  const { title, description, priority, user } = req.body;

  const newTicket = {
    id: tickets.length ? tickets[tickets.length - 1].id + 1 : 1,
    title,
    description,
    priority,
    user,
    status: "pending"
  };

  tickets.push(newTicket);
  saveTickets(tickets);
  res.status(201).json(newTicket);
}

// Update ticket
function updateTicket(req, res) {
  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  const { title, description, priority } = req.body;
  if (title) ticket.title = title;
  if (description) ticket.description = description;
  if (priority) ticket.priority = priority;

  saveTickets(tickets);
  res.json(ticket);
}

// Delete ticket
function deleteTicket(req, res) {
  let tickets = getTickets();
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  tickets = tickets.filter(t => t.id !== ticket.id);
  saveTickets(tickets);
  res.json({ message: "Ticket deleted successfully" });
}

// Resolve ticket
function resolveTicket(req, res) {
  const tickets = getTickets();
  const ticket = tickets.find(t => t.id === parseInt(req.params.id));
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  ticket.status = "resolved";
  saveTickets(tickets);
  res.json(ticket);
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket
};

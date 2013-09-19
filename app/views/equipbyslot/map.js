function(doc) {
	if (doc._id.substr(0,4) === "slot") {
		emit(doc._id.substr(5), {
			"name": doc.name,
			"slot": doc.slot,
			"level": doc.level,
			"note": doc.note
		});
	}
}
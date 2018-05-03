DELIMITER // 

CREATE PROCEDURE spUserMentions (userid int) 
BEGIN
	select c.text as ChirpMessage, c.id as ChirpID, c._created as ChirpDate
	from mentions m
	join users u on u.id = m.userid
	join chirps c on c.id = m.chirpid
	join users u2 on u2.id = c.userid
	where m.userid = userid; 
END //

DELIMITER ;

-- call spUserMentions(1);